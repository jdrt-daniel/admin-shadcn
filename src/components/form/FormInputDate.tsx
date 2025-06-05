import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { FiCalendar, FiX } from "react-icons/fi";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";

type FormInputDateProps<T extends FieldValues> = {
  id: string;
  name: Path<T>;
  placeholder?: string;
  control: Control<T, object>;
  label: string;
  disabled?: boolean;
  clearable?: boolean;
  isRequired?: boolean;
};

export const FormInputDate = <T extends FieldValues>({
  id,
  name,
  placeholder,
  control,
  label,
  disabled = false,
  clearable = false,
  isRequired,
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
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex relative items-center">
                <FiCalendar className="absolute left-3" />
                <Input
                  id={id}
                  {...field}
                  type="text"
                  placeholder={placeholder || "Seleccione una fecha"}
                  disabled={disabled}
                  aria-invalid={!!error}
                  value={field.value ? format(field.value, "dd/MM/yyyy") : ""}
                  className={cn(
                    "w-full justify-start text-left font-normal pl-9",
                    !field.value && "text-muted-foreground"
                  )}
                />
                {clearable && field.value && (
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    className="absolute right-0 rounded-full"
                    onClick={() => field.onChange("")}
                  >
                    <FiX />
                  </Button>
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {error && <small className="text-red-500">{error.message}</small>}
        </div>
      )}
    />
  );
};
