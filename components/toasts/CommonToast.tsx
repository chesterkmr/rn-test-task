import React from "react";
import { Toast, ToastTitle, ToastDescription } from "../ui/toast";

interface ToastComponentProps {
  title: string;
  description?: string;
  variant: "success" | "error";
}

export const CommonToast = ({
  title,
  description,
  variant,
}: ToastComponentProps) => {
  return (
    <Toast action={variant} variant="solid">
      <ToastTitle>{title}</ToastTitle>
      {description && <ToastDescription>{description}</ToastDescription>}
    </Toast>
  );
};
