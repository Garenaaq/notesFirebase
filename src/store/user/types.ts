import type { User } from "firebase/auth";

export interface UserState {
  user: User | null;
}

interface UserActions {
  setUser: (user: User) => void;
  clearUser: () => void;
}

export interface UserStore extends UserState {
  actions: UserActions;
}
