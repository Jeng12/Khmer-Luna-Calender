# Khmer Lunar Calendar — CLAUDE.md
> **Full-stack mobile application** · Laravel 11 API + React Native (TypeScript)  
> Converts Gregorian ↔ Khmer lunar dates, shows moon phases, holidays & personal events.

---

## 📂 Repository Layout

```
Khmer-Luna-Calender/
├── docs/
│   ├── roadmap/
│   │   ├── RNRoadmap.jsx          ← Interactive navigation-architecture viewer
│   │   └── ProjectSummary.jsx     ← Full project overview (all phases, tech stack)
│   └── screens/
│       └── KhmerScreenLibrary.jsx ← 24 phone-frame mockups (interactive)
├── backend/                        ← Laravel 11 REST API
│   ├── app/
│   │   ├── Http/Controllers/       ← AuthController, CalendarController, …
│   │   ├── Http/Middleware/
│   │   ├── Models/                 ← User, Holiday, PersonalEvent, DeviceToken
│   │   └── Services/               ← KhmerCalendarService (wraps chhankitek)
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   └── routes/api.php
└── mobile/                         ← React Native (TypeScript)
    └── src/
        ├── navigation/             ← Root / Auth / Main navigators
        ├── screens/                ← auth / home / explore / activity / profile
        ├── components/             ← calendar grid, modals, common UI
        ├── hooks/                  ← useKhmerDate, useMoonPhase, …
        ├── services/               ← API client (Axios + Sanctum)
        ├── store/                  ← Zustand slices (auth, calendar, events)
        ├── theme/                  ← colors, typography, spacing tokens
        ├── types/                  ← TypeScript interfaces
        └── utils/                  ← date helpers, formatters
```

---

## 🗺️ Development Roadmap (6 Phases)

### Phase 1 — Foundation  *(Week 1)*
| Task | Tool / Command |
|------|----------------|
| Init Laravel project | `composer create-project laravel/laravel backend` |
| Install chhankitek | `composer require asorasoft/chhankitek` |
| Configure MySQL `.env` | edit `backend/.env` |
| Init React Native | `npx react-native@latest init KhmerLunarCalendar --template react-native-template-typescript` |
| Install Navigation v7 | `npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs` |
| Install peer deps | `npm install react-native-screens react-native-safe-area-context` |
| Install Sanctum client | `npm install axios @react-native-async-storage/async-storage` |

**Claude prompts for this phase:**
```
"Scaffold a Laravel 11 project with Sanctum auth. 
 Create the User model with name, email, language (km|en), preferred_view, and device_tokens relation."

"Create a React Native TypeScript project with React Navigation v7. 
 Set up the RootNavigator that switches between AuthStack and MainStack based on a Zustand auth store."
```

---

### Phase 2 — Backend Database & Auth  *(Week 1–2)*
| Migration | Table |
|-----------|-------|
| `create_users_table` | standard + `language`, `preferred_view` |
| `create_personal_events_table` | `user_id`, `title`, `description`, `gregorian_date`, `khmer_date` (json), `moon_phase` |
| `create_holidays_table` | `name_km`, `name_en`, `gregorian_date`, `lunar_month`, `lunar_day`, `type` |
| `create_device_tokens_table` | `user_id`, `token`, `platform` (ios\|android), unique on token |
| `create_personal_access_tokens_table` | via `php artisan vendor:publish --tag=sanctum-migrations` |

**Claude prompts:**
```
"Generate Laravel migrations for: personal_events, holidays, device_tokens. 
 personal_events needs a JSON column `khmer_date` that stores lunar day, lunar month, moon phase."

"Write a Laravel seeder that populates the holidays table with all 28 Cambodian public holidays 
 using asorasoft/chhankitek to auto-calculate lunar dates for the year 2026."
```

---

### Phase 3 — Backend API (18 Endpoints)  *(Week 2–3)*

#### Auth  `/api/auth`
| Method | Route | Controller |
|--------|-------|------------|
| POST | `/register` | `AuthController@register` |
| POST | `/login` | `AuthController@login` |
| POST | `/logout` | `AuthController@logout` |

#### Calendar  `/api/calendar`
| Method | Route | Notes |
|--------|-------|-------|
| GET | `/today` | current Gregorian + full Khmer info |
| GET | `/calendar/{year}/{month}` | monthly grid, cached 24h |
| POST | `/convert` | `{ gregorian_date }` ↔ `{ khmer_date }` |
| GET | `/auspicious-days` | query `?month=&year=` |

