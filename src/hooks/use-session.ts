/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  delay,
  eliminarCookie,
  guardarCookie,
  imprimir,
  leerCookie,
} from "@/utils";
import { peticionFormatoMetodo, Servicios } from "./use-services";
import { Constantes } from "@/config/Constantes";

export const useSession = () => {
  const sesionPeticion = async ({
    url,
    method = "get",
    body,
    headers,
    params,
    responseType,
    withCredentials,
  }: peticionFormatoMetodo) => {
    try {
      //   if (!verificarToken(leerCookie('token') ?? '')) {
      //     imprimir(`Token caducado ⏳`)
      //     await actualizarSesion()
      //   }

      const cabeceras = {
        accept: "application/json",
        Authorization: `Bearer ${leerCookie("token") ?? ""}`,
        ...headers,
      };

      imprimir(`enviando 🔐🌍`, body, method, url, cabeceras);
      const response = await Servicios.peticionHTTP({
        url,
        method: method,
        headers: cabeceras,
        body,
        params,
        responseType,
        withCredentials,
      });
      imprimir("respuesta 🔐📡", body, method, url, response);
      return response.data;
    } catch (e: import("axios").AxiosError | any) {
      if (e.code === "ECONNABORTED") {
        throw new Error("La petición está tardando demasiado");
      }

      if (Servicios.isNetworkError(e)) {
        throw new Error("Error en la conexión 🌎");
      }

      //   if (estadosSinPermiso.includes(e.response?.status)) {
      //     mostrarFullScreen();
      //     await cerrarSesion();
      //     ocultarFullScreen();
      //     return;
      //   }

      throw e.response?.data || "Ocurrió un error desconocido";
    }
  };

  const borrarCookiesSesion = () => {
    eliminarCookie("token"); // Eliminando access_token
    eliminarCookie("jid"); // Eliminando refresh token
  };

  const cerrarSesion = async () => {
    try {
      // mostrarFullScreen()
      await delay(1000);
      const token = leerCookie("token");
      borrarCookiesSesion();

      const respuesta = await Servicios.get({
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        url: `${Constantes.baseUrl}/logout`,
      });
      imprimir(`finalizando con respuesta`, respuesta);

      if (respuesta?.url) {
        window.location.href = respuesta?.url;
      } else {
        // router.refresh()
        window.location.reload();
      }
    } catch (e) {
      imprimir(`Error al cerrar sesión: `, e);
      // router.refresh()
      window.location.reload();
    } finally {
      // ocultarFullScreen()
    }
  };

  const actualizarSesion = async () => {
    imprimir(`Actualizando token 🚨`);

    try {
      const respuesta = await Servicios.post({
        url: `${Constantes.baseUrl}/token`,
        body: {
          token: leerCookie("token"),
        },
      });
      const token = leerCookie("token");
      if (token) guardarCookie("token", respuesta.datos.access_token);

      await delay(1000);
    } catch (e) {
      console.error(e);
      await cerrarSesion();
    }
  };

  return {
    sesionPeticion,
    borrarCookiesSesion,
    cerrarSesion,
    actualizarSesion,
  };
};
