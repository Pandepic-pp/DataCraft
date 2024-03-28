const { Client } = require("pg");
const createQueries = require("./CreateQueries.js");
const { generateMockDataForTable, mockData } = require("./GenerateMockData.js");
const readline = require("readline");

// Function to execute SQL query
async function executeQuery(query, tableName) {
  try {
    await client.query(query);
    console.log(`Query executed successfully for ${tableName}`);
  } catch (error) {
    console.error(`Error executing query for ${tableName}:`, error);
  }
}

// Function to create tables
async function createTables() {
  try {
    await client.connect();
    for (const tableName in createQueries) {
      if (Object.hasOwnProperty.call(createQueries, tableName)) {
        const query = createQueries[tableName];
        await executeQuery(query, tableName);
      }
    }
  } catch (error) {
    console.error("Error creating tables:", error);
  }
}

// Function to insert mock data
async function insertMockData() {
  try {
    for (const tableName in mockData) {
      if (Object.hasOwnProperty.call(mockData, tableName)) {
        const data = mockData[tableName];
        for (const row of data) {
          const columns = Object.keys(row).join(", ");
          const values = Object.values(row)
            .map((value) => {
              if (value === null) {
                return "null";
              } else if (typeof value === "object") {
                // Check if value is an object
                return `'${JSON.stringify(value)}'`; // Convert object to JSON string
              } else if (typeof value === "string") {
                return `'${value}'`;
              } else {
                return value;
              }
            })
            .join(", ");
          const insertQuery = `INSERT INTO public.${tableName} (${columns}) VALUES (${values})`;

          await executeQuery(insertQuery, tableName);
        }
      }
    }
  } catch (error) {
    console.error("Error inserting mock data:", error);
  }
}

let numData;

async function getUserInput(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(question, (data) => {
      rl.close();
      resolve(data.trim());
    });
  });
}

async function getNumberOfData() {
  numData = await getUserInput(
    `How many rows/data do you want to insert into the database? `
  );
}

function askQuestion(question, defaultValue) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, reject) => {
    rl.question(`${question} (${defaultValue}): `, (answer) => {
      resolve(answer.trim() || defaultValue); // If user input is empty, use default value
    });
  });
}

async function getDatabaseDetails() {
  const user = await askQuestion("Enter user", "postgres");
  const host = await askQuestion("Enter host", "localhost");
  const database = await askQuestion("Enter database", "postgres");
  const password = await askQuestion("Enter password", "admin");
  const port = await askQuestion("Enter port", "5432");
  return { user, host, database, password, port };
}

async function main() {
  await getNumberOfData();
  const databaseDetails = await getDatabaseDetails();
  client = new Client(databaseDetails); // Create a new client instance
  // Mock data for insertion

  for (const tableName in mockData) {
    if (Object.hasOwnProperty.call(mockData, tableName)) {
      let tableData = mockData[tableName];
      for (let i = 0; i < numData; i++) {
        const rowData = generateMockDataForTable(tableName, i);
        tableData.push(rowData);
      }
      mockData[tableName] = tableData;
    }
  }

  await createTables();
  await insertMockData();
  await client.end();
}

main();
