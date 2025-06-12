import { CasbinTypes } from "@/types";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import GridContent from "../ui/grid-content";

interface LayoutPermissionsProps {
  children: React.ReactNode;
  title: string;
  returnPermissions?: (permissions: CasbinTypes) => void;
}

export const LayoutPermissions = ({
  children,
  title,
  returnPermissions,
}: LayoutPermissionsProps) => {
  //   const { userPermissions } = useAuth();

  const [permisos, setPermisos] = useState<CasbinTypes>({
    read: false,
    create: false,
    update: false,
    delete: false,
  });

  const pathname = usePathname();
  const definirPermisos = async () => {
    // const permisos = await userPermissions(pathname);
    console.log("Permisos:", pathname);
    setPermisos({
      read: false,
      create: false,
      update: false,
      delete: false,
    });
  };
  useEffect(() => {
    definirPermisos();
  }, []);

  useEffect(() => {
    if (returnPermissions) {
      returnPermissions(permisos);
    }
  }, [permisos]);

  if (permisos.read === false) {
    return (
      <GridContent>
        <h1>No tienes permisos para acceder a esta página</h1>
      </GridContent>
    );
  }

  return (
    <>
      <title>{title}</title>
      {children}
    </>
  );
};
