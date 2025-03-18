import { User } from "@/models/user-model";
import { create } from "zustand";


type State = {
  user: User | null
}

type Action = {
  setUser: (user: State["user"]) => void
  clearUser: (user: State["user"]) => void
}
export const useUserStore = create<State & Action>((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user: user })),
  clearUser: () => set(() => ({ user: null })),
}));
