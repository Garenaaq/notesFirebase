import { Auth } from "@/containers/auth";
import { Box, Flex } from "@chakra-ui/react";

export const AuthPage = () => {
  return (
    <Flex
      justifyContent="center"
      position="relative"
      overflow="hidden"
      alignItems="center"
      w="100%"
      minH="100vh"
      direction="column"
    >
      <Box
        position="absolute"
        top="-10%"
        right="-5%"
        width="500px"
        height="500px"
        bg="blue.500"
        opacity="0.2"
        borderRadius="full"
        filter="blur(100px)"
        zIndex={1}
      />
      <Box
        position="absolute"
        bottom="-10%"
        left="-5%"
        width="400px"
        height="400px"
        bg="purple.500"
        opacity="0.2"
        borderRadius="full"
        filter="blur(100px)"
        zIndex={1}
      />
      <Auth />
    </Flex>
  );
};
