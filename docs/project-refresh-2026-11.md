# Website additions: 2026-11-23

## Discovery and scope

Compared the public repositories returned by the GitHub API for `LottaCodr` with
all `source_code_link` and `extra_links` entries in `src/constants/index.js`.
Three recently created or updated website repositories were missing:

| Project | Repository | Created | Latest source commit inspected |
| --- | --- | --- | --- |
| ApexEnergy Resources | [apex-energy](https://github.com/LottaCodr/apex-energy) | 2026-10-15 | `dcabd2306a7334303fc461f1b475034dfd74b81f` |
| Bale Drop | [bale-drop](https://github.com/LottaCodr/bale-drop) | 2026-09-22 | `81afcd68ad586390b81de88a831346120abf701f` |
| Top One Percent | [topsite](https://github.com/LottaCodr/topsite) | 2026-08-04 | `b6d707952abe175a18dd1ad461f8ecfaff584220` |

Descriptions and technology tags come from each repository's README, package
manifests and UI source, not assumed usage numbers or business results. Existing
projects were retained. Backend-only repositories, mobile apps already listed,
profile configuration and the older standalone TOP digital card were not added
as duplicate website cards.

The GitHub public user API reported **117 public repositories** on this date.
Project totals are now derived from the catalogue: **23 projects**, including
**11 with verified public website links**. This is a content-verification count,
not continuous uptime monitoring. The existing nine links retain their earlier
verification record in `docs/ux-research.md`.

## Public website checks

| Project | Candidate address | Result | Portfolio action |
| --- | --- | --- | --- |
| Bale Drop | https://bale-drop.vercel.app | Successfully fetched the public storefront, including the hero, splits, categories and vendor sections. | Add the live link. |
| Top One Percent | https://top-six-smoky.vercel.app | The repository's homepage field still uses the old alias, already recorded as dead in the earlier audit. The current fetch also failed. | Do not restore this alias. |
| Top One Percent | https://topltd.vercel.app | This address appears in the repository description. Successfully fetched the studio homepage, services and scope estimator. | Add this verified live link instead. |
| ApexEnergy Resources | https://apex-energy-phi.vercel.app | The repository lists this homepage, but page retrieval failed. That alone does not establish that the site is down. | Keep the card as a repository preview until a public address can be verified. |
| ApexEnergy Resources | Latest deployment URL from GitHub deployment statuses | GitHub reports a successful deployment, but opening its preview redirects to Vercel login. A successful build is not proof of public access. | Do not publish the protected preview as a live site. |

No live link was guessed. ApexEnergy is not counted as live. Its card and command
palette item open its public source repository. To enable a live button later,
fetch the correct public URL, add it to the project and the verified-link test,
and update the static SEO descriptions and README totals. The hero, statistics,
work heading, filter counts and command palette already derive from project data.

## Thumbnail provenance

These are **real Chromium screenshots of locally rendered repository code**, not
AI-generated website mockups and not captures of the public production servers.
Direct network access from the local browser to the Vercel hosts was restricted.
The separate page-fetching tool could verify the two public sites above.

| Asset in `src/assets/covers/` | Screenshot source | Data and appearance |
| --- | --- | --- |
| `apex-energy.webp` | Local Vite build at the inspected commit | Original homepage, repository images and company copy; original font families supplied locally. |
| `bale-drop.webp` | Local Next.js storefront components at the inspected commit | Isolated screenshot harness using only the public development inventory in `supabase/seed.sql`. No production database, account, payment, credential or customer record was accessed. |
| `top-one-percent.webp` | Local Vite build at the inspected commit | Original dark-theme scope-estimator section, with the site's original font families supplied locally. |

All three covers are **1600 x 1000 (16:10)**, encoded as WebP at quality 84.
Fonts for the Vite sites were supplied from the corresponding Fontsource packages
instead of the blocked Google Fonts host. The page layout, copy and components
were not redesigned for the screenshot. Animations were allowed to settle before
capture; the browser requested reduced motion. Next.js development-only indicator
chrome was hidden for the capture. The three shipped covers total 250,382 bytes
(about 245 KiB).

Bale Drop's production code correctly fails closed without a configured backend.
For the isolated screenshot only, the existing home-page components received rows
parsed from its development seed through the repository's own domain mappers.
The public header and footer were rendered without enabling authentication or
commerce. Its built-in product-art fallbacks are used because the seed has no
seller photos. The portfolio explicitly captions this image **"Local build
screenshot · demo catalogue"**; it is not evidence of real orders or inventory.
No seed SQL was executed against any database service, and none of the capture
harness changes were made to the upstream Bale Drop repository.

Each new card includes a visible local-build caption and descriptive alternative
text. The existing image dimensions, lazy loading, responsive grid and always
visible project links are preserved. Temporary sources, browser packages and raw
PNGs live under ignored `.cache/`; only the three optimized covers ship with the
portfolio. No application dependency was added.

## Verification

The regression suites cover the new entries, distinct repositories, verified
links, ApexEnergy's non-live state, WebP signatures and size budgets, captions and
alt text, derived statistics, static SEO counts, web/landing filters and command
palette destinations. Run:

```bash
npm test
npm run lint
npm run build
```

Completed on 2026-11-23:

- All **52 tests** pass; lint passes with zero warnings.
- Production build succeeds. The existing `three-stdlib` Lottie dependency emits
  its non-blocking `eval` warning; no new application dependency was introduced.
- Chromium checks at **320, 390, 768 and 1600 px** found no horizontal overflow
  or page errors. All three covers decode at 1600 x 1000.
- Web and landing filters each show six projects, the all-work grid shows 23,
  and keyboard search finds the new projects and closes correctly on Escape.
- The update was reviewed using a local portfolio preview. No production
  deployment was performed during validation.
