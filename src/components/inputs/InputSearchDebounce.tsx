import React from "react";
import { Input } from "../ui/input";
import { useDebouncedCallback } from "use-debounce";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SeachInputProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  clearable?: boolean;
}

export const InputSearchDebounce = ({
  searchQuery,
  setSearchQuery,
  clearable,
}: SeachInputProps) => {
  const [text, setText] = React.useState(searchQuery);

  const debounced = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
  }, 1000);

  const onClear = () => {
    setText("");
    setSearchQuery("");
  };

  return (
    <div className="flex items-center gap-1 relative">
      <Input
        value={text}
        placeholder="Buscar..."
        onChange={(event) => {
          const newValue = event.target.value;
          setText(newValue);
          debounced(newValue);
        }}
        className={cn("max-w-sm", clearable && "pr-10")}
      />
      {clearable && text.length > 0 && (
        <Button
          onClick={() => onClear()}
          variant="ghost"
          size="icon"
          className="
          absolute right-0 top-0
          text-muted-foreground cursor-pointer"
        >
          <X />
        </Button>
      )}
    </div>
  );
};
