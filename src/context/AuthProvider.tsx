"use client";

import { LoginType, UsuarioType } from "@/app/login/types";
import { Constantes } from "@/config/Constantes";
import { useCasbinEnforcer } from "@/hooks/use-casbin-enforcer";
import { InterpreteMensajes } from "@/hooks/use-message";
import { Servicios } from "@/hooks/use-services";
import { useSession } from "@/hooks/use-session";
import { encodeBase64 } from "@/lib/utils";
import { delay, guardarCookie, imprimir } from "@/utils";
import { Enforcer } from "casbin";
import { createContext, ReactNode, useContext, useState } from "react";

interface ContextProps {
  user: UsuarioType | null;
  loginProgress: boolean;
  ingresar: (usuario: LoginType) => Promise<void>;
  userPermissions: (routeName: string) => void;
  permisoAccion: (objeto: string, accion: string) => void;
}

const AuthContext = createContext<ContextProps>({} as ContextProps);

interface AuthContextType {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthContextType) => {
  const { sesionPeticion, borrarCookiesSesion } = useSession();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UsuarioType | null>(null);

  const { inicializarCasbin, interpretarPermiso, permisoSobreAccion } =
    useCasbinEnforcer();
  const [enforcer, setEnforcer] = useState<Enforcer>();

  const obtenerPermisos = async () => {
    const respuestaPermisos = await sesionPeticion({
      url: `${Constantes.baseUrl}/autorizacion/permisos`,
    });

    setEnforcer(await inicializarCasbin(respuestaPermisos.datos));
  };

  const login = async ({ usuario, contrasena }: LoginType) => {
    try {
      setLoading(true);

      await delay(1000);
      const respuesta = await Servicios.post({
        url: `${Constantes.baseUrl}/auth`,
        body: { usuario, contrasena: encodeBase64(encodeURI(contrasena)) },
        headers: {},
      });

      guardarCookie("token", respuesta.datos?.access_token);
      imprimir(`Token ✅: ${respuesta.datos?.access_token}`);

      setUser(respuesta.datos);
      imprimir(`Usuarios ✅`, respuesta.datos);

      // mostrarFullScreen();
      await delay(1000);
      await guardarSesionUsuario();
    } catch (e) {
      imprimir(`Error al iniciar sesión: `, e);
      borrarSesionUsuario();
      throw new Error(InterpreteMensajes(e));
    } finally {
      setLoading(false);
    }
  };

  const guardarSesionUsuario = async () => {
    await obtenerPermisos();
  };

  const borrarSesionUsuario = () => {
    setUser(null);
    borrarCookiesSesion();
  };

  return (
    <AuthContext.Provider
      value={{
        user: user,
        loginProgress: loading,
        ingresar: login,
        userPermissions: (routeName: string) =>
          interpretarPermiso({
            routerName: routeName,
            enforcer: enforcer,
            rol: "user",
          }),
        permisoAccion: (objeto: string, accion: string) =>
          permisoSobreAccion({
            objeto,
            enforcer,
            rol: "user",
            accion: accion,
          }),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
