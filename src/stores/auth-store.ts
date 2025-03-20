import { create } from 'zustand';

interface AuthStore {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  getAccessToken: () => string | null;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
  getAccessToken: () => get().accessToken,
})); 