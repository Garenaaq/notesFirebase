import type { Note } from "@/types/notes";

export interface NotesState {
  notes: Note[] | null;
  activeNote: Note | null;
}

interface NotesActions {
  setNotes: (notes: Note[]) => void;

  setActiveNote: (note: Note) => void;
  clearActiveNote: () => void;
}

export interface NotesStore extends NotesState {
  actions: NotesActions;
}
