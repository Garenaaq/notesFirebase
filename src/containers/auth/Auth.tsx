import { Box, Flex, Heading, Icon, Span, Text } from "@chakra-ui/react";
import { useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import styles from "./Auth.module.scss";
import { LoginForm } from "./forms/LoginForm";
import { RegistrationForm } from "./forms/RegistrationForm";

export type FormState = "login" | "registration";

export const Auth = () => {
  const [form, setForm] = useState<FormState>("login");
  const direction = form === "registration" ? "right" : "left";

  const handleFormChange = (newForm: FormState) => {
    setForm(newForm);
  };

  return (
    <>
      <Box
        w={{
          base: "90%",
          sm: "80%",
          md: "60%",
          lg: "50%",
          xl: "40%",
          "2xl": "25%",
        }}
        bg="rgba(39, 39, 42, 0.2)"
        borderRadius="2xl"
        border="1px solid"
        borderColor="gray.700"
        p={{ base: "6", md: "8" }}
        boxShadow="0 20px 25px -5px rgba(0, 0, 0, 0.3)"
        overflow="hidden"
        zIndex={3}
      >
        {form === "registration" && (
          <Flex justify="flex-end">
            <Icon
              onClick={() => handleFormChange("login")}
              cursor="pointer"
              size="2xl"
              _hover={{ color: "blue.300" }}
            >
              <IoIosArrowRoundForward />
            </Icon>
          </Flex>
        )}
        <Heading as="h1" size="2xl" textAlign="center" mb={5}>
          {form === "login" ? "Авторизация" : "Создание аккаунта"}
        </Heading>
        <Box key={form} className={direction === "right" ? styles.slideRight : styles.slideLeft}>
          {form === "login" ? (
            <LoginForm />
          ) : (
            <RegistrationForm handleFormChange={handleFormChange} />
          )}
        </Box>
      </Box>
      {form === "login" && (
        <Text color="gray.400" fontSize="sm" mt={2} zIndex={3}>
          Нет аккаунта?{" "}
          <Text
            as={Span}
            onClick={() => handleFormChange("registration")}
            color="blue.400"
            m={0}
            bgColor="inherit"
            fontWeight="medium"
            cursor="pointer"
            _hover={{ color: "blue.300" }}
          >
            Создать аккаунт
          </Text>
        </Text>
      )}
    </>
  );
};
