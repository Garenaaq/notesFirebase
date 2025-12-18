import {
  collection,
  doc,
  getDoc,
  increment,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  updateDoc,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Note } from "@/types/notes";

// функция, которая при регистрации создаст в бд коллекцию
export const ensureUserDocument = async (userId: string) => {
  const userRef = doc(db, "users", userId);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    await setDoc(userRef, {
      notesCount: 0,
    });
  }
};

export const subscribeNotes = (userId: string, callback: (notes: Note[]) => void): Unsubscribe => {
  const notesCollection = collection(db, "users", userId, "notes");
  const q = query(notesCollection, orderBy("updatedAt", "desc"));

  return onSnapshot(q, (snapshot) => {
    const notes = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Note));

    callback(notes);
  });
};

export const addEmptyNote = async (userId: string) => {
  const userRef = doc(db, "users", userId);
  const notesCollection = collection(userRef, "notes");

  return runTransaction(db, async (tx) => {
    const userDoc = await tx.get(userRef);
    const notesCount = userDoc.data()?.notesCount || 0;

    if (notesCount >= 5) {
      throw new Error("Нельзя создать больше 5 заметок");
    }

    const newNoteRef = doc(notesCollection);

    tx.set(newNoteRef, {
      title: "Новая заметка",
      content: "",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    tx.update(userRef, { notesCount: increment(1) });
  });
};

export const updateContentNote = async (userId: string, noteId: string, content?: string) => {
  const noteRef = doc(db, "users", userId, "notes", noteId);

  await updateDoc(noteRef, {
    content,
    updateAt: serverTimestamp(),
  });
};

export const updateTitleNote = async (userId: string, noteId: string, title: string) => {
  const noteRef = doc(db, "users", userId, "notes", noteId);

  await updateDoc(noteRef, {
    title,
    updateAt: serverTimestamp(),
  });
};

export const deleteNote = async (userId: string, noteId: string) => {
  const userRef = doc(db, "users", userId);
  const noteRef = doc(db, "users", userId, "notes", noteId);

  return runTransaction(db, async (tx) => {
    const userSnap = await tx.get(userRef);

    if (!userSnap.exists()) {
      return;
    }

    tx.delete(noteRef);
    tx.update(userRef, { notesCount: increment(-1) });
  });
};
