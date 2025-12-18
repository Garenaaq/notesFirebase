import type { NotesStore } from "./types";

export const selectorNotes = (state: NotesStore) => state.notes;

export const selectorActiveNote = (state: NotesStore) => state.activeNote;
export const selectorActiveNoteId = (state: NotesStore) => state.activeNote?.id;

export const selectorNotesActions = (state: NotesStore) => state.actions;
