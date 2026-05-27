/**
 * localeStore — Zustand slice for KM/EN language toggle.
 *
 * Changing locale here:
 *  1. Updates Axios Accept-Language header (via api.ts interceptor)
 *  2. Re-triggers any components subscribed to useLocale()
 *  3. Persists choice to MMKV
 */

import { create } from 'zustand';

type Locale = 'km' | 'en';

interface LocaleState {
  locale:    Locale;
  setLocale: (l: Locale) => void;
  toggle:    () => void;
}

export const useLocaleStore = create<LocaleState>((set, get) => ({
  locale:    'km',
  setLocale: (locale) => set({ locale }),
  toggle:    ()       => set({ locale: get().locale === 'km' ? 'en' : 'km' }),
}));

/** For non-hook contexts (Axios interceptor) */
export const getLocale = () => useLocaleStore.getState().locale;
