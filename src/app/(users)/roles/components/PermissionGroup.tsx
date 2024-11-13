import React from "react";
import CustomCheckbox from "@components/custom/custom-checkbox";

type Action = {
  id: string;
  name: string;
};

type Permission = {
  identifier: {
    name: string;
    id: string;
  };
  actions: Action[];
};

type PermissionGroupProps = {
  permission: Permission;
  moduleIdentifierPermissions: {
    identifier: string;
    actions: Action[];
  }[];
  setModuleIdentifierPermissions: React.Dispatch<
    React.SetStateAction<
      {
        identifier: string;
        actions: Action[];
      }[]
    >
  >;
};

export const PermissionGroup: React.FC<PermissionGroupProps> = ({
  permission,
  moduleIdentifierPermissions,
  setModuleIdentifierPermissions,
}) => {
  const { identifier, actions } = permission;

  const isAllActionsSelected = (identifierId: string) => { // Removed actions parameter
    const existingPermission = moduleIdentifierPermissions.find(
      (perm) => perm.identifier === identifierId
    );

    return (
      existingPermission && existingPermission.actions.length === actions.length // Use actions here
    );
  };

  const isActionSelected = (identifierId: string, actionId: string) => {
    const existingPermission = moduleIdentifierPermissions.find(
      (perm) => perm.identifier === identifierId
    );

    return (
      existingPermission &&
      existingPermission.actions &&
      existingPermission.actions.some((a) => a.id === actionId)
    );
  };

  const handleCheckboxChange = (identifierId: string, action: Action) => {
    setModuleIdentifierPermissions((prev) => {
      const existingPermission = prev.find(
        (perm) => perm.identifier === identifierId
      );

      if (existingPermission) {
        const updatedActions = existingPermission.actions.some(
          (a) => a.id === action.id
        )
          ? existingPermission.actions.filter((a) => a.id !== action.id)
          : [...existingPermission.actions, action];

        if (updatedActions.length === 0) {
          return prev.filter((perm) => perm.identifier !== identifierId);
        }

        return prev.map((perm) =>
          perm.identifier === identifierId
            ? { ...perm, actions: updatedActions }
            : perm
        );
      } else {
        return [...prev, { identifier: identifierId, actions: [action] }];
      }
    });
  };

  const handleAllActionsChange = (identifierId: string) => { // Removed actions parameter
    setModuleIdentifierPermissions((prev) => {
      const existingPermission = prev.find(
        (perm) => perm.identifier === identifierId
      );

      if (existingPermission) {
        const allSelected =
          existingPermission.actions.length === actions.length; // Use actions here

        if (allSelected) {
          // If all actions are selected, keep the identifier but clear all actions
          return prev.map((perm) =>
            perm.identifier === identifierId ? { ...perm, actions: [] } : perm
          );
        } else {
          // Otherwise, select all actions
          return prev.map((perm) =>
            perm.identifier === identifierId ? { ...perm, actions } : perm // Use actions here
          );
        }
      } else {
        // If no actions are selected, select all actions
        return [...prev, { identifier: identifierId, actions }];
      }
    });
  };

  return (
    <div key={identifier.id}>
      <div className="flex items-center gap-4">
        <CustomCheckbox
          id={`${identifier.id}`}
          label={identifier.name}
          labelClassName='font-bold'
          checked={isAllActionsSelected(identifier.id)} // Removed actions parameter
          onChange={() => {
            handleAllActionsChange(identifier.id); // Removed actions parameter
          }}
        />
        {/* <h3 className="font-bold">{identifier.name}</h3> */}
      </div>

      <div className="flex flex-wrap gap-4 mt-4">
        {actions?.map((action, index) => ( // Use actions here
          <CustomCheckbox
            key={index}
            label={action.name}
            id={`${identifier.id}-${action.id}`}
            checked={isActionSelected(identifier.id, action.id)}
            onChange={() => handleCheckboxChange(identifier.id, action)}
          />
        ))}
      </div>
    </div>
  );
};
