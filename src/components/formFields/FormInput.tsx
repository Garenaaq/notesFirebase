import { Field, Input, type InputProps } from "@chakra-ui/react";
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

interface FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<InputProps, "name"> {
  name: ControllerProps<TFieldValues, TName>["name"];
  control?: ControllerProps<TFieldValues, TName>["control"];
  controlProps?: Omit<
    ControllerProps<TFieldValues, TName>,
    "render" | "name" | "control"
  >;
  label?: React.ReactNode;
}

export const FormInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  controlProps,
  label,
  ...rest
}: FormInputProps<TFieldValues, TName>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field.Root invalid={!!fieldState.error}>
          {label}
          <Input
            {...field}
            bg="gray.900"
            border="1px solid"
            borderColor="gray.600"
            color="white"
            _placeholder={{ color: "gray.500" }}
            _hover={{ borderColor: "gray.500" }}
            _focus={{
              borderColor: "blue.500",
              boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
            }}
            {...rest}
          />
          <Field.ErrorText>{fieldState.error?.message}</Field.ErrorText>
        </Field.Root>
      )}
      {...controlProps}
    />
  );
};
