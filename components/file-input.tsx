import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";

export default function FileInput({
  form,
  label,
  name,
}: {
  form: UseFormReturn<any>;
  label: string;
  name: string;
}) {
  const { watch, register } = form;
  const file = watch(name);

  return (
    <div className="space-y-2">
      <Label
        className={cn(
          "text-sm font-medium",
          form.getFieldState(name).error?.message ? "text-destructive" : "",
        )}
      >
        {label}
      </Label>
      <Input
        aria-invalid={form.getFieldState(name).error?.message ? true : false}
        type="file"
        {...register(name)}
      />
      {form.formState.errors.resume && (
        <p className="text-sm text-destructive">
          {form.getFieldState(name).error?.message}
        </p>
      )}
      {file?.[0] && <p className="text-sm">Selected: {file[0].name}</p>}
    </div>
  );
}
