import { useSession } from "next-auth/react";
import { useMemo } from "react";

function useHasPermission(identifier: string) {
  const { data: session } = useSession();

  const hasPermission = useMemo(() => {
    return (
      session?.role?.permissions?.some(
        (permission: any) => permission.moduleIdentifier === identifier
      ) || null
    );
  }, [session, identifier]);

  return hasPermission;
}

export default useHasPermission;
