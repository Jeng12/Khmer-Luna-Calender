/**
 * authStore — Zustand slice for authentication state.
 *
 * Token is persisted in MMKV via zustand-mmkv-storage middleware.
 * On app launch, RootNavigator reads `isAuth` to decide which stack to show.
 */

import { create } from 'zustand';
import type { AuthState, User } from '../types/auth';

export const useAuthStore = create<AuthState>((set) => ({
  user:    null,
  token:   null,
  isAuth:  false,

  setAuth: (user: User, token: string) =>
    set({ user, token, isAuth: true }),

  clearAuth: () =>
    set({ user: null, token: null, isAuth: false }),
}));

/** Helper — call from Axios interceptor (no hook rules) */
export const getToken    = () => useAuthStore.getState().token;
export const clearToken  = () => useAuthStore.getState().clearAuth();
