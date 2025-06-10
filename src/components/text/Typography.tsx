import { cn } from "@/lib/utils";

export function Typography({
  variant = "inherit",
  color = "inherit",
  children,
  className,
}: {
  variant?:
    | "inherit"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "body1"
    | "body2"
    | "caption"
    | "title";
  color?:
    | "inherit"
    | "muted"
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error";

  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "pb-0",
        variant === "inherit" && "text-inherit",
        variant === "h1" && "text-[3.5em] font-bold",
        variant === "h2" && "text-[3em] font-bold",
        variant === "h3" && "text-[2.5em] font-bold",
        variant === "h4" && "text-[2em] font-bold",
        variant === "h5" && "text-[1.75em] font-bold",
        variant === "h6" && "text-[1.5em] font-bold",
        variant === "body1" && "text-[1.25em] font-semibold",
        variant === "body2" && "text-[1,10em] font-semibold",
        variant === "caption" && "text-base",
        variant === "title" && "text-title",
        color === "inherit" && "text-inherit",
        color === "muted" && "text-muted",
        color === "primary" && "text-primary",
        color === "secondary" && "text-gray-500",
        color === "accent" && "text-purple-400",
        color === "info" && "text-cyan-400",
        color === "success" && "text-green-400",
        color === "warning" && "text-yellow-400",
        color === "error" && "text-red-400",
        className
      )}
    >
      {children}
    </p>
  );
}