#### Holidays  `/api/holidays`
| Method | Route | Notes |
|--------|-------|-------|
| GET | `/holidays` | filter: year, type, public_only |
| GET | `/holidays/{id}` | single record |
| POST | `/holidays` | admin only |

#### Events  `/api/events`
| Method | Route | Notes |
|--------|-------|-------|
| GET | `/events` | auth user's events |
| POST | `/events` | auto-maps Gregorian → Khmer on create |
| GET | `/events/{id}` | |
| PUT | `/events/{id}` | |
| DELETE | `/events/{id}` | |

#### User  `/api/user`
| Method | Route | Notes |
|--------|-------|-------|
| GET | `/user/settings` | language, view, notif prefs |
| PATCH | `/user/settings` | update prefs |
| POST | `/user/device-token` | FCM upsert |

**Claude prompts:**
```
"Write a Laravel CalendarController with a `month()` method. 
 Use asorasoft/chhankitek to build a full monthly grid array where each day includes: 
 gregorian_date, lunar_day, lunar_month (KM+EN), moon_phase, is_holiday, is_auspicious. 
 Cache results with Cache::remember() keyed by year-month."

"Write a KhmerCalendarService that wraps chhankitek. Methods: 
 toKhmer(Carbon $date): array, getHolidays(int $year): array, 
 getMoonPhase(Carbon $date): string, getAuspiciousDays(int $year, int $month): array."
```

---

### Phase 4 — React Native Frontend  *(Week 3–5)*

#### 4a — Navigation & Auth Flow
```
"Implement the Auth Stack: Splash → Onboarding → Login → Register → ForgotPassword → OTPVerify. 
 Use AsyncStorage to persist the Sanctum token. On app launch, check token validity 
 and navigate to Main or Auth accordingly."
```

#### 4b — Calendar Screen (Core Feature)
```
"Build a KhmerCalendarGrid component in React Native. 
 It receives a `month: MonthData[]` prop. Each cell shows: 
 Gregorian day number (large), Khmer lunar day (small, gold), moon phase emoji (tiny top), 
 a jade dot for auspicious days, a lotus dot for holidays. 
 Selected day shows a gold highlight ring. 
 Font: Noto Serif Khmer for Khmer text, DM Mono for numbers."
```

#### 4c — Home Screen
```
"Build the HomeScreen for the Khmer Lunar Calendar app. 
 Top hero card: today's Gregorian date, full Khmer date string, moon phase emoji, BE year tag. 
 Below: 2×2 quick-action grid (Calendar, Auspicious, Holidays, Convert). 
 Then an upcoming-events list (next 3 holidays/auspicious days with day countdown). 
 Use Zustand todayStore. Colors: night=#0D0A0F, gold=#C8973A, crimson=#C0392B."
```

#### 4d — Date Converter Screen
```
"Build a DateConverter screen. Input: 3 selectors (day / month / year) for Gregorian date. 
 On submit, call POST /api/convert. Result card shows: 
 Khmer day name, lunar day + phase, lunar month (KM+EN), Buddhist Era year, zodiac year. 
 Add a swap button (⇅) to convert in the other direction."
```

#### 4e — Holidays & Auspicious Days
```
"Build a HolidayListScreen that fetches GET /api/holidays?year=2026. 
 Group by month, each item shows moon phase icon, Khmer name, EN name, lunar date. 
 Filter pill bar: All | National | Buddhist. 
 Tap → ArticleDetailScreen with full description."

"Build AuspiciousDaysScreen that fetches GET /api/auspicious-days?year=2026&month=5. 
 Each card: Gregorian + lunar date, moon phase, tag chips for ceremony types 
 (ពិធីមង្គលការ, ចូលផ្ទះ, ឈ្មួញ, ធ្វើដំណើរ). Filter by type."
```

#### 4f — Profile & Settings
```
"Build SettingsScreen. Groups: Language (toggle KM/EN), 
 Date Format (Gregorian | Lunar | Both), Notifications (per-type toggles), 
 Appearance (dark only for now), Privacy, Help. 
 On save, call PATCH /api/user/settings and update Zustand userStore."
```

---

### Phase 5 — Polish & Integration  *(Week 5–6)*

**Claude prompts:**
```
"Add bilingual support to the app. Create a useLocale() hook backed by Zustand. 
 All Khmer strings live in src/i18n/km.ts, English in src/i18n/en.ts. 
 KhmerTxt component auto-switches font (Noto Serif Khmer vs DM Sans) based on locale."

"Set up FCM push notifications for the React Native app. 
 On NotifSettings save, call POST /api/user/device-token with the FCM token. 
 Handle foreground/background notification display with notifee."

"Add offline support: cache the last-fetched monthly calendar data in MMKV. 
 If the API call fails, serve from cache with a stale-data banner."
```

