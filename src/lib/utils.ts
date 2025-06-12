import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import packageJson from "../../package.json";
import { Constantes } from "@/config/Constantes";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const encodeBase64 = (data: string) => {
  return Buffer.from(data).toString("base64");
};

export const decodeBase64 = (data: string) => {
  return Buffer.from(data, "base64").toString("ascii");
};

export const titleCase = (word: string) => {
  if (!word) return "";
  return word.length <= 1
    ? word.toUpperCase()
    : word
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

export const versionNumber = () => {
  return packageJson.version;
};

export const serviceName = () => {
  return packageJson.name;
};

export const siteName = () => {
  return Constantes.siteName ?? "";
};

export const numberFormat = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    maximumFractionDigits: 2,
    currency: "BOB",
  }).format(value);
};

export const generarId = () =>
  Math.random().toString(16).slice(2, 12).toUpperCase();

export const pluralizar = (
  cantidad: number,
  singular: string,
  plural: string
) => {
  return `${cantidad} ${cantidad === 1 ? singular : plural}`;
};

export const statusColors: Record<number, string> = {
  400: "info",
  401: "warning",
  403: "error",
  404: "error",
  500: "error",
};
