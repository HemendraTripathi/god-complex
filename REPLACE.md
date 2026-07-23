# Swap these later

Anything marked ★ on the site is a placeholder you should replace with real assets.

## Profile links (`src/lib/content.ts` → `LINKS`)

- `github` — currently `https://github.com/hemendratripathi`
- `linkedin` — currently `https://www.linkedin.com/in/hemendratripathi`
- `callin` — currently `https://callin.io`

## Images (`public/images/`)

Drop real PNGs/JPGs here, then set `ready={true}` on the matching `<MockVisual />` in `src/app/page.tsx`:

| File | Used for |
|------|----------|
| `work-callin.png` | Callin.io case study + work row |
| `work-condomail.png` | CondoMail |
| `work-realead.png` | Realead |
| `work-sunria.png` | Sunria / FinTech |
| `portrait.png` | Off the record |

## Quotes

In `src/lib/content.ts`:

- `CASE.quote` — founder / stakeholder quote
- `SIGNALS` — three testimonial cards
- `CASE.metrics` “~0 billing disputes” — tighten with your real number if different
