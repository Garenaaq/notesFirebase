import { Box, HStack, IconButton, Text, VStack, type MenuItemProps } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { Menu } from "@/components/ui/Menu";
import { formatTimestamp } from "@/utils/formatTimestamp";
import { useState, type FC } from "react";
import type { Note } from "@/types/notes";
import { useNotesStore } from "@/store/notes/notesStore";
import { selectorNotesActions, selectorActiveNoteId } from "@/store/notes/selectors";
import { useToggle } from "@/hooks/useToggle";
import { NoteActionsModal } from "./NoteActionsModal";

export type ModalType = "delete" | "edit" | null;

interface ListNotesItemProps {
  note: Note;
}

export const ListNotesItem: FC<ListNotesItemProps> = ({ note }) => {
  const { id, title, updatedAt } = note;

  const [modalType, setModalType] = useState<ModalType>(null);
  const [isOpen, switchToggle] = useToggle();

  const { setActiveNote } = useNotesStore(selectorNotesActions);
  const activeNoteId = useNotesStore(selectorActiveNoteId);

  const handleClickNote = () => {
    if (activeNoteId !== id) {
      setActiveNote(note);
    }
  };

  const openModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, modalType: ModalType) => {
    e.stopPropagation();
    setModalType(modalType);
    switchToggle();
  };

  const menuItems: MenuItemProps[] = [
    {
      value: "Поделиться",
      children: <Text>Поделиться</Text>,
      disabled: true,
    },
    {
      value: "Изменить",
      children: <Text>Изменить</Text>,
      onClick: (e) => openModal(e, "edit"),
    },
    {
      value: "Удалить",
      children: <Text>Удалить</Text>,
      color: "fg.error",
      onClick: (e) => openModal(e, "delete"),
    },
  ];

  return (
    <>
      <Box
        onClick={handleClickNote}
        h="auto"
        cursor="pointer"
        p={4}
        borderRadius={0}
        border="none"
        bgColor={activeNoteId === id ? "gray.700" : "inherit"}
        _hover={{ bg: "gray.700" }}
        justifyContent="flex-start"
      >
        <HStack align="start" gap={3} w="full">
          <VStack flex={1} align="start" gap={1} minW={0}>
            <HStack w="full" align="center" justify="space-between">
              <Text
                fontWeight="medium"
                color="white"
                fontSize="sm"
                textAlign="start"
                whiteSpace="normal"
                wordBreak="break-word"
              >
                {title}
              </Text>
              <Menu
                trigger={
                  <IconButton
                    onClick={(e) => e.stopPropagation()}
                    size="sm"
                    variant="ghost"
                    colorScheme="gray"
                    _hover={{ bg: "gray.900" }}
                    pointerEvents="auto"
                  >
                    <BsThreeDots />
                  </IconButton>
                }
                items={menuItems}
              />
            </HStack>
            {updatedAt && (
              <Text fontSize="xs" color="gray.400">
                {formatTimestamp(updatedAt)}
              </Text>
            )}
          </VStack>
        </HStack>
      </Box>

      <NoteActionsModal modalType={modalType} isOpen={isOpen} note={note} onClose={switchToggle} />
    </>
  );
};
