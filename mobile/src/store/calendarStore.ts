/**
 * calendarStore — Zustand slice for calendar state.
 *
 * Holds:
 *  - todayData: full KhmerDate for today (loaded at startup)
 *  - monthCache: map of "YYYY-MM" → MonthData (avoids re-fetching)
 *  - selectedDay: currently highlighted day in the grid
 */

import { create } from 'zustand';
import type { KhmerDate, MonthData } from '../types/calendar';

interface CalendarState {
  todayData:    KhmerDate | null;
  selectedDay:  number;
  monthCache:   Record<string, MonthData>;

  setToday:     (data: KhmerDate) => void;
  setSelected:  (day: number) => void;
  cacheMonth:   (key: string, data: MonthData) => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  todayData:   null,
  selectedDay: new Date().getDate(),
  monthCache:  {},

  setToday:    (data)         => set({ todayData: data }),
  setSelected: (day)          => set({ selectedDay: day }),
  cacheMonth:  (key, data)    => set(s => ({
    monthCache: { ...s.monthCache, [key]: data },
  })),
}));
