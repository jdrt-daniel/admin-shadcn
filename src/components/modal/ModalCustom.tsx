import React from "react";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { cn } from "@/lib/utils";

interface ModalBaseProps {
  open: boolean;
  title: string;
  description?: string;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClose?: () => void;
}

export const ModalCustom = ({
  open,
  title,
  description,
  size = "md",
  children,
  onClose,
}: ModalBaseProps) => {
  const isDesktop = useIsMobile();

  if (!isDesktop) {
    return (
      <Dialog
        open={open}
        onOpenChange={onClose ? () => onClose() : undefined}
        modal
      >
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent
          className={cn(
            size === "sm" && "max-w-[425px]",
            size === "md" && "max-w-[500px]",
            size === "lg" && "max-w-[800px]"
          )}
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          <div>{children}</div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>
        <div>{children}</div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
