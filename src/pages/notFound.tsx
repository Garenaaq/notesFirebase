import { routerPaths } from "@/router";
import { Box, Button, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={"gray.900"}
      px={4}
    >
      <Container maxW="container.md" textAlign="center">
        <VStack>
          <Heading
            as="h1"
            fontSize={{ base: "120px", md: "180px", lg: "220px" }}
            fontWeight="black"
            color="blue.400"
            lineHeight="1"
            letterSpacing="tight"
          >
            404
          </Heading>

          <VStack>
            <Heading
              as="h2"
              fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
              fontWeight="bold"
              color={"white"}
            >
              Страница не найдена
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} color={"gray.400"} maxW="md">
              Извините, страница, которую вы ищете, не существует.
            </Text>
          </VStack>

          <VStack pt={4}>
            <Button
              colorScheme="blue"
              size="lg"
              onClick={() => navigate(routerPaths.notes)}
              px={8}
              _hover={{
                transform: "translateY(-2px)",
                shadow: "lg",
              }}
              transition="all 0.2s"
            >
              <FaHome /> На главную
            </Button>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};
