export function convertPermissions(data: {
  name: string;
  description: string;
  permissions: {
    moduleIdentifier: string;
    modulePermissions: string[];
  }[];
}): {
  name: string;
  description: string;
  moduleIdentifierPermissions: {
    identifier: string;
    actions: {
      id: string;
      name: string;
    }[];
  }[];
} {
  const actionNameMap: { [key: string]: string } = {
    create: "Create",
    update: "Update",
    view: "View",
    delete: "Delete",
    approve: "Approve",
    reject: "Reject",
    download: "Download",
  };

  return {
    name: data?.name,
    description: data?.description,
    moduleIdentifierPermissions: data?.permissions.map((permission) => ({
      identifier: permission.moduleIdentifier,
      actions: permission.modulePermissions.map((actionId) => ({
        id: actionId,
        name: actionNameMap[actionId] || actionId,
      })),
    })),
  };
}

export function getUniqueIdentifiers(permissions:any[]) {
  return [...new Set(permissions.map((item) => item.identifier?.id))].join(
    ", "
  );
}