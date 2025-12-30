import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input as ShadcnInput } from "@/components/ui/input";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormInputFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  type?: string;
  options?: string[];
  className?: string;
  placeholder?: string;
}

export function Input<T extends FieldValues>({
  control,
  name,
  label,
  type,
  options,
  className,
  placeholder,
}: FormInputFieldProps<T>) {
  const type_ = type ?? "text";

  const inputClasses = className
    ?.split(" ")
    .map((c) => c.split(":"))
    .filter((c) => c[0] === "input")
    .map((c) => c[1])
    .join(" ");

  const selectClasses = className
    ?.split(" ")
    .map((c) => c.split(":"))
    .filter((c) => c[0] === "select")
    .map((c) => c[1])
    .join(" ");

  const FormItemClasses = className
    ?.split(" ")
    .filter((c) => {
      if (c.startsWith("input:") || c.startsWith("select:")) return null;
      return c;
    })
    .join(" ");

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={FormItemClasses}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {type === "select" ? (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                name="type"
              >
                <SelectTrigger
                  aria-invalid={fieldState.error?.message ? true : false}
                  className={selectClasses}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options?.map((option) => (
                    <SelectItem
                      key={`${name}-option-${option}`}
                      value={option}
                      className="capitalize"
                    >
                      {option.split("-").join(" ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <ShadcnInput
                placeholder={placeholder}
                type={type_}
                {...field}
                className={inputClasses}
              />
            )}
          </FormControl>
          <FormMessage className="mt-1" />
        </FormItem>
      )}
    />
  );
}
