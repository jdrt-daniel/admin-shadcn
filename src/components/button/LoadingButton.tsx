import React from "react";
import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";

interface LoadingButtonProps {
  className?: string;
  children?: React.ReactNode;
  text?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  color?: string;
  type?: "submit" | "button";
}

export default function LoadingButton({
  className,
  onClick,
  children,
  disabled,
  loading,
  color,
  type,
}: LoadingButtonProps) {
  return (
    <>
      <Button
        className={className}
        onClick={onClick}
        disabled={disabled || loading}
        color={color}
        type={type}
      >
        {loading ? (
          <>
            <Loader2Icon className="animate-spin" />
            Cargando
          </>
        ) : (
          <>{children}</>
        )}
      </Button>
    </>
  );
}
