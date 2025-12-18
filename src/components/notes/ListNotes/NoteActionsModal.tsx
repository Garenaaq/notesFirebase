import { useState, type FC, type ReactNode } from "react";
import type { ModalType } from "./ListNotesItem";
import type { Note } from "@/types/notes";
import { useUserStore } from "@/store/user/userStore";
import { selectorUserId } from "@/store/user/selectors";
import { useNotesStore } from "@/store/notes/notesStore";
import { selectorActiveNoteId, selectorNotesActions } from "@/store/notes/selectors";
import { Modal } from "@/components/ui/Modal";
import { Button, Text } from "@chakra-ui/react";
import { deleteNote, updateTitleNote } from "@/services/notes";
import { FormInput } from "@/components/formFields/FormInput";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface NoteActionsModalProps {
  modalType: ModalType;
  note: Note;
  isOpen: boolean;
  onClose: () => void;
}

const scheme = yup.object({
  title: yup.string().trim().required("Укажите заголовок"),
});

export const NoteActionsModal: FC<NoteActionsModalProps> = ({
  modalType,
  note,
  isOpen,
  onClose,
}) => {
  const { id, title } = note;

  const userId = useUserStore(selectorUserId);

  const activeNoteId = useNotesStore(selectorActiveNoteId);
  const { clearActiveNote } = useNotesStore(selectorNotesActions);

  const [isDeleting, setIsDeleting] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<{ title: string }>({
    defaultValues: {
      title,
    },
    mode: "onChange",
    resolver: yupResolver(scheme),
  });

  if (!modalType) {
    return <></>;
  }

  const handleEditNote = async ({ title }: { title: string }) => {
    if (!userId) return;

    await updateTitleNote(userId, id, title);

    onClose();
  };

  const handleDeleteNote = async () => {
    if (!userId) {
      return;
    }

    try {
      setIsDeleting(true);

      await deleteNote(userId, id);

      if (activeNoteId === id) {
        clearActiveNote();
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const modalConfig: Record<
    Exclude<ModalType, null>,
    {
      header: ReactNode;
      body: ReactNode;
      footer: ReactNode;
    }
  > = {
    edit: {
      header: <Text>Изменить заголовок</Text>,
      body: (
        <form id="edit-note-form" onSubmit={handleSubmit(handleEditNote)}>
          <FormInput control={control} name="title" label="Заголовок" />
        </form>
      ),
      footer: (
        <>
          <Button
            onClick={() => {
              reset();
              onClose();
            }}
          >
            Отмена
          </Button>
          <Button form="edit-note-form" bgColor="fg.info" type="submit" loading={isSubmitting}>
            Изменить
          </Button>
        </>
      ),
    },
    delete: {
      header: <Text>Удалить заметку</Text>,
      body: <Text>Вы уверены, что хотите удалить заметку "{title}"?</Text>,
      footer: (
        <>
          <Button onClick={onClose}>Отмена</Button>
          <Button bgColor="fg.error" onClick={handleDeleteNote} loading={isDeleting}>
            Удалить
          </Button>
        </>
      ),
    },
  };

  const { header, body, footer } = modalConfig[modalType];

  return (
    <Modal header={header} footer={footer} open={isOpen} onOpenChange={onClose}>
      {body}
    </Modal>
  );
};
