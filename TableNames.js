let tableToIndex = {
  groups: 0,
  role: 1,
  permission: 2,
  organization: 3,
  status: 4,
  users: 5,
  project: 6,
  group_role: 7,
  milestone: 8,
  role_permission: 9,
  epic_status: 10,
  sprint: 11,
  epic: 12,
  group_user: 13,
  user_role: 14,
  story: 15,
  story_status: 16,
  task: 17,
  task_status: 18,
  project_status: 19,
};

let indexToTable = {
  0: "groups",
  1: "role",
  2: "permission",
  3: "organization",
  4: "status",
  5: "users",
  6: "project",
  7: "group_role",
  8: "milestone",
  9: "role_permission",
  10: "epic_status",
  11: "sprint",
  12: "epic",
  13: "group_user",
  14: "user_role",
  15: "story",
  16: "story_status",
  17: "task",
  18: "task_status",
  19: "project_status",
};

module.exports = {
    tableToIndex,
    indexToTable,
}
