# CLAUDE.md — Khmer Lunar Calendar

> **For AI assistants:** This file is the primary reference for understanding this project. Read it fully before making changes. Keep it up-to-date whenever the architecture, conventions, or workflows change.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Current Repository State](#2-current-repository-state)
3. [Domain Knowledge — The Khmer Lunar Calendar](#3-domain-knowledge--the-khmer-lunar-calendar)
4. [Intended Tech Stack](#4-intended-tech-stack)
5. [Proposed Directory Structure](#5-proposed-directory-structure)
6. [Development Workflow](#6-development-workflow)
7. [Coding Conventions](#7-coding-conventions)
8. [Git & Branching Strategy](#8-git--branching-strategy)
9. [Testing Strategy](#9-testing-strategy)
10. [Environment Variables](#10-environment-variables)
11. [Deployment](#11-deployment)
12. [AI Assistant Guidelines](#12-ai-assistant-guidelines)

---

## 1. Project Overview

**Khmer Lunar Calendar** is an open-source application that converts between the Gregorian (Western solar) calendar and the traditional Khmer (Cambodian) lunar calendar system. It aims to:

- Convert any Gregorian date to its Khmer lunar equivalent (month, day, year, lunar phase, zodiac cycle)
- Display upcoming Khmer national holidays and traditional observance days
- Provide moon-phase calculations aligned with the Khmer calendar
- Support the Khmer language (ខ្មែរ) as the primary language with English as a secondary language

**License:** MIT — Copyright © 2026 Jeng12

**Primary language:** Khmer (km) / English (en)

---

## 2. Current Repository State

> **Status: Bootstrapping (as of 2026-05-27)**

| File | Status |
|------|--------|
| `LICENSE` | ✅ Present (MIT) |
| `README.md` | ❌ Not yet created |
| `CLAUDE.md` | ✅ This file |
| Source code | ❌ Not yet initialized |
| `package.json` | ❌ Not yet created |
| Database schema | ❌ Not yet created |
| CI/CD pipelines | ❌ Not yet configured |

The project has a single initial commit on `main`. All new development happens on feature branches (see §8).

---

## 3. Domain Knowledge — The Khmer Lunar Calendar

This is critical context. The Khmer calendar is a **lunisolar calendar** adapted from the Hindu calendar tradition (via ancient Indian influence on the Khmer Empire). Understanding these concepts is required to work correctly on any calendar calculation logic.

### 3.1 Core Concepts

| Concept | Khmer Term | Description |
|---------|-----------|-------------|
| Lunar month | ខែ (Khae) | Months follow the lunar cycle (~29.5 days) |
| Intercalary month | ខែបន្ថែម | A 13th month added every ~3 years to sync with the solar year (lunisolar intercalation) |
| Lunar day | ថ្ងៃខ | Days 1–15 (waxing) and 1–15 (waning) within a lunar month |
| Waxing fortnight | រោច (Roach) | Days 1–15 of the first half of the month (new moon → full moon) |
| Waning fortnight | កើត (Kaet) | Days 1–15 of the second half of the month (full moon → new moon) |
| Khmer New Year | ចូលឆ្នាំខ្មែរ | Mid-April, determined by solar entry into Aries (not the lunar calendar) |
| 12-year animal cycle | ចក្រ ១២ | Corresponds roughly to the Chinese zodiac cycle |
| 10-year celestial cycle | ចក្រ ១០ | A ten-stem cycle combined with the 12-year cycle for a 60-year grand cycle |

### 3.2 Khmer Lunar Month Names

The Khmer calendar has 12 regular lunar months plus 1 intercalary month:

| # | Khmer Name | Transliteration |
|---|-----------|----------------|
| 1 | មិគសិរ | Mikasear |
| 2 | បុស្ស | Bos |
| 3 | មាឃ | Meak |
| 4 | ផល្គុន | Phalgun |
| 5 | ចេត្រ | Chaet |
| 6 | វិសាខ | Visak |
| 7 | ជេស្ឋ | Chhes |
| 8 | អាសាឍ | Asadh |
| 9 | ស្រាពណ៍ | Srap |
| 10 | ភទ្របទ | Phatrobot |
| 11 | អស្សុជ | Asoch |
| 12 | កត្តិក | Katdek |
| Intercalary | បឋមអាសាឍ (ទុតិយអាសាឍ) | Phatham Asadh / Tottiya Asadh |

### 3.3 Key Reference Points

- **Epoch:** The Khmer calendar uses the Buddhist Era (BE) starting 543 years before the Common Era (CE). E.g., 2025 CE = 2568 BE.
- **Year start:** Khmer New Year falls on April 13–15, determined astronomically (solar Sankranti into Aries) — **not** on a fixed lunar date.
- **Intercalation rules:** An intercalary month (a second Asadh) is added when the solar year requires adjustment. This occurs approximately every 2–3 years following traditional astronomical tables (Suriyayatra).
- **Authoritative source:** The Royal Academy of Cambodia (រាជបណ្ឌិត្យសភាកម្ពុជា) publishes the official calendar each year. Algorithms should be validated against it.

### 3.4 Major Holidays (Fixed by Lunar Calendar)

| Holiday | Khmer | Lunar Date |
|---------|-------|-----------|
| Meak Bochea | មាឃបូជា | Full moon of Meak (month 3) |
| Khmer New Year | ចូលឆ្នាំខ្មែរ | Solar-determined (~April 13–15) |
| Visak Bochea | វិសាខបូជា | Full moon of Visak (month 6) |
| Pchum Ben | ភ្ជុំបិណ្ឌ | Waning days 1–15 of Phatrobot (month 10) |
| Bon Om Touk | បុណ្យអុំទូក | Full moon of Katdek (month 12) |
| Kathen | ភ្ជុំ​កឋិន | Month 11–12 period |

---

## 4. Intended Tech Stack

> These are the **planned** technologies. Update this section as choices are finalized during project setup.

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | **Next.js 15** (App Router) | TypeScript, React Server Components |
| Language | **TypeScript 5** | Strict mode enabled |
| Styling | **Tailwind CSS v4** | Utility-first CSS |
| UI Components | **shadcn/ui** | Accessible, composable components |
| Calendar Logic | Custom TypeScript library | Core domain logic, no external dependency |
| Internationalization | **next-intl** | `km` (Khmer) primary, `en` secondary |
| Database | **Supabase (PostgreSQL)** | Holiday data, user preferences |
| Authentication | **Supabase Auth** | Optional user accounts |
| Deployment | **Vercel** | Zero-config Next.js deployment |
| Testing | **Vitest** + **Testing Library** | Unit + integration tests |
| Linting | **ESLint** + **Prettier** | Enforced in CI |

---

## 5. Proposed Directory Structure

Once initialized, the project should follow this structure:

```
khmer-luna-calender/
├── CLAUDE.md                    # This file (keep updated)
├── README.md                    # Public-facing project docs
├── LICENSE
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
├── .env.local                   # Local secrets (gitignored)
├── .env.example                 # Template for required env vars
├── .eslintrc.json
├── .prettierrc
│
├── src/
│   ├── app/                     # Next.js App Router pages
│   │   ├── layout.tsx           # Root layout (fonts, providers)
│   │   ├── page.tsx             # Home page (today's Khmer date)
│   │   ├── [locale]/            # i18n routing (km, en)
│   │   │   ├── calendar/        # Full calendar view
│   │   │   ├── converter/       # Date converter tool
│   │   │   └── holidays/        # Holidays list page
│   │   └── api/                 # API routes (if needed)
│   │
│   ├── components/
│   │   ├── ui/                  # shadcn/ui primitives (auto-generated)
│   │   ├── calendar/            # Calendar-specific components
│   │   │   ├── MonthView.tsx
│   │   │   ├── DayCell.tsx
│   │   │   └── LunarDateBadge.tsx
│   │   └── layout/              # Header, Footer, Nav
│   │
│   ├── lib/
│   │   ├── khmer-calendar/      # Core domain logic (pure functions)
│   │   │   ├── index.ts         # Public API
│   │   │   ├── conversion.ts    # Gregorian ↔ Khmer date math
│   │   │   ├── intercalation.ts # Intercalary month rules
│   │   │   ├── holidays.ts      # Holiday calculation rules
│   │   │   ├── moon-phase.ts    # Lunar phase calculations
│   │   │   └── types.ts         # Domain types
│   │   ├── supabase/            # Supabase client setup
│   │   │   ├── client.ts        # Browser client
│   │   │   └── server.ts        # Server client (RSC / Route handlers)
│   │   └── utils.ts             # General utility helpers
│   │
│   ├── hooks/                   # Custom React hooks
│   ├── types/                   # Shared TypeScript types & interfaces
│   └── i18n/
│       ├── messages/
│       │   ├── km.json          # Khmer translations
│       │   └── en.json          # English translations
│       └── routing.ts           # next-intl config
│
├── supabase/
│   ├── migrations/              # SQL migration files
│   └── seed.sql                 # Seed data (holidays, etc.)
│
├── public/
│   ├── fonts/                   # Khmer Unicode fonts (e.g., Hanuman, Battambang)
│   └── icons/
│
└── tests/
    ├── unit/
    │   └── khmer-calendar/      # Unit tests for calendar logic
    └── integration/             # Integration tests
```

### Key Structural Rules

- **`src/lib/khmer-calendar/`** is the most important module. It must be **pure TypeScript** with no React or Next.js imports — it is framework-agnostic logic that can be tested independently.
- All calendar math must live in `src/lib/khmer-calendar/`. Never inline calendar calculations in components.
- Components must not contain business logic. Data transformation belongs in `lib/` or server actions.

---

## 6. Development Workflow

### Prerequisites (once initialized)

```bash
node --version   # >= 20.x (LTS)
pnpm --version   # >= 9.x  (preferred package manager)
```

### Getting Started

```bash
# Clone and install
git clone https://github.com/jeng12/khmer-luna-calender.git
cd khmer-luna-calender
pnpm install

# Set up environment
cp .env.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY

# Start development server
pnpm dev            # http://localhost:3000

# Run tests
pnpm test           # Vitest unit tests
pnpm test:watch     # Watch mode

# Lint and format
pnpm lint
pnpm format
```

### Supabase Local Development

```bash
# Start local Supabase stack
supabase start

# Apply migrations
supabase db push

# Generate TypeScript types from DB schema
supabase gen types typescript --local > src/types/database.ts
```

---

## 7. Coding Conventions

### TypeScript

- **Strict mode** is required (`"strict": true` in tsconfig).
- Prefer `type` over `interface` for data shapes; use `interface` only for extensible contracts.
- No `any`. Use `unknown` and narrow types explicitly.
- Export types from `src/types/` or co-locate with their module.
- Use `satisfies` operator for config objects to get type inference without widening.

### Naming

| Item | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `MonthView.tsx` |
| Hooks | camelCase with `use` prefix | `useKhmerDate.ts` |
| Utility functions | camelCase | `gregorianToKhmer()` |
| Types / Interfaces | PascalCase | `KhmerDate`, `LunarMonth` |
| Constants | SCREAMING_SNAKE_CASE | `KHMER_MONTHS` |
| CSS classes | Tailwind utilities only | no custom CSS files unless unavoidable |
| Database columns | snake_case | `lunar_month`, `created_at` |

### Khmer Language Handling

- All Khmer text must use **Khmer Unicode** (U+1780–U+17FF range). Do not use legacy encodings (Limon, ABC).
- Font stack for Khmer: `'Hanuman', 'Battambang', 'Noto Sans Khmer', sans-serif`.
- Use `next-intl` message keys for **all** UI strings — no hardcoded text in components.
- Khmer numerals (០–៩) should be used in calendar displays; provide a toggle to switch to Arabic numerals.
- RTL is not needed (Khmer is left-to-right).

### Calendar Logic

- All date inputs/outputs in the core library must use **ISO 8601 strings** (`YYYY-MM-DD`) or a typed `KhmerDate` object — never raw JavaScript `Date` objects inside calendar logic (to avoid timezone bugs).
- Functions in `src/lib/khmer-calendar/` must be **pure** (no side effects, no I/O).
- Every conversion function must have corresponding unit tests with edge cases including:
  - Intercalary years
  - New Year boundary days (April 13–15)
  - Full moon / new moon days
  - Year boundaries (last day of Katdek / first day of Mikasear)

### Components

- Prefer **React Server Components** (RSC) by default. Add `"use client"` only when needed (event handlers, hooks, browser APIs).
- Co-locate component-specific types with the component file.
- Use `next/image` for all images.

---

## 8. Git & Branching Strategy

### Branch Naming

```
main              — Production-ready code only
develop           — Integration branch (if used)
feature/<name>    — New features
fix/<name>        — Bug fixes
chore/<name>      — Non-code changes (docs, deps, CI)
claude/<name>     — AI-assisted development branches (auto-generated)
```

### Commit Messages

Follow **Conventional Commits**:

```
<type>(<scope>): <short summary>

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`

Examples:
```
feat(calendar): add Gregorian-to-Khmer date conversion
fix(holidays): correct Pchum Ben end date calculation for intercalary years
docs(claude): update directory structure after Next.js init
test(conversion): add edge case tests for year boundary
```

### Pull Requests

- Every PR must have a description explaining **what** and **why**.
- PRs touching `src/lib/khmer-calendar/` require updated/passing unit tests.
- Keep PRs focused — one feature or fix per PR.

---

## 9. Testing Strategy

### Unit Tests (`tests/unit/`)

- Framework: **Vitest**
- Focus: `src/lib/khmer-calendar/` — every exported function must be tested.
- Test calendar conversions against authoritative Khmer calendar sources.
- Run with: `pnpm test`

### Integration Tests (`tests/integration/`)

- Framework: **Vitest** + **Testing Library**
- Test page-level behavior and data flows.

### What NOT to test

- shadcn/ui primitives (they are pre-tested upstream).
- Next.js routing behavior (framework responsibility).
- Styling details.

---

## 10. Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=          # Your Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=     # Supabase anonymous public key
SUPABASE_SERVICE_ROLE_KEY=         # Server-only: never expose to client

# App
NEXT_PUBLIC_APP_URL=               # e.g., https://khmer-calendar.vercel.app
NEXT_PUBLIC_DEFAULT_LOCALE=km      # Default UI locale
```

> **AI assistant note:** Never commit `.env.local`. Never expose `SUPABASE_SERVICE_ROLE_KEY` in client-side code or logs.

---

## 11. Deployment

- **Platform:** Vercel (configured via `vercel.json` or dashboard)
- **Branch → Environment mapping:**
  - `main` → Production
  - `develop` → Preview (staging)
  - Feature branches → Preview (ephemeral)
- **Database:** Supabase hosted project (production) + Supabase branch previews for staging.
- Vercel environment variables must mirror `.env.example`.

---

## 12. AI Assistant Guidelines

This section is specifically for AI coding assistants (Claude, Copilot, etc.) working in this repository.

### Always Do

- ✅ Read this file fully before starting any task.
- ✅ **Update this CLAUDE.md** whenever you make architectural decisions, add new dependencies, or establish new conventions.
- ✅ Keep calendar logic **pure and framework-agnostic** in `src/lib/khmer-calendar/`.
- ✅ Verify Khmer calendar calculations against the domain knowledge in §3.
- ✅ Write or update tests when modifying calendar logic.
- ✅ Use `pnpm` (not `npm` or `yarn`) for package management.
- ✅ Prefer TypeScript strict types over `any` or type assertions.
- ✅ Ask clarifying questions before making large structural changes.

### Never Do

- ❌ Do not hardcode calendar conversion tables for years beyond a ~100-year window without reference to the official Suriyayatra astronomical tables.
- ❌ Do not use JavaScript `Date` objects inside calendar calculation logic (timezone-sensitive and unreliable).
- ❌ Do not add client-side dependencies (`"use client"`) to components that can be server components.
- ❌ Do not commit secrets, `.env.local`, or any `SERVICE_ROLE_KEY` values.
- ❌ Do not bypass TypeScript strict checks with `@ts-ignore` or `any` without a documented reason.
- ❌ Do not rename the `src/lib/khmer-calendar/` module without updating all imports and this document.
- ❌ Do not use legacy Khmer encodings (Limon, ABC fonts) — only Khmer Unicode.

### When Bootstrapping the Project

When the project is first initialized (running `create-next-app` or equivalent), the AI should:

1. Set up Next.js 15 with TypeScript, Tailwind CSS, and App Router.
2. Create the directory structure described in §5.
3. Initialize the Supabase client setup in `src/lib/supabase/`.
4. Create the skeleton of `src/lib/khmer-calendar/` with typed interfaces and stub functions.
5. Configure `next-intl` with `km` and `en` locale files.
6. Set up Vitest and write placeholder tests.
7. **Update this CLAUDE.md** to reflect the actual initialized state (remove "not yet created" entries).

### Khmer Calendar Logic Guidance

When implementing conversion algorithms:
- The primary reference is the **Suriyayatra** astronomical calculation system used by the Royal Academy of Cambodia.
- Cross-validate output against published Khmer calendars for years 2020–2030 as a sanity check.
- Handle the **intercalary month** (second Asadh) carefully — it shifts all subsequent month dates in the affected year.
- The Khmer new year is determined by the **solar Sankranti** (Sun entering Aries), not a fixed date — use an astronomical formula, not a hardcoded April 13.

---

*Last updated: 2026-05-27 — Repository bootstrapping phase*
