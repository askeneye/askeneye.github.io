# WeBoost Campaign Dashboard

A reusable marketing performance dashboard template. Edit one data file, refresh the browser — all 6 pages update automatically.

## Quick start (preview locally)

```powershell
cd C:\Users\asket\Desktop\WB_Dashboard
python -m http.server 8080
```

Open [http://localhost:8080](http://localhost:8080). Charts require a local server — do not rely on double-clicking `index.html`.

---

## Updating for a new report

All report-specific content lives in **`js/data.js`**. Layout, styling, and charts are handled automatically.

### Scenario A: Same client, new period

1. Open `js/data.js`
2. Update `period` and any titles/subtitles that reference the old period
3. Replace numbers and text section by section (see field mapping below)
4. Update `index.html` `<title>` if the period appears there
5. Save and refresh the browser
6. Spot-check all 6 pages via the sidebar

### Scenario B: New client/property

1. Copy the entire `WB_Dashboard` folder and rename it (e.g. `WB_Dashboard_Skelbaekgade`)
2. Edit `js/data.js` — change `client`, `period`, and all data
3. Edit `index.html` — update the `<title>` to match the new client
4. Preview locally, then share or deploy

Channel colors stay the same (Meta, Google Search, Display, LinkedIn). Only the numbers and text change.

---

## Data field mapping

| Dashboard page | `data.js` key | What to update |
|---|---|---|
| Overview | `overview` | `kpis[]`, `summary`, `conclusion`, `title`, `subtitle` |
| Channels | `channels` | `rows[]` (exposures, clicks), `total`, `assessment`, `title`, `subtitle` |
| Engagement | `engagement` | `percentage` (number), `description`, `insight`, `title`, `subtitle` |
| Portals | `portals` | `items[]` with `periods[]` tables per portal |
| Funnel | `funnel` | `stages[]`, `challenge`, `title`, `subtitle` |
| Recommendations | `recommendations` | `items[]`, `workModel[]`, `closing`, `title`, `subtitle` |

Top-level fields used on every page:

| Field | Example |
|---|---|
| `client` | `"Holmbladshus"` |
| `period` | `"Maj–Juni 2026"` |
| `campaignYear` | `"Kampagnestatus 2026"` |

### Number formats

- **Charts** (channel exposures/clicks): plain numbers — `70567`, `7791`
- **Display text** (KPI cards, funnel values): formatted strings — `"409.783"`, `"~40%"`

The app formats chart/table numbers with Danish thousand separators automatically.

### PDF → dashboard mapping

| PDF section | Dashboard page |
|---|---|
| HVOR STÅR VI? | Overview |
| BLIVER DET SET? | Channels |
| REEL INTERESSE? | Engagement |
| Portal data (Lokalebasen, Ejendomstorvet, RED.dk) | Portals |
| DET SAMLEDE BILLEDE | Funnel |
| NÆSTE SKRIDT | Recommendations |

---

## Project structure

```
WB_Dashboard/
├── index.html          # Page shell (update <title> per client)
├── WB_white.svg        # WeBoost logo
├── css/styles.css      # Dark theme, layout (do not edit per report)
├── js/
│   ├── data.js         # ← EDIT THIS for each new report
│   └── app.js          # Rendering logic (do not edit per report)
├── design/             # Figma tokens and component reference
└── README.md           # This file
```

---

## Sharing with clients

### GitHub Pages (this project)

Live site: **https://askeneye.github.io/**

The dashboard is published from the [`askeneye.github.io`](https://github.com/askeneye/askeneye.github.io) repository.

**To update the live site after editing data:**

```powershell
cd C:\Users\asket\Desktop\WB_Dashboard
git add js/data.js index.html
git commit -m "Update report data for [client] [period]"
git push origin main
```

Changes appear on https://askeneye.github.io/ within 1–2 minutes.

**First-time setup** (already done if the site is live):

1. Push this folder to `https://github.com/askeneye/askeneye.github.io.git`
2. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from branch → main → / (root)**

### Netlify (alternative)

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the `WB_Dashboard` folder onto the page
3. Netlify gives you a URL (e.g. `https://random-name.netlify.app`)
4. To update: edit `js/data.js`, then drag the folder again (or connect a Git repo for automatic deploys)

### GitHub Pages

1. Push this folder to a GitHub repository
2. Go to **Settings → Pages → Source: Deploy from branch → main → / (root)**
3. Your site will be at `https://<username>.github.io/<repo-name>/`
4. To update: edit `js/data.js`, commit, and push

### Send files directly

Zip the folder and send. The recipient needs to run a local server to view charts:

```powershell
python -m http.server 8080
```

---

## What you do NOT need to change

- Sidebar navigation (same 6 pages)
- Colors, fonts, layout (`css/styles.css`)
- Chart types or page structure (`js/app.js`)
- Logo (`WB_white.svg`)

Only edit `js/data.js` (and optionally `index.html` title) unless the report structure itself changes.
