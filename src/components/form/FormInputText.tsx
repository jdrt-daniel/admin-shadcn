import React, { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { FiEye, FiEyeOff, FiX } from "react-icons/fi";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

type FormInputTextProps<T extends FieldValues> = {
  id: string;
  name: Path<T>;
  label?: string;
  type?: string;
  control: Control<T, object>;
  placeholder?: string;
  labelChildren?: React.ReactNode;
  isRequired?: boolean;
  disabled?: boolean;
  clearable?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FormInputText = <T extends FieldValues>({
  control,
  id,
  name,
  label,
  type = "text",
  isRequired = false,
  placeholder,
  labelChildren,
  disabled = false,
  clearable = false,
}: FormInputTextProps<T>) => {
  const [typeSelect, setTypeSelect] = useState(type);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="">
          <div className="flex items-center">
            <Label htmlFor={id} className="mb-3">
              {label}

              {isRequired && <span className="text-red-500">*</span>}
            </Label>
            {labelChildren}
          </div>
          <div className="flex relative">
            <Input
              id={id}
              {...field}
              type={typeSelect}
              // required
              placeholder={placeholder}
              disabled={disabled}
              autoComplete="on"
              className={cn(
                "rounded-sm",
                error && "border-red-500 focus-visible:ring-red-500"
              )}
            />
            {clearable && field.value && type !== "password" && (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full absolute right-0"
                onClick={() => field.onChange("")}
              >
                <FiX />
              </Button>
            )}
            {type === "password" && (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full absolute right-0"
                onClick={() =>
                  setTypeSelect(typeSelect === "password" ? "text" : "password")
                }
              >
                {typeSelect === "password" ? <FiEyeOff /> : <FiEye />}
              </Button>
            )}
          </div>
          {error && (
            <small className="text-red-500 ml-1">{error.message}</small>
          )}
        </div>
      )}
    />
  );
};
