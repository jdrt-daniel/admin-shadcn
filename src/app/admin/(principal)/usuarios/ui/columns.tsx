"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  nombre: string;
  apellido: string;
  genero: string;
  fechaNacimiento: string;
  direccion: string;
  telefono: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "apellido",
    header: "Apellido",
  },
  {
    accessorKey: "genero",
    header: "Genero",
  },
  {
    accessorKey: "fechaNacimiento",
    header: "Fecha de Nacimiento",
  },
  {
    accessorKey: "direccion",
    header: "Dirección",
  },
  {
    accessorKey: "telefono",
    header: "Telefono",
  },
];
