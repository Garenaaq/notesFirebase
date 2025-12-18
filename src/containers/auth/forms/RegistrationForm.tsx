import { FormInput } from "@/components/formFields/FormInput";
import { FormPasswordInput } from "@/components/formFields/FormPasswordInput";
import { auth } from "@/services/firebase";
import { Box, Button, Field, Text, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import type { FormState } from "../Auth";
import type { FC } from "react";
import { FirebaseError } from "firebase/app";
import { ensureUserDocument } from "@/services/notes";

interface RegistrationFormValues {
  email: string;
  password: string;
}

const scheme = yup.object({
  email: yup.string().email("Неверно указан email").trim().required("Укажите email"),
  password: yup.string().trim().required("Укажите пароль"),
});

interface RegistrationFormProps {
  handleFormChange: (newForm: FormState) => void;
}

export const RegistrationForm: FC<RegistrationFormProps> = ({ handleFormChange }) => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    resolver: yupResolver(scheme),
  });

  const onSubmit = async (values: RegistrationFormValues) => {
    const { email, password } = values;
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await ensureUserDocument(user.user.uid);

      handleFormChange("login");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        setError("root", {
          message: error.message,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack gap="6" w="full">
        <Box w="full">
          <FormInput
            type="email"
            label={
              <Field.Label color="gray.300" mb="1" fontSize="sm" fontWeight="medium">
                Email
              </Field.Label>
            }
            placeholder="your@email.com"
            control={control}
            name="email"
          />
        </Box>

        <Box w="full">
          <FormPasswordInput
            label={
              <Field.Label color="gray.300" fontSize="sm" fontWeight="medium">
                Пароль
              </Field.Label>
            }
            placeholder="••••••••"
            control={control}
            name="password"
          />
        </Box>

        <Text color="red.400">{errors.root?.message}</Text>

        <Button
          type="submit"
          w="50%"
          size="lg"
          bg="blue.600"
          color="white"
          _hover={{ bg: "blue.700" }}
          _active={{ bg: "blue.800" }}
          fontWeight="semibold"
          boxShadow="0 4px 14px 0 rgba(59, 130, 246, 0.4)"
          loading={isSubmitting}
        >
          Создать аккаунт
        </Button>
      </VStack>
    </form>
  );
};
