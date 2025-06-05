import { OpcionType } from "@/types";
import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { FiX } from "react-icons/fi";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";

type FormInputSelectProps<T extends FieldValues> = {
  id: string;
  name: Path<T>;
  label?: string;
  control: Control<T, object>;
  placeholder?: string;
  labelChildren?: React.ReactNode;
  isRequired?: boolean;
  disabled?: boolean;
  clearable?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options: OpcionType[];
};

export const FormInputSelect = <T extends FieldValues>({
  control,
  id,
  name,
  label,
  isRequired = false,
  placeholder = "Seleccionar",
  labelChildren,
  disabled = false,
  clearable = false,
  onChange,
  options,
}: FormInputSelectProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor={id}>
              {label}
              {isRequired && <span className="text-red-500 ml-1">*</span>}
            </Label>
            {labelChildren}
          </div>
          <div className="flex relative">
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={disabled}
            >
              <SelectTrigger className={cn("", { "border-red-500": error })}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option: OpcionType) => (
                  <SelectItem key={option.key} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {clearable && field.value && (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full absolute right-8"
                onClick={() => field.onChange("")}
              >
                <FiX />
              </Button>
            )}
          </div>
          {error && <small className="text-red-500">{error.message}</small>}
        </div>
      )}
    />
  );
};
