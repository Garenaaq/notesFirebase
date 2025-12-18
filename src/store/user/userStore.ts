import type { UserState, UserStore } from "./types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState: UserState = {
  user: null,
};

export const useUserStore = create<UserStore>()(
  devtools<UserStore>((set) => ({
    ...initialState,

    actions: {
      setUser: (user) => set({ user }, false, "user/setUser"),

      clearUser: () => set({ user: null }, false, "user/clearUser"),
    },
  }))
);
