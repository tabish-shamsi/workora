"use client"

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input as ShadcnInput } from "@/components/ui/input";
import {
  Control,
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  Path,
} from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "./ui/textarea";

import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
  const type_ = name === "email" || name === "password" ? name : "text";

  const typeClasses = className
    ?.split(" ")
    .map((c) => c.split(":"))
    .filter((c) => c[0] === type)
    .map((c) => c[1])
    .join(" ");

  const FormItemClasses = className
    ?.split(" ")
    .filter((c) => {
      if (c.startsWith("input:") || c.startsWith("select:")) return null;
      return c;
    })
    .join(" ");

  function FormContent({
    field,
    fieldState,
  }: {
    field: ControllerRenderProps<T, Path<T>>;
    fieldState: ControllerFieldState;
  }) {
    const [open, setOpen] = useState(false);

    switch (type) {
      case "select":
        return (
          <Select
            value={field.value}
            onValueChange={field.onChange}
            name="type"
          >
            <SelectTrigger
              aria-invalid={fieldState.error?.message ? true : false}
              className={typeClasses}
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
        );
      case "textarea":
        return (
          <Textarea
            {...field}
            className={typeClasses}
            placeholder={placeholder}
            aria-invalid={fieldState.error?.message ? true : false}
          />
        );
      case "date":
        return (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date"
                className={cn(
                  "w-full justify-between font-normal",
                )}
                aria-invalid={fieldState.error?.message ? true : false}
              >
                {field.value ? field.value?.toLocaleDateString() : placeholder}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={field.value}
                captionLayout="dropdown"
                onSelect={(date) => {
                  field.onChange(date);
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        );
      default:
        return (
          <ShadcnInput
            placeholder={placeholder}
            type={type_}
            {...field}
            className={typeClasses}
            aria-invalid={fieldState.error?.message ? true : false}
          />
        );
    }
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={FormItemClasses}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <FormContent field={field} fieldState={fieldState} />
          </FormControl>
          <FormMessage className="mt-1" />
        </FormItem>
      )}
    />
  );
}
