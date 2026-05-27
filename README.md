# 🌙 ប្រតិទិនខ្មែរ · Khmer Lunar Calendar

A full-stack mobile application that converts Gregorian dates to the traditional **Khmer lunisolar calendar**, shows auspicious days, moon phases, and cultural holidays — in both Khmer and English.

[![Laravel](https://img.shields.io/badge/Laravel-11-FF2D20?logo=laravel)](https://laravel.com)
[![React Native](https://img.shields.io/badge/React%20Native-0.74-61DAFB?logo=react)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📅 **Lunar Calendar** | Full monthly grid with Khmer lunar day overlay, moon phases, and Buddhist Era year |
| 🔄 **Date Converter** | Gregorian ↔ Khmer lunar date conversion with zodiac year |
| 🌿 **Auspicious Days** | Filter by ceremony type: wedding, house-entering, travel, business |
| 🎉 **Holidays** | All 28 Cambodian public + Buddhist holidays with lunar dates |
| 📝 **Personal Events** | Create events that auto-map to the lunar calendar at save time |
| 🔔 **Push Notifications** | FCM reminders for holidays, moon phases, and personal events |
| 🌐 **Bilingual** | Full Khmer (ខ្មែរ) and English UI toggle |

---

## 🗂️ Project Structure

```
Khmer-Luna-Calender/
├── docs/                    # Interactive artifacts (open in browser / Claude viewer)
│   ├── roadmap/
│   │   ├── ProjectSummary.jsx     ← Full project overview
│   │   └── RNRoadmap.jsx          ← Navigation architecture
│   └── screens/
│       └── KhmerScreenLibrary.jsx ← 24 screen mockups
├── backend/                 # Laravel 11 REST API
└── mobile/                  # React Native app (TypeScript)
```

> See **[CLAUDE.md](CLAUDE.md)** for the complete step-by-step development guide.

---

## 🚀 Quick Start

### Backend
```bash
cd backend
composer install
cp .env.example .env
# Edit .env: DB_DATABASE, DB_USERNAME, DB_PASSWORD
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

### Mobile
```bash
cd mobile
npm install
npx pod-install ios          # iOS only
npx react-native start
npx react-native run-ios     # or run-android
```

---

## 📡 API Overview

Base URL: `http://localhost:8000/api`

| Group | Endpoints | Auth |
|-------|-----------|------|
| Auth | POST /register, /login, /logout | No |
| Calendar | GET /today, /calendar/{y}/{m}, POST /convert, GET /auspicious-days | Yes |
| Holidays | GET /holidays, /holidays/{id}, POST /holidays | Yes (POST: admin) |
| Events | CRUD /events | Yes |
| User | GET/PATCH /user/settings, POST /user/device-token | Yes |

Full interactive docs: `docs/api/`

---

## 🧮 Khmer Lunisolar Algorithm

This app uses the **[asorasoft/chhankitek](https://github.com/asorasoft/chhankitek)** PHP package — a faithful implementation of the traditional Chhankitek (ចន្ទគតិ) calendar system:

- **Aharkun** — day count since epoch
- **Avoman** — determines leap day (Adhikavas, 355-day year)
- **Bodithey** — determines leap month (Adhikameas, 384-day year, intercalated Ashad)
- **Buddhist Era (BE)** = Gregorian year + 544

---

## 🎨 Design System

| Color | Hex | Role |
|-------|-----|------|
| Night | `#0D0A0F` | Background |
| Gold | `#C8973A` | Primary accent |
| Crimson | `#C0392B` | Holidays, weekends |
| Lotus | `#E8768A` | Buddhist events |
| Jade | `#4DAF7C` | Auspicious days |
| Moon | `#F2E8C6` | Heading text |

Fonts: **Noto Serif Khmer** · **Battambang** · **DM Mono**

---

## 📋 Development Phases

- [x] **Phase 1** — Research & Algorithm (chhankitek evaluation)
- [x] **Phase 2** — Design System & Screen Mockups (24 screens)
- [x] **Phase 3** — Navigation Architecture (6 navigators, 6 modals)
- [ ] **Phase 4** — Backend API (Laravel migrations + 18 endpoints)
- [ ] **Phase 5** — React Native Frontend (calendar grid + all screens)
- [ ] **Phase 6** — Polish, Testing & Deployment

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -m 'feat: add your feature'`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

[MIT](LICENSE) © 2026 Jeng12
