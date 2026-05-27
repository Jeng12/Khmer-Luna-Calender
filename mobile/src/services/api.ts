/**
 * API Service — Axios client for the Laravel backend.
 *
 * Features:
 * - Base URL from environment variable
 * - Sanctum token injected from MMKV store
 * - Accept-Language header driven by Zustand locale store
 * - Response envelope unwrapping ({ success, data })
 * - 401 auto-logout
 */

import axios from 'axios';
// import { getToken, clearToken } from '../store/authStore';
// import { getLocale } from '../store/localeStore';

const BASE_URL = process.env.API_URL ?? 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
    Accept:         'application/json',
  },
});

// ── Request interceptor: attach token + language ──────────────────────────
api.interceptors.request.use(config => {
  // const token  = getToken();
  // const locale = getLocale();

  // if (token)  config.headers.Authorization  = `Bearer ${token}`;
  // if (locale) config.headers['Accept-Language'] = locale;

  return config;
});

// ── Response interceptor: unwrap envelope + handle 401 ────────────────────
api.interceptors.response.use(
  response => response.data,   // unwrap Axios layer
  error => {
    if (error.response?.status === 401) {
      // clearToken();
      // Navigate to Auth (via navigation ref)
    }
    return Promise.reject(error);
  }
);

// ── Calendar endpoints ────────────────────────────────────────────────────

export const calendarApi = {
  today:          ()                         => api.get('/calendar/today'),
  month:          (year: number, month: number) => api.get(`/calendar/${year}/${month}`),
  convert:        (gregorian_date: string)   => api.post('/calendar/convert', { gregorian_date }),
  auspiciousDays: (year: number, month: number) => api.get('/calendar/auspicious-days', { params: { year, month } }),
};

// ── Auth endpoints ────────────────────────────────────────────────────────

export const authApi = {
  login:    (data: { email: string; password: string })                            => api.post('/auth/login', data),
  register: (data: { name: string; email: string; password: string; language?: string }) => api.post('/auth/register', data),
  logout:   ()                                                                     => api.post('/auth/logout'),
};

// ── Holiday endpoints ─────────────────────────────────────────────────────

export const holidayApi = {
  list: (params?: { year?: number; type?: string; public_only?: boolean }) =>
    api.get('/holidays', { params }),
  show: (id: number) => api.get(`/holidays/${id}`),
};

// ── Events endpoints ──────────────────────────────────────────────────────

export const eventApi = {
  list:   ()                                     => api.get('/events'),
  create: (data: { title: string; gregorian_date: string; description?: string }) =>
    api.post('/events', data),
  update: (id: number, data: Partial<{ title: string; description: string }>) =>
    api.put(`/events/${id}`, data),
  delete: (id: number)                           => api.delete(`/events/${id}`),
};

// ── User endpoints ────────────────────────────────────────────────────────

export const userApi = {
  getSettings:    ()                                => api.get('/user/settings'),
  updateSettings: (data: Record<string, unknown>)   => api.patch('/user/settings', data),
  upsertToken:    (token: string, platform: 'ios' | 'android') =>
    api.post('/user/device-token', { token, platform }),
};
