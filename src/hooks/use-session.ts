/* eslint-disable @typescript-eslint/no-explicit-any */

import { imprimir, leerCookie } from "@/utils";
import { peticionFormatoMetodo, Servicios } from "./use-services";

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

  return {
    sesionPeticion,
  };
};
