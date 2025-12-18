import { create } from "zustand";
import type { NotesState, NotesStore } from "./types";
import { devtools } from "zustand/middleware";

const initialState: NotesState = {
  notes: null,
  activeNote: null,
};

export const useNotesStore = create<NotesStore>()(
  devtools<NotesStore>((set) => ({
    ...initialState,

    actions: {
      setNotes: (notes) => set({ notes }, false, "notes/setNotes"),

      setActiveNote: (note) => set({ activeNote: note }, false, "notes/setActiveNote"),
      clearActiveNote: () => set({ activeNote: null }, false, "notes/clearActiveNote"),
    },
  }))
);
