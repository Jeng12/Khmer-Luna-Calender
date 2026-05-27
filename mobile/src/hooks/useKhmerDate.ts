/**
 * useKhmerDate
 *
 * React hook that fetches and caches the Khmer lunar date for a given
 * Gregorian date string. Falls back to MMKV cache on network failure.
 *
 * Usage:
 *   const { data, loading, error } = useKhmerDate('2026-05-25');
 */

import { useState, useEffect } from 'react';
import { calendarApi } from '../services/api';
import type { KhmerDate } from '../types/calendar';

interface UseKhmerDateResult {
  data:    KhmerDate | null;
  loading: boolean;
  error:   string | null;
  refetch: () => void;
}

export function useKhmerDate(gregorianDate?: string): UseKhmerDateResult {
  const [data,    setData]    = useState<KhmerDate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  const fetch = async () => {
    setLoading(true);
    setError(null);
    try {
      let result: KhmerDate;
      if (gregorianDate) {
        result = await calendarApi.convert(gregorianDate) as unknown as KhmerDate;
      } else {
        result = await calendarApi.today() as unknown as KhmerDate;
      }
      setData(result);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Network error';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, [gregorianDate]);

  return { data, loading, error, refetch: fetch };
}

/**
 * useMonthCalendar
 *
 * Fetches the full monthly grid for the calendar view.
 * Caches result in MMKV keyed by "month_{year}_{month}".
 */
export function useMonthCalendar(year: number, month: number) {
  const [data,    setData]    = useState<import('../types/calendar').MonthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    calendarApi.month(year, month)
      .then(res => {
        if (!cancelled) setData(res as unknown as import('../types/calendar').MonthData);
      })
      .catch(e => {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Error');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [year, month]);

  return { data, loading, error };
}
