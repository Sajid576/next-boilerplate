export const API_ENDPOINT = "/roles";
export const BASE_ROUTE = "/roles";

export const MODULE_NAME = "Roles";
export const MODULE_NAME_SINGULAR = "Role";

export const ACTION_CREATE = { id: "create", name: "Create" };
export const ACTION_UPDATE = { id: "update", name: "Update" };
export const ACTION_VIEW = { id: "view", name: "View" };
export const ACTION_DELETE = { id: "delete", name: "Delete" };
export const ACTION_APPROVE = { id: "approve", name: "Approve" };
export const ACTION_REJECT = { id: "reject", name: "Reject" };
export const ACTION_DOWNLOAD = { id: "download", name: "Download" };

export const COMMON_ACTIONS = [
  ACTION_CREATE,
  ACTION_UPDATE,
  ACTION_VIEW,
  ACTION_DELETE,
  ACTION_APPROVE,
  ACTION_REJECT,
  ACTION_DOWNLOAD,
];

export const MODULES = {
 
  roles: {
    id: "roles",
    sidebarLabel: "Roles",
    formLabel: "Roles",
  },
  users: {
    id: "users",
    sidebarLabel: "Users",
    formLabel: "Users",
  },
 
};