---

### Phase 6 — Testing & Deployment  *(Week 6–7)*

**Claude prompts:**
```
"Write PHPUnit feature tests for CalendarController@month. 
 Test cases: valid month, leap year (intercalary month), 
 January boundary (year rollover), unauthenticated access returns 401."

"Write Jest + React Native Testing Library tests for KhmerCalendarGrid. 
 Test: renders correct number of cells, selected day has gold border, 
 holiday dot appears on correct day, moon phase emoji shows."

"Write a GitHub Actions workflow: 
 on push/PR → run `php artisan test` (Laravel) and `npx jest` (RN). 
 Cache composer and npm dependencies."
```

---

## ⚡ Quick-Reference Commands

### Backend
```bash
cd backend
composer install
cp .env.example .env && php artisan key:generate
php artisan migrate --seed
php artisan serve                          # http://localhost:8000

# Run tests
php artisan test

# Clear calendar cache
php artisan cache:clear
```

### Mobile
```bash
cd mobile
npm install
npx pod-install ios                        # iOS only

# Start Metro
npx react-native start

# Run on simulator
npx react-native run-ios
npx react-native run-android
```

### Docs (view artifacts in browser)
```bash
# Spin up a Vite preview to view JSX artifacts
cd docs
npx vite preview          # or open in Claude claude.ai artifact viewer
```

---

## 🎨 Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `night` | `#0D0A0F` | App background |
| `deep` | `#120E16` | Tab bar, header |
| `surface` | `#1A1520` | Input fields |
| `card` | `#221C2A` | Cards, list items |
| `gold` | `#C8973A` | Primary accent, Khmer text highlight |
| `goldL` | `#E8B84B` | Lighter gold for large numbers |
| `crimson` | `#C0392B` | Weekend days, destructive actions |
| `lotus` | `#E8768A` | Holidays, Buddhist events |
| `jade` | `#4DAF7C` | Auspicious days |
| `moon` | `#F2E8C6` | Primary heading text |
| `sky` | `#7BA7BC` | Activity stack accent |

**Typography:**
- Khmer content → `Noto Serif Khmer` (weights 400, 600, 700)
- Latin labels → `Battambang` (weights 400, 700) 
- Monospace / code → `DM Mono` (weights 400, 500, 700)

---

## 📦 Tech Stack Summary

| Layer | Technology |
|-------|-----------|
| Backend framework | Laravel 11 (PHP 8.3) |
| Database | MySQL 8 |
| Auth | Laravel Sanctum (token-based) |
| Lunar algorithm | `asorasoft/chhankitek` |
| Mobile framework | React Native 0.74+ (TypeScript) |
| Navigation | `@react-navigation/native` v7 |
| State management | Zustand |
| Storage | MMKV (fast key-value) |
| HTTP client | Axios |
| Push notifications | Firebase FCM + notifee |
| Fonts | Noto Serif Khmer, Battambang, DM Mono |
| Testing (BE) | PHPUnit / Laravel Pest |
| Testing (FE) | Jest + React Native Testing Library |
| CI/CD | GitHub Actions |

---

## 📄 Key Files Reference

| File | Purpose |
|------|---------|
| `docs/roadmap/ProjectSummary.jsx` | Interactive project overview — all phases, stats, tech stack |
| `docs/roadmap/RNRoadmap.jsx` | Navigation architecture tree — all 6 navigators, 24 screens |
| `docs/screens/KhmerScreenLibrary.jsx` | 24 phone-frame mockups with zoom — Auth/Home/Explore/Activity/Profile |
| `backend/app/Services/KhmerCalendarService.php` | Core service wrapping chhankitek |
| `mobile/src/theme/tokens.ts` | Design system constants |
| `mobile/src/navigation/RootNavigator.tsx` | Top-level auth-gating navigator |
| `mobile/src/screens/home/CalendarScreen.tsx` | Main calendar grid (core feature) |

---

## 🤝 Working with Claude

When prompting Claude on this project:

1. **Always include context**: mention `asorasoft/chhankitek` when asking about lunar calculations
2. **Reference the screen mockups**: "implement the CalendarScreen as shown in `docs/screens/KhmerScreenLibrary.jsx`"
3. **Use the design tokens**: copy the token table above into your prompt
4. **Bilingual by default**: always ask for both `name_km` and `name_en` fields in API responses
5. **Caching reminder**: calendar data is expensive to compute — always cache by `year-month` key

---

*Last updated: May 2026 · Branch: `claude/project-structure-roadmap-GDGDR`*
