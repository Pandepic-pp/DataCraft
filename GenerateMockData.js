const { v4: uuidv4 } = require("uuid");
const { indexToTable, tableToIndex } = require("./TableNames");

let mockData = {
  [indexToTable[0]]: [],
  [indexToTable[1]]: [],
  [indexToTable[2]]: [],
  [indexToTable[3]]: [],
  [indexToTable[4]]: [],
  [indexToTable[5]]: [],
  [indexToTable[6]]: [],
  [indexToTable[7]]: [],
  [indexToTable[8]]: [],
  [indexToTable[9]]: [],
  [indexToTable[10]]: [],
  [indexToTable[11]]: [],
  [indexToTable[12]]: [],
  [indexToTable[13]]: [],
  [indexToTable[14]]: [],
  [indexToTable[15]]: [],
  [indexToTable[16]]: [],
  [indexToTable[17]]: [],
  [indexToTable[18]]: [],
  [indexToTable[19]]: [],
  // Add more tables here if needed
};

function generateMockDataForTable(tableName, i) {
  let currentDate; // Declare currentDate variable outside the switch statement

  // Foreign keys

  // organization id foreign key
  let organizationIds = mockData["organization"].map(
    (organization) => organization.id
  );
  let orgId =
    organizationIds[Math.floor(Math.random() * organizationIds.length)];
  // organization id foreign key

  // group id foreign key
  let groupIds = mockData["groups"].map((group) => group.id);
  let groupId = groupIds[Math.floor(Math.random() * groupIds.length)];
  // group id foriegn key

  // role id foreign key
  let roleIds = mockData["role"].map((item) => item.id);
  let roleId = roleIds[Math.floor(Math.random() * roleIds.length)];
  // role id foriegn key

  // project id foreign key
  let projectIds = mockData["project"].map((item) => item.id);
  let projectId = projectIds[Math.floor(Math.random() * projectIds.length)];
  // project id foriegn key

  // permission id foreign key
  let permissionIds = mockData["permission"].map((item) => item.id);
  let permissionId =
    permissionIds[Math.floor(Math.random() * permissionIds.length)];
  // permission id foriegn key

  // status id foreign key
  let statusIds = mockData["status"].map((item) => item.id);
  let statusId = statusIds[Math.floor(Math.random() * statusIds.length)];
  // permission id foriegn key

  // user id foreign key
  let userIds = mockData["users"].map((item) => item.id);
  let userId = userIds[Math.floor(Math.random() * userIds.length)];
  // user id foriegn key

  // epic id foreign key
  let epicIds = mockData["epic"].map((item) => item.id);
  let epicId = epicIds[Math.floor(Math.random() * epicIds.length)];
  // user id foriegn key

  // story id foreign key
  let storyIds = mockData["story"].map((item) => item.id);
  let storyId = storyIds[Math.floor(Math.random() * storyIds.length)];
  // user id foriegn key

  // task id foreign key
  let taskIds = mockData["task"].map((item) => item.id);
  let taskId = taskIds[Math.floor(Math.random() * taskIds.length)];
  // task id foriegn key

  // Foreign keys

  switch (tableName) {
    case "groups":
      currentDate = new Date().toISOString(); // Get current date and time in ISO format
      return {
        id: uuidv4(),
        name: `Group ${i + 1}`,
        display_name: `Group Display Name ${i + 1}`,
        created_on: currentDate,
        updated_on: currentDate,
        removed_on: null, // No removal date initially
        removed: false, // Initially not removed
      };
    case "role":
      currentDate = new Date().toISOString().split("T")[0]; // Get current date in ISO format without time
      return {
        id: uuidv4(),
        name: `Role ${i + 1}`,
        display_name: `Role Display Name ${i + 1}`,
        created_on: currentDate,
        updated_on: currentDate,
        removed_on: null, // No removal date initially
        removed: false, // Initially not removed
      };
    case "permission":
      return {
        id: uuidv4(),
        name: `Permission ${i + 1}`,
        display_name: `Permission Display Name ${i + 1}`,
      };
    case "organization":
      currentDate = new Date().toISOString(); // Get current date and time in ISO format
      return {
        id: uuidv4(),
        name: `Organization ${i + 1}`,
        logo: `logo${i + 1}.jpg`,
        banner: `banner${i + 1}.jpg`,
        removed: false, // Initially not removed
        created_on: currentDate,
        updated_on: currentDate,
        removed_on: null, // No removal date initially
      };
    case "status":
      return {
        id: uuidv4(),
        name: `Status_${i + 1}`,
        display_name: `Status Display Name ${i + 1}`,
      };
    case "users":
      return {
        id: uuidv4(),
        email: `user${i + 1}@example.com`,
        name: `User ${i + 1}`,
        avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
        socials: {
          twitter: `user${i + 1}_twtr`,
          facebook: `user${i + 1}_fb`,
          instagram: `user${i + 1}_ig`,
          github: `user${i + 1}_gh`,
          linkedin: `user${i + 1}_in`,
        }, // Corrected: JSON keys should be in double quotes
      };
    case "project":
      currentDate = new Date().toISOString(); // Get current date and time in ISO format
      return {
        id: uuidv4(),
        name: `Project ${i + 1}`,
        description: `Description of Project ${i + 1}`,
        logo: `logo${i + 1}.jpg`,
        banner: `banner${i + 1}.jpg`,
        status_text: `Status of Project ${i + 1}`,
        org_id: orgId, // Assuming you have a valid organization ID
        removed: false, // Initially not removed
        created_on: currentDate,
        updated_on: currentDate,
        removed_on: null, // No removal date initially
        start_date: currentDate, // Set start date to current date for simplicity
        end_date: null, // End date initially null
      };
    case "group_role":
      currentDate = new Date().toISOString().split("T")[0]; // Get current date in ISO format without time
      return {
        id: uuidv4(),
        created_on: currentDate,
        updated_on: currentDate,
        removed_on: null, // No removal date initially
        group_id: groupId, // Assuming you have valid group and role IDs
        role_id: roleId, // Assuming you have valid group and role IDs
      };
    case "milestone":
      currentDate = new Date().toISOString(); // Get current date and time in ISO format
      return {
        id: uuidv4(),
        name: `Milestone ${i + 1}`,
        description: `Description of Milestone ${i + 1}`,
        project_id: projectId, // Assuming you have a valid project ID
        removed: false, // Initially not removed
        created_on: currentDate,
        updated_on: currentDate,
        removed_on: null, // No removal date initially
        starts_on: currentDate, // Set start date to current date for simplicity
        ends_on: null, // End date initially null
      };
    case "role_permission":
      currentDate = new Date().toISOString(); // Get current date and time in ISO format
      return {
        id: uuidv4(),
        created_on: currentDate,
        updated_on: currentDate,
        removed_on: null, // No removal date initially
        role_id: roleId, // Assuming you have valid role, organization, project, and permission IDs
        org_id: orgId, // Assuming you have valid role, organization, project, and permission IDs
        project_id: projectId, // Assuming you have valid role, organization, project, and permission IDs
        permission_id: permissionId, // Assuming you have valid role, organization, project, and permission IDs
      };
    case "epic_status":
      currentDate = new Date().toISOString(); // Get current date and time in ISO format
      return {
        id: uuidv4(),
        epic_id: uuidv4(), // Assuming you have valid epic, organization, and status IDs
        org_id: uuidv4(), // Assuming you have valid epic, organization, and status IDs
        status_id: statusId, // Assuming you have valid epic, organization, and status IDs
        status_update_date: currentDate, // Set status update date to current date and time
      };
    case "sprint":
      currentDate = new Date().toISOString().split("T")[0]; // Get current date in ISO format without time
      return {
        id: uuidv4(),
        created_on: currentDate,
        updated_on: currentDate,
        removed_on: null, // No removal date initially
        starts_on: currentDate, // Set start date to current date
        ends_on: null, // End date initially null
        removed: false, // Initially not removed
        name: `Sprint ${i + 1}`,
        description: `Description of Sprint ${i + 1}`,
        project_id: projectId, // Assuming you have valid project IDs
      };
    case "epic":
      currentDate = new Date().toISOString().split("T")[0]; // Get current date in ISO format without time
      return {
        id: uuidv4(),
        created_on: currentDate,
        updated_on: currentDate,
        removed_on: null, // No removal date initially
        removed: false, // Initially not removed
        name: `Epic ${i + 1}`,
        description: `Description of Epic ${i + 1}`,
        project_id: projectId, // Assuming you have valid project IDs
      };
    case "group_user":
      currentDate = new Date().toISOString(); // Get current date and time in ISO format
      return {
        id: uuidv4(),
        created_on: currentDate,
        updated_on: currentDate,
        removed_on: null, // No removal date initially
        group_id: roleId, // Assuming you have valid group and user IDs
        user_id: userId, // Assuming you have valid group and user IDs
      };
    case "user_role":
      currentDate = new Date().toISOString().split("T")[0]; // Get current date in ISO format without time
      return {
        id: uuidv4(),
        created_on: currentDate,
        updated_on: currentDate,
        removed_on: null, // No removal date initially
        role_id: roleId, // Assuming you have valid role and user IDs
        user_id: userId, // Assuming you have valid role and user IDs
      };
    case "story":
      currentDate = new Date().toISOString().split("T")[0]; // Get current date in ISO format without time
      return {
        id: uuidv4(),
        created_on: currentDate,
        updated_on: currentDate,
        removed_on: null, // No removal date initially
        removed: false, // Initially not removed
        name: `Story ${i + 1}`,
        description: `Description of Story ${i + 1}`,
        epic_id: epicId, // Assuming you have valid epic IDs to reference
      };
    case "story_status":
      currentDate = new Date().toISOString(); // Get current date and time in ISO format
      return {
        id: uuidv4(),
        org_id: orgId, // Assuming you have valid organization and story IDs
        story_id: storyId, // Assuming you have valid organization and story IDs
        status_id: statusId, // Assuming you have valid status IDs
        status_update_date: currentDate,
      };
    case "task":
      currentDate = new Date().toISOString().split("T")[0]; // Get current date in ISO format without time
      return {
        id: uuidv4(), // Generate a new UUID for the task ID
        created_on: currentDate, // Set the creation date to the current date
        updated_on: currentDate, // Set the update date to the current date
        removed_on: null, // No removal date initially
        removed: false, // Initially not removed
        name: "Sample Task", // Sample task name
        description: "Sample Task Description", // Sample task description
        story_id: storyId, // Assuming you have valid story IDs to reference
      };
    case "task_status":
      currentDate = new Date().toISOString(); // Get current date and time in ISO format
      return {
        id: uuidv4(), // Generate a new UUID for the task_status ID
        org_id: orgId, // Assuming you have valid organization IDs to reference
        task_id: taskId, // Assuming you have valid task IDs to reference
        status_id: statusId, // Assuming you have valid status IDs to reference
        status_update: currentDate, // Set the status update date to the current date and time
        _date: currentDate,
      };
    case "project_status":
      currentDate = new Date().toISOString(); // Get current date and time in ISO format
      return {
        id: uuidv4(), // Generate a new UUID for the project_status ID
        project_id: uuidv4(), // Assuming you have valid project IDs to reference
        org_id: uuidv4(), // Assuming you have valid organization IDs to reference
        status_id: statusId, // Assuming you have valid status IDs to reference
        status_update_date: currentDate, // Set the status update date to the current date and time
      };
    default:
      return {}; // Handle other cases appropriately
  }
}

module.exports = {
  mockData: mockData,
  generateMockDataForTable: generateMockDataForTable,
};
