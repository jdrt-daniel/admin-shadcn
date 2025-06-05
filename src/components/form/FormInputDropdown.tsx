import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { OpcionType } from "@/types";
import { Label } from "../ui/label";

type FormInputDateProps<T extends FieldValues> = {
  id: string;
  name: Path<T>;
  placeholder?: string;
  control: Control<T, object>;
  label: string;
  disabled?: boolean;
  clearable?: boolean;
  isRequired?: boolean;
  options: OpcionType[];
};

export const FormInputDropdown = <T extends FieldValues>({
  id,
  name,
  placeholder,
  control,
  label,
  isRequired,
  options,
}: FormInputDateProps<T>) => {
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
          </div>
          <div className="flex">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between",
                    !field.value && "text-muted-foreground",
                    error && "border-red-500 focus-visible:ring-red-500"
                  )}
                >
                  {field.value
                    ? options.find((language) => language.value === field.value)
                        ?.label
                    : "Seleccionar item"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 ">
                <Command>
                  <CommandInput placeholder={placeholder} />
                  <CommandList>
                    <CommandEmpty>No encontrado.</CommandEmpty>
                    <CommandGroup>
                      {options.map((language) => (
                        <CommandItem
                          value={language.label}
                          key={language.value}
                          onSelect={() => {
                            field.onChange(language.value);
                          }}
                        >
                          {language.label}
                          <Check
                            className={cn(
                              "ml-auto",
                              language.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          {error && <small className="text-red-500">{error.message}</small>}
        </div>
      )}
    />
  );
};
