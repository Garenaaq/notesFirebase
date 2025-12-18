import type { UserStore } from "./types";

export const selectorIsAuthenticated = (state: UserStore) => state.user !== null;

export const selectorUser = (state: UserStore) => state.user;

export const selectorUserId = (state: UserStore) => state.user?.uid;

export const selectorUserActions = (state: UserStore) => state.actions;
