import { Sidebar } from "@/components/Sidebar";
import { Menu } from "@/components/ui/Menu";
import { useLogout } from "@/hooks/useLogout";
import { addEmptyNote, subscribeNotes } from "@/services/notes";
import { useNotesStore } from "@/store/notes/notesStore";
import { selectorUser } from "@/store/user/selectors";
import { useUserStore } from "@/store/user/userStore";
import { Avatar, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { Loader } from "@/components/ui/Loader";
import { ListNotes } from "@/components/notes/ListNotes";
import { selectorNotesActions } from "@/store/notes/selectors";
import { toaster } from "@/components/ui/chakra/toaster";

export const NotesSidebar = () => {
  const [loading, setLoading] = useState(true);

  const user = useUserStore(selectorUser);
  const logout = useLogout();

  const { setNotes } = useNotesStore(selectorNotesActions);

  useEffect(() => {
    if (!user) {
      return;
    }

    const unsubscribe = subscribeNotes(user.uid, (notes) => {
      setNotes(notes);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, setNotes]);

  const handleAddNote = async () => {
    if (!user) {
      return;
    }
    try {
      await addEmptyNote(user.uid);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);

      toaster.create({ title: message, type: "error" });
    }
  };

  const header = (
    <IconButton
      aria-label="Add note"
      variant="ghost"
      colorScheme="gray"
      size="sm"
      onClick={handleAddNote}
    >
      <FaPlusCircle />
    </IconButton>
  );

  const footer = (
    <Menu
      trigger={
        <HStack
          gap={3}
          w="full"
          _hover={{ bg: "gray.700" }}
          cursor="pointer"
          padding={2}
          borderRadius={14}
        >
          <Avatar.Root variant="solid">
            <Avatar.Fallback name={user?.displayName || "User"} />
          </Avatar.Root>
          <VStack flex={1} align="start" gap={0} minW={0}>
            <Text fontSize="sm" fontWeight="medium" color="white">
              {user?.displayName}
            </Text>
            <Text fontSize="xs" color="gray.400">
              {user?.email}
            </Text>
          </VStack>
        </HStack>
      }
      items={[
        {
          value: "Выйти",
          children: <Text>Выйти</Text>,
          color: "fg.error",
          onClick: logout,
        },
      ]}
    />
  );

  return (
    <Sidebar header={header} footer={footer}>
      {loading ? (
        <VStack h="full" align="center" justifyContent="center">
          <Loader size="xl" />
        </VStack>
      ) : (
        <ListNotes />
      )}
    </Sidebar>
  );
};
