import { Field, IconButton, Input, InputGroup, type InputProps } from "@chakra-ui/react";
import { useState } from "react";
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface FormPasswordInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<InputProps, "name"> {
  name: ControllerProps<TFieldValues, TName>["name"];
  control?: ControllerProps<TFieldValues, TName>["control"];
  controlProps?: Omit<ControllerProps<TFieldValues, TName>, "render" | "name" | "control">;
  label?: React.ReactNode;
}

export const FormPasswordInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  controlProps,
  label,
  ...rest
}: FormPasswordInputProps<TFieldValues, TName>) => {
  const [secureText, setSecureText] = useState(true);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field.Root invalid={!!fieldState.error}>
          {label}
          <InputGroup
            endElement={
              <IconButton
                variant="ghost"
                minW="auto"
                bgColor="inherit"
                onClick={() => setSecureText((prev) => !prev)}
              >
                {secureText ? <FiEyeOff /> : <FiEye />}
              </IconButton>
            }
          >
            <Input
              {...field}
              type={secureText ? "password" : "text"}
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
          </InputGroup>
          <Field.ErrorText>{fieldState.error?.message}</Field.ErrorText>
        </Field.Root>
      )}
      {...controlProps}
    />
  );
};
