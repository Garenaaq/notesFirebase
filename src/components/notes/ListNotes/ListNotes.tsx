import { GrNotes } from "react-icons/gr";
import { VStack } from "@chakra-ui/react";
import { useNotesStore } from "@/store/notes/notesStore";
import { selectorNotes } from "@/store/notes/selectors";
import { EmptyState } from "@/components/ui/EmptyState";
import { ListNotesItem } from "./ListNotesItem";

export const ListNotes = () => {
  const notes = useNotesStore(selectorNotes);

  if (!notes || notes.length <= 0) {
    return (
      <EmptyState
        indicatorProps={{ children: <GrNotes /> }}
        titleProps={{ children: "Нет заметок" }}
      />
    );
  }

  return (
    <VStack flex={1} overflowY="auto" minW={0} gap={0} align="stretch">
      {notes.map((note) => (
        <ListNotesItem key={note.id} note={note} />
      ))}
    </VStack>
  );
};
