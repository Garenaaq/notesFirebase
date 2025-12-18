import { useEffect } from "react";
import { EmptyState } from "@/components/ui/EmptyState";
import { useNotesStore } from "@/store/notes/notesStore";
import { selectorActiveNote } from "@/store/notes/selectors";
import { Box, VStack } from "@chakra-ui/react";
import StarterKit from "@tiptap/starter-kit";
import { GiNotebook } from "react-icons/gi";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { CharacterCount } from "@tiptap/extensions";
import { EditorContent, useEditor } from "@tiptap/react";
import { MenuBar } from "./MenuBar";
import { updateContentNote } from "@/services/notes";
import { selectorUserId } from "@/store/user/selectors";
import { useUserStore } from "@/store/user/userStore";
import { useDebouncedCallback } from "@/hooks/useDebounceCallback";
import "./styles.scss";

const extensions = [TextStyleKit, StarterKit, CharacterCount.configure({ limit: 5000 })];

export const Editor = () => {
  const activeNote = useNotesStore(selectorActiveNote);
  const userId = useUserStore(selectorUserId);

  const debouncedSave = useDebouncedCallback((html: string) => {
    if (!activeNote || !userId) {
      return;
    }

    updateContentNote(userId, activeNote.id, html);
  });

  const editor = useEditor({
    extensions,
    content: "<p></p>",
    editable: !!activeNote,
    onUpdate({ editor }) {
      debouncedSave(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;

    if (activeNote) {
      editor.commands.setContent(activeNote.content || "<p></p>");
      editor.setEditable(true);
    } else {
      editor.commands.clearContent();
      editor.setEditable(false);
    }
  }, [activeNote, editor]);

  if (!activeNote) {
    return (
      <EmptyState
        indicatorProps={{ children: <GiNotebook /> }}
        titleProps={{ children: "Выберите заметку" }}
      />
    );
  }

  return (
    <VStack
      bgColor="rgba(39, 39, 42, 0.55)"
      p={4}
      maxW={1200}
      gap={30}
      borderRadius={15}
      maxH="80vh"
      position="relative"
    >
      <Box
        position="absolute"
        top="-10%"
        right="-10%"
        width="60%"
        height="100%"
        bg="blue.500"
        opacity="0.2"
        borderRadius="full"
        filter="blur(100px)"
        zIndex={0}
      />
      <Box
        position="absolute"
        bottom="-10%"
        left="-10%"
        width="60%"
        height="100%"
        bg="purple.500"
        opacity="0.2"
        borderRadius="full"
        filter="blur(100px)"
        zIndex={0}
      />
      <MenuBar editor={editor} />
      <EditorContent
        style={{
          width: "100%",
          border: "1px solid",
          borderColor: "gray.700",
          padding: 15,
          borderRadius: 8,
          overflow: "hidden",
          overflowY: "auto",
          zIndex: 1,
        }}
        editor={editor}
      />
    </VStack>
  );
};
