import { Button, FormInputText } from "@/components";
import GridContent from "@/components/ui/grid-content";
import GridItem from "@/components/ui/grid-item";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface FormSchema {
  nombre: string;
  apellido: string;
}

const schema = yup.object({
  nombre: yup.string().required("El nombre es requerido"),
  apellido: yup.string().required("El apellido es requerido"),
});

interface EditFormProps {
  onSubmit: (data: FormSchema) => void;
  onCancel: () => void;
}

export const EditForm = ({ onSubmit, onCancel }: EditFormProps) => {
  const { control, handleSubmit } = useForm<FormSchema>({
    defaultValues: {
      nombre: "",
      apellido: "",
    },
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <GridContent spacing={4}>
        <GridItem size={12}>
          <FormInputText
            id="nombre"
            name="nombre"
            control={control}
            label="Nombre"
            placeholder="Nombre"
            isRequired
          />
        </GridItem>
        <GridItem size={12}>
          <FormInputText
            id="apellido"
            name="apellido"
            control={control}
            label="Apellido"
            placeholder="Apellido"
            isRequired
          />
        </GridItem>
      </GridContent>
      <div className="flex justify-end mt-4">
        <Button
          variant="outline"
          onClick={onCancel}
          className="mr-2"
          type="button"
        >
          Cancelar
        </Button>
        <Button type="submit">Guardar</Button>
      </div>
    </form>
  );
};
