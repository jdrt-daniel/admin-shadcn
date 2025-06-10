"use client";

import { Typography } from "@/components";
import { Button } from "@/components/ui/button";

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

export const columns = ({ onEdit, onDelete }) => [
  {
    accessorKey: "nombre",
    header: "Nombre",
    cell: ({ row }) => {
      return (
        <Typography className="font-bold">{row.original.nombre}</Typography>
      );
    },
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
  {
    accessorKey: "acciones",
    header: "Acciones",
    cell: ({ row }) => {
      return (
        <div className="flex flex-row gap-2">
          <Button
            variant="default"
            size="sm"
            onClick={() => onEdit(row.original.id)}
          >
            Editar
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(row.original.id)}
          >
            Eliminar
          </Button>
        </div>
      );
    },
  },
];
