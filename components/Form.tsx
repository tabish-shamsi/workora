import { Form as ShadcnForm } from "@/components/ui/form";
import { ReactNode } from "react";

export default function Form({
  form,
  onSubmit,
  children,
  className,
}: {
  form: any;
  onSubmit: Function;
  children: ReactNode;
  className?: string;
}) {
  return (
    <ShadcnForm {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </ShadcnForm>
  );
}
