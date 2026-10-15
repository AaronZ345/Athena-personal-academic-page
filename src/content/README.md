# Content Editing Guide

The files in this folder are the editable data layer for Athena. Most personal sites only need changes under `src/content/` and image files under `public/images/`.

For a first edit, follow the [publication, project, and news examples](../../README.md#add-content). The [GitHub Pages guide](../../README.md#deploy-with-github-pages) covers root sites, repository subpaths, and local previews.

Start with these files:

1. `profile.js`
2. `publications.js`
3. `site.js`
4. The optional activity files you plan to show

Run `npm run build` after editing. JavaScript syntax errors, missing exports, and invalid imports will stop the build.

## `site.js`

### `siteMeta`

`siteMeta` supplies the header, footer, browser title, SEO tags, and social preview metadata.

| Field | Required | What to enter |
| --- | --- | --- |
| `brand` | Yes | Short name shown in the header and footer. |
| `title` | Yes | Browser title and Open Graph/Twitter title. |
| `description` | Yes | Standard HTML description. |
| `socialDescription` | Yes | Open Graph and Twitter description. |
| `url` | Yes | Public canonical site URL, preferably with a trailing slash. |
| `image` | Yes | Absolute public URL for a PNG or JPEG social preview image. |
| `repositoryUrl` | No | Repository linked by “Built with Athena” in the footer. Use an empty string to hide the link. |

Use absolute URLs for `url` and `image`; social crawlers do not reliably resolve local development paths.

Add your social preview image to `public/images/` and set `image` to its published URL, including the repository subpath for a project site. Use PNG or JPEG for sharing previews; the bundled SVG illustrations can still be used within the page.

### `sections`

The `sections` array controls page order and navigation from one place:

```js
{ id: "publications", title: "Publications", nav: "Publications", note: "* denotes equal contribution." }
```

| Field | Required | What it controls |
| --- | --- | --- |
| `id` | Yes | Built-in section renderer. Use one of the IDs below. |
| `title` | Yes | Heading shown on the page. |
| `nav` | No | Navigation label. Set to `false` to keep the section but remove its nav item. |
| `note` | No | Small note beside the section heading. |
| `enabled` | No | Set to `false` to hide the section and its nav item. |

Supported IDs are `about`, `metrics`, `news`, `publications`, `teaching`, `talks`, `education`, `experience`, `awards`, `service`, and `projects`. An unknown ID has no renderer and is skipped.

### `publicationGroups`

`publicationGroups` is the preferred display order for publication categories:

```js
export const publicationGroups = [
  "Machine Learning",
  "Human-Computer Interaction",
  "Other"
];
```

Each publication’s `group` must match one of these strings exactly if you want it in that position. Groups present in `publications.js` but absent from this array are appended alphabetically. A paper with no `group` is counted by the metrics dashboard but is not rendered in the publication section, so treat `group` as required.

Custom group names work. Names not listed in `publicationGroupIconMap` use the default group icon.

## `profile.js`

| Field | Required | What to enter |
| --- | --- | --- |
| `name` | Yes | Primary display name and initials-avatar source. |
| `nativeName` | No | Native-language name shown below `name`. |
| `role` | No | Job or academic role. |
| `organization` | No | Affiliation shown with the role. |
| `organizationUrl` | No | Reserved for custom layouts; the current sidebar does not render this link. |
| `location` | No | Sidebar location. |
| `email` | No | Sidebar/footer email and `mailto:` target. |
| `avatar` | No | Image path such as `images/avatar.webp`. Leave empty for generated initials. |
| `focus` | No | Array of research-area tags in Profile Details. |
| `highlightNames` | No | Exact author-name strings to bold in publication author lists. Defaults to `name`. |
| `about` | Yes | Array of paragraphs; each paragraph may be a string or rich-text array. |
| `links` | Yes | Sidebar profile links. An empty array is valid. |

Profile link objects use these fields:

```js
{ label: "Google Scholar", href: "https://scholar.google.com/...", icon: "Scholar" }
```

- `label`: accessible label and hover title.
- `href`: full destination URL or `mailto:` link.
- `icon`: icon key. Built-in keys include `Email`, `Scholar`, `Google Scholar`, `ORCID`, `DBLP`, `GitHub`, `GitLab`, `HuggingFace`, `LinkedIn`, `Website`, `Lab`, `CV`, `Resume`, `SemanticScholar`, `X`, `Bluesky`, `Mastodon`, and `Twitter`. Unknown keys fall back to the website icon.

### Rich text

`profile.about` and timeline `detail` fields accept plain strings. Use an array when a paragraph needs links or bold text:

```js
[
  "I am a researcher at ",
  { text: "Example University", href: "https://example.com/", strong: true },
  "."
]
```

Each rich-text object supports `text`, optional `href`, and optional `strong: true`.

## `publications.js`

Every object in `publications` represents one paper. Array order is preserved within a group, with one exception: featured cards are rendered before compact rows.

| Field | Required | What it controls |
| --- | --- | --- |
| `title` | Yes | Publication title and React list key. Keep titles unique. |
| `venue` | Yes | Venue label shown on the card or row. |
| `year` | Recommended | Displayed year and “Publications by Year” metric. |
| `type` | Recommended | Displayed type and “Publication Types” metric, for example `Conference`, `Journal`, `Dataset`, or `Report`. |
| `group` | Yes | Publication section and research-area metric. Matching is case-sensitive. |
| `authors` | Yes | Author string. Names matching `profile.highlightNames` are bolded. Use `*` directly in the string for equal contribution. |
| `summary` | No | Description shown only on featured cards. |
| `tags` | No | Tag array. Featured cards show all tags; compact rows show the first four. |
| `image` | No | Figure used only by featured cards. See the image rules below. |
| `featured` | No | `true` for a large card; false or missing for a compact row. |
| `links` | No | Action links such as paper, code, dataset, demo, slides, or BibTeX. |

### Large card or compact row

`featured` is the only card-size switch:

```js
featured: true // large card
```

- `featured: true` renders `FeaturedPaper`.
- False or missing `featured` renders `CompactPaper`.
- `image` does not make a paper featured.
- A featured paper without `image` gets a text placeholder based on `group` or `type`.
- A compact paper never renders `image` or `summary`.

Within each group, all featured cards appear first in array order, followed by compact rows in array order.

Featured example:

```js
{
  title: "Reliable Agents for Scientific Discovery",
  venue: "ICML 2026",
  year: "2026",
  type: "Conference",
  group: "Machine Learning",
  authors: "Researcher Name, Collaborator A",
  summary: "A one-sentence description of the work.",
  tags: ["agents", "evaluation"],
  image: "images/reliable-agents.png",
  featured: true,
  links: [
    { label: "Paper", href: "https://example.com/paper.pdf" },
    { label: "Code", href: "https://github.com/owner/repo", stars: 128 }
  ]
}
```

Compact example:

```js
{
  title: "A Short Paper Title",
  venue: "ACL 2025",
  year: "2025",
  type: "Conference",
  group: "Natural Language Processing",
  authors: "Collaborator A, Researcher Name",
  tags: ["language", "evaluation"],
  links: [{ label: "Paper", href: "https://example.com/paper" }]
}
```

### Metrics derived from publications

The metrics section reads this array directly:

- `Publications`: number of publication objects.
- `Selected`: number with `featured: true`.
- `Open Artifacts`: number with at least one link label matching code, dataset, demo, project, site, or documentation.
- `Research Areas`: distinct `group` values.
- The charts use `year`, `group`, `type`, and an inferred venue family.

Venue family inference checks `type` and `venue` for journal, dataset/benchmark, report/preprint/technical, or workshop terms; everything else is treated as a conference.

## Publication images and WebP

Keep image files under `public/images/` and use paths without a leading slash:

```js
image: "images/reliable-agents.png"
```

The publication frame is `16:9` with `object-fit: contain`. Other aspect ratios work, but they leave more empty space.

### Raster images require a same-name WebP

For `.png`, `.jpg`, and `.jpeg` publication paths, Athena creates a `<picture>` source by replacing the extension with `.webp`. This means the example above requests:

```text
public/images/reliable-agents.webp  # preferred source
public/images/reliable-agents.png   # original fallback
```

Keep both files. A browser that supports WebP may select the WebP URL first and show a broken image if that file is missing, even when the PNG exists.

Generate WebP with `cwebp`:

```bash
# macOS, one-time install
brew install webp

cwebp -q 90 public/images/reliable-agents.png \
  -o public/images/reliable-agents.webp
```

ImageMagick is another option:

```bash
magick public/images/reliable-agents.png \
  -quality 90 public/images/reliable-agents.webp
```

If `image` points directly to `.webp` or `.svg`, no alternate source is generated. A direct WebP path needs only that WebP file; an SVG needs only the SVG.

Check the pair before pushing:

```bash
file public/images/reliable-agents.png public/images/reliable-agents.webp
npm run build
test -f dist/images/reliable-agents.webp
```

## Link objects and GitHub stars

Publication and project `links` use the same fields:

| Field | Required | What it controls |
| --- | --- | --- |
| `label` | Yes | Visible text and inferred icon. |
| `href` | Yes | Full destination URL. |
| `stars` | No | Immediate fallback star count for a GitHub repository. |
| `showGithubStats` | No | `false` hides the star badge; `true` enables it for a nonstandard GitHub link label. |
| `stats` | No | Alias for `showGithubStats`. |

Repository-style labels such as `Code`, `GitHub`, `Repo`, and `Repository` show stars by default. Athena refreshes the count from the GitHub API and uses `stars` when the API is unavailable. Fork counts are not displayed.

Action icons are inferred from `label` and `href`. Common labels include `Paper`, `Report`, `Preprint`, `Code`, `GitHub`, `Dataset`, `Benchmark`, `Demo`, `Site`, `Project`, `Video`, `Slides`, `Poster`, `DOI`, `BibTeX`, `Documentation`, and `Download`.

## `news.js`

| Field | Required | What it controls |
| --- | --- | --- |
| `date` | Yes | Date label, usually `YYYY.MM`. |
| `icon` | Yes | Semantic icon key. |
| `text` | Yes | Announcement text. |
| `href` | Yes | Destination opened by the news row. |

The main News section shows every item. Profile Details shows the first four, so keep this array newest-first.

Built-in icon keys are `release`, `accepted`, `dataset`, `code`, `talk`, `teaching`, `award`, `career`, `degree`, `visit`, and `service`. Unknown keys fall back to the accepted-paper icon.

## `projects.js`

| Field | Required | What it controls |
| --- | --- | --- |
| `title` | Yes | Project card title and list key. Keep titles unique. |
| `status` | No | Status badge, for example `Active`, `Prototype`, `Maintained`, `Archived`, or `Released`. |
| `summary` | Yes | Project description. |
| `tags` | No | Project tag array. |
| `links` | No | Shared link objects described above. |

Unknown status values still render, using the default icon.

Projects render in array order on a horizontal rail. Three cards fit in the desktop viewport; additional cards remain available by horizontal scrolling. Mobile uses wider, touch-scrollable cards.

## `teaching.js`, `talks.js`, `education.js`, and `experience.js`

These four files use the same timeline object:

| Field | Required | What it controls |
| --- | --- | --- |
| `period` | Yes | Right-side date or term. |
| `title` | Yes | Main timeline title. |
| `place` | Yes | Institution, venue, course, or organization. |
| `href` | No | Makes `place` a link. |
| `detail` | No | Plain string or rich-text detail below the title. |
| `type` | No | Reserved metadata; the current timeline layout does not display it. |

Entries render in array order. Put the newest item first if you want reverse chronological display.

## `awards.js`

Awards are plain strings:

```js
export const awards = [
  "Best Paper Award, 2026",
  "Outstanding Dissertation Award, 2025"
];
```

A final `, YYYY` is split into the right-side year column. Other text stays on the left as written.

## `services.js`

Each service group has a category and an array of items:

```js
{
  category: "Conference Reviewer",
  items: ["NeurIPS 2025, 2026", "ICML 2026"]
}
```

| Field | Required | What it controls |
| --- | --- | --- |
| `category` | Yes | Group heading and service icon selection. |
| `items` | Yes | Service chips shown under the heading. |

Trailing years are split from the service name and displayed as `2025 / 2026`. Built-in category icons include `Conference Reviewer`, `Journal Reviewer`, `Program Committee`, `Area Chair`, `Organizer`, and `Mentor`; other categories use the default icon.

## `index.js`

`index.js` re-exports the content modules for `App.jsx`. You normally do not edit it. Update it only when adding a new content file and a matching renderer.

## Before pushing

```bash
npm run build
npm run preview
```

Then check the profile, section order, publication grouping, featured/compact split, publication images, links, GitHub star badges, light and dark themes, and the mobile layout. For every PNG/JPEG publication figure, verify that the same-name WebP exists in both `public/images/` and the generated `dist/images/` directory.
