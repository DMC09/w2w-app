import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { devtools, persist } from "zustand/middleware";
import { produce } from "immer";

interface AuthState {

    accessToken: string;
    refreshToken: string;
    idToken:string;
  user: { email: string; username: string };
}

type AuthActions = {
  resetToken: () => void;
  setToken: (token: any) => void;
};

const initialState: AuthState = {
  accessToken: "",
  refreshToken: "",
  idToken: "",
  user: {
    email: "",
    username: "",
  },
};

const _AuthStore = immer<AuthState & AuthActions>((set, get) => ({
  accessToken: initialState.accessToken,
  refreshToken: initialState.refreshToken,
  idToken: initialState.idToken,
  user: initialState.user,
  resetToken: () => {
    set(initialState);
  },
  setToken: (token: any) => {
    set((state) => {
      state.accessToken = token
      console.log(token, "token set in");
    });
  },
}));

export const AuthStore = create(
  devtools(
    persist(_AuthStore, {
      name: "Auth Store",
      //   partialize: (state) => ({
      //     catalog: state.catalog,
      //   }),
    })
  )
);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Auth Store Inspector Initialized", AuthStore);
}
