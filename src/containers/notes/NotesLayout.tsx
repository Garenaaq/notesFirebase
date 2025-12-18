import { Flex, Stack } from "@chakra-ui/react";
import { NotesSidebar } from "./NotesSidebar";
import { Editor } from "@/components/notes/Editor";

export const NotesLayout = () => {
  return (
    <Flex h="100vh">
      <NotesSidebar />

      <Stack flexGrow={1} align="center" p={4} overflow="hidden" justify="center">
        <Editor />
      </Stack>
    </Flex>
  );
};
