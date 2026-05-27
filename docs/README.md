# 📂 Docs — Interactive Artifacts

These JSX files are self-contained React components. Open them in the **Claude artifact viewer** (paste into a Claude chat) or spin up a local Vite app.

| File | What it shows |
|------|--------------|
| [`roadmap/ProjectSummary.jsx`](roadmap/ProjectSummary.jsx) | Full project overview — 7 phases, tech stack, stats, deliverables |
| [`roadmap/RNRoadmap.jsx`](roadmap/RNRoadmap.jsx) | React Navigation architecture — 6 navigators, 24 screens, 6 modals |
| [`screens/KhmerScreenLibrary.jsx`](screens/KhmerScreenLibrary.jsx) | 24 phone-frame mockups — click to zoom, filter by stack |

## Viewing locally

```bash
# From repo root:
npx create-vite@latest docs-preview --template react
cd docs-preview
# Copy one of the JSX files into src/App.jsx, then:
npm install && npm run dev
```

## Color Key (Screen Library)

| Stack | Accent color |
|-------|-------------|
| Auth | Crimson `#C0392B` |
| Home | Gold `#C8973A` |
| Explore | Lotus `#E8768A` |
| Activity | Sky `#7BA7BC` |
| Profile | Jade `#4DAF7C` |
