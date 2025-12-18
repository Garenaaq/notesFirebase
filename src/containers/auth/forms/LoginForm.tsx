import { FormInput } from "@/components/formFields/FormInput";
import { FormPasswordInput } from "@/components/formFields/FormPasswordInput";
import { auth, githubProvider, googleProvider } from "@/services/firebase";
import { ensureUserDocument } from "@/services/notes";
import { Box, Button, Field, Flex, HStack, Icon, Link, Text, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword, signInWithPopup, type AuthProvider } from "firebase/auth";
import { useForm } from "react-hook-form";
import { FaGithub, FaGoogle } from "react-icons/fa";
import * as yup from "yup";

interface LoginFormValues {
  email: string;
  password: string;
}

const scheme = yup.object({
  email: yup.string().trim().required("Укажите email"),
  password: yup.string().trim().required("Укажите пароль"),
});

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    resolver: yupResolver(scheme),
  });

  const onSubmit = async (values: LoginFormValues) => {
    const { email, password } = values;

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        setError("root", {
          message: error.message,
        });
      }
    }
  };

  const socialLogin = async (provider: AuthProvider) => {
    try {
      const user = await signInWithPopup(auth, provider);
      await ensureUserDocument(user.user.uid);
    } catch (error: unknown) {
      console.log(error);
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
              <Flex justify="space-between" mb="1" w="full">
                <Field.Label color="gray.300" fontSize="sm" fontWeight="medium">
                  Пароль
                </Field.Label>
                <Link
                  href="#"
                  color="blue.400"
                  fontSize="sm"
                  fontWeight="medium"
                  _hover={{ color: "blue.300" }}
                >
                  Забыли?
                </Link>
              </Flex>
            }
            placeholder="••••••••"
            control={control}
            name="password"
          />
        </Box>

        <Text color="red.400">{errors.root?.message}</Text>

        <Button
          type="submit"
          w="full"
          size="lg"
          bg="blue.600"
          color="white"
          _hover={{ bg: "blue.700" }}
          _active={{ bg: "blue.800" }}
          fontWeight="semibold"
          boxShadow="0 4px 14px 0 rgba(59, 130, 246, 0.4)"
          loading={isSubmitting}
        >
          Войти
        </Button>

        <HStack w="full" gap="4">
          <Button
            onClick={() => socialLogin(googleProvider)}
            flex="1"
            variant="outline"
            size="lg"
            borderColor="gray.700"
            color="gray.300"
            _hover={{ bg: "gray.700", borderColor: "gray.600" }}
          >
            <Icon>
              <FaGoogle />
            </Icon>
          </Button>
          <Button
            onClick={() => socialLogin(githubProvider)}
            flex="1"
            variant="outline"
            size="lg"
            borderColor="gray.700"
            color="gray.300"
            _hover={{ bg: "gray.700", borderColor: "gray.600" }}
          >
            <FaGithub />
          </Button>
        </HStack>
      </VStack>
    </form>
  );
};
