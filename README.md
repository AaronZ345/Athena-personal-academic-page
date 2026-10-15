<div align="center">
  <img src="public/images/athena-mark.svg" width="88" alt="Athena logo" />
  <h1>Athena Personal Academic Page</h1>
  <p>A clean, publication-first academic homepage for researchers.</p>
  <p>
    <a href="https://aaronz345.github.io/Athena-personal-academic-page/"><strong>View the live demo ↗</strong></a>
    &nbsp;·&nbsp;
    <a href="https://github.com/new?template_name=Athena-personal-academic-page&template_owner=AaronZ345"><strong>Use this template ↗</strong></a>
    &nbsp;·&nbsp;
    <a href="src/content/README.md">Content guide</a>
    &nbsp;·&nbsp;
    <a href="#deploy-with-github-pages">Deployment</a>
  </p>
  <p>
    <a href="https://github.com/AaronZ345/Athena-personal-academic-page/actions/workflows/pages.yml"><img src="https://img.shields.io/github/actions/workflow/status/AaronZ345/Athena-personal-academic-page/pages.yml?branch=main&label=deploy&style=flat-square" alt="GitHub Pages deployment" /></a>
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19-149ECA?style=flat-square&logo=react&logoColor=white" alt="React 19" /></a>
    <a href="https://vite.dev/"><img src="https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite 7" /></a>
    <a href="LICENSE"><img src="https://img.shields.io/github/license/AaronZ345/Athena-personal-academic-page?style=flat-square" alt="MIT license" /></a>
  </p>
</div>

<a href="https://aaronz345.github.io/Athena-personal-academic-page/">
  <img src="public/images/athena-og.svg" width="100%" alt="Preview of Athena Personal Academic Page" />
</a>

Athena is a React and Vite template for maintaining an academic website without mixing content into page components. Profiles, publications, projects, teaching, talks, awards, service, and site metadata all live in small files under `src/content/`.

## What is included

| Area | What Athena provides |
| --- | --- |
| Research profile | Compact profile sidebar, research interests, contact links, CV, Scholar, ORCID, DBLP, GitHub, and more |
| Publications | Grouped papers, featured cards, compact rows, figures, equal-contribution notes, artifact links, and automatic metrics |
| Academic activity | News, projects, teaching, talks, education, experience, awards, and service sections |
| Project links | Repository-aware action links with cached GitHub star counts and static fallbacks |
| Presentation | Responsive desktop and mobile layouts, light and dark themes, sticky navigation, and accessible image fallbacks |
| Publishing | SEO and social metadata plus a ready-to-run GitHub Pages workflow |

Section order, navigation labels, notes, and visibility are controlled from one array in `src/content/site.js`. There is no second navigation config to keep in sync.

## Start in three steps

### 1. Create your site

Click [Use this template](https://github.com/new?template_name=Athena-personal-academic-page&template_owner=AaronZ345) to create a clean repository without Athena's commit history. For a root GitHub Pages site, name it `USERNAME.github.io`.

```bash
git clone https://github.com/USERNAME/USERNAME.github.io.git
cd USERNAME.github.io
```

Keeping the repository name is also fine; GitHub Pages will publish it at `https://USERNAME.github.io/REPOSITORY/`.

### 2. Run it locally

Install [Node.js 22 LTS](https://nodejs.org/) to match the deployment workflow, then run:

```bash
npm ci
npm run dev
```

Open `http://127.0.0.1:5173/`.

### 3. Replace the sample content

Most users only need to edit `src/content/` and add images to `public/images/`.

| Start here | Controls |
| --- | --- |
| `src/content/profile.js` | Name, role, affiliation, avatar, contact links, research focus, and bio |
| `src/content/publications.js` | Papers, groups, venues, links, tags, figures, and featured cards |
| `src/content/site.js` | Site title, metadata, repository link, section order, labels, and visibility |
| `src/content/news.js` | News timeline |
| `src/content/projects.js` | Research projects and repository links |
| `src/content/teaching.js`, `talks.js` | Teaching and talks |
| `src/content/education.js`, `experience.js` | Education and positions |
| `src/content/awards.js`, `services.js` | Honors and academic service |

The [content reference](src/content/README.md) documents every field, including publication grouping, rich text fragments, card selection, image paths, and project layout.

For a first publish, start with `profile.js`, `publications.js`, and `site.js`. The remaining sections can stay as examples or be disabled from the `sections` array until you need them.

## Add content

Add an object to the existing exported array in the relevant file. Each example below shows one new entry followed by a place for your existing entries. Keep one `export const ...` per file and a comma between objects. Replace the sample text and URLs with your own.

These updates only need content files. The page components in `src/App.jsx` read the arrays and render them in the existing layout.

### Add a publication

In [`src/content/publications.js`](src/content/publications.js):

```js
export const publications = [
  {
    title: "Evaluating Research Assistants",
    venue: "Preprint",
    year: "2026",
    type: "Report",
    group: "Machine Learning",
    authors: "Researcher Name, Collaborator A",
    links: [
      { label: "Paper", href: "https://example.com/research-assistants.pdf" },
      { label: "Code", href: "https://github.com/USERNAME/research-assistants" }
    ]
  },
  // Keep your other publications here.
];
```

This creates a compact row. Use an existing `group` name, or add your own to `publicationGroups` in `src/content/site.js` to choose its position. Add `featured: true` and a `summary` for a large card; an optional `image` can point to a file such as `"images/my-paper.svg"` under `public/`. See [Publications](#publications) for ordering and [Images](#images) for supported image paths.

### Add a project

In [`src/content/projects.js`](src/content/projects.js):

```js
export const projects = [
  {
    title: "Research Assistant Toolkit",
    status: "Active",
    summary: "Scripts and evaluation data for comparing research assistants.",
    tags: ["Evaluation", "Open Source"],
    links: [
      { label: "Code", href: "https://github.com/USERNAME/research-assistants" },
      { label: "Demo", href: "https://example.com/research-assistants" }
    ]
  },
  // Keep your other projects here.
];
```

Projects appear in array order, so put the new entry first to make it the first card.

### Add a news item

In [`src/content/news.js`](src/content/news.js):

```js
export const news = [
  {
    date: "2026.10",
    icon: "release",
    text: "The Research Assistant Toolkit is now available.",
    href: "https://example.com/research-assistants"
  },
  // Keep your older news here.
];
```

Keep news newest first; Athena displays the array as written and shows its first four entries in Profile Details. Use `YYYY.MM` for dates. Other icon names include `accepted`, `dataset`, `talk`, `award`, and `career`.

Save the file and check the running local page. If a section is hidden, enable its entry in the `sections` array in `src/content/site.js`. Run `npm run build` before publishing to catch syntax errors.

## Publications

Each paper uses a `group` string. Preferred group order comes from `publicationGroups` in `src/content/site.js`; groups that are not listed there still appear afterward.

Card layout is explicit:

- `featured: true` renders a large publication card.
- Missing or false `featured` renders a compact row.
- A featured paper may omit `image`; Athena then shows a generated text placeholder.
- Adding an image does not automatically make a paper featured.

Featured papers appear before compact papers within a group. Array order is preserved inside both sets.

## Sections and navigation

The `sections` array in `src/content/site.js` controls page order and the top navigation:

```js
{ id: "talks", title: "Talks", nav: "Talks", enabled: false }
```

- Set `enabled: false` to hide a section.
- Set `nav: false` to keep a section on the page but remove it from the top navigation.
- Reorder entries to reorder the page.

## Images

Store site images in `public/images/` and use paths without a leading slash:

```js
image: "images/my-paper.png"
```

That path format works for both root sites and project-page deployments. Publication figures use a `16:9` frame with `object-fit: contain`.

For `.png`, `.jpg`, and `.jpeg` publication figures, Athena requests a same-name WebP first and retains the original as a fallback:

```text
public/images/my-paper.png
public/images/my-paper.webp
```

Images already stored as `.webp` or `.svg` are used directly. See the [image guide](src/content/README.md#publication-images-and-webp) for conversion commands and favicon setup.

## Links and GitHub stats

Athena recognizes common link labels such as `Paper`, `Code`, `Dataset`, `Demo`, `Slides`, `Video`, `DOI`, `BibTeX`, `Poster`, `Documentation`, `Project`, and `Download` and assigns matching icons.

Repository links can include a static star fallback:

```js
{ label: "Code", href: "https://github.com/owner/repo", stars: 128 }
```

The fallback appears immediately. Athena refreshes it from the GitHub API when the persistent browser cache is missing or stale and keeps the last successful value if anonymous API requests are rate-limited. Stats appear on repository-style links by default; use `showGithubStats: true` to override that behavior.

## Deploy with GitHub Pages

### Choose your site address

GitHub Pages supports a site at the account root or under a repository name. Replace `USERNAME` with your GitHub username; `academic-site` below is an example repository name.

| Deployment | Repository name | Published URL | Vite base path |
| --- | --- | --- | --- |
| User or organization site | `USERNAME.github.io` | `https://USERNAME.github.io/` | `/` |
| Project site | `academic-site` | `https://USERNAME.github.io/academic-site/` | `/academic-site/` |

The base path is the prefix used for built assets such as JavaScript, CSS, and icons. A project site built with `/` requests files from the account root, where they may return 404.

[`vite.config.js`](vite.config.js) reads `GITHUB_REPOSITORY`, which GitHub Actions sets to `OWNER/REPOSITORY`. It chooses `/` when the repository is named after its owner as `OWNER.github.io`, and `/REPOSITORY/` otherwise. Both standard Pages setups work with the included workflow without editing Vite configuration.

### Set your public URLs

Update these fields inside the existing `siteMeta` object in [`src/content/site.js`](src/content/site.js), keeping its other fields. For a user site:

```js
url: "https://USERNAME.github.io/",
image: "https://USERNAME.github.io/images/athena-og.svg",
repositoryUrl: "https://github.com/USERNAME/USERNAME.github.io"
```

For a project site named `academic-site`:

```js
url: "https://USERNAME.github.io/academic-site/",
image: "https://USERNAME.github.io/academic-site/images/athena-og.svg",
repositoryUrl: "https://github.com/USERNAME/academic-site"
```

`url` and `image` are absolute URLs for search engines and social previews. Changing them does not change Vite's base path. When you replace the preview image, update `image` to its public URL too. Keep local content image paths relative, such as `"images/my-paper.svg"`, so they work under either base path.

### Publish

1. Open the repository's **Settings → Pages** page.
2. Set **Build and deployment → Source** to **GitHub Actions**.
3. Commit your content and metadata changes, then push or merge them into `main`.
4. Open **Actions → Deploy Pages** and wait for both the build and deploy jobs to succeed. Open the published URL from **Settings → Pages**.

The included [`pages.yml`](.github/workflows/pages.yml) workflow installs dependencies, builds `dist/`, and deploys it. If you use a different default branch, update `on.push.branches` in that workflow. You can also start a deployment from **Actions → Deploy Pages → Run workflow**.

### Preview the deployment path locally

Local development defaults to `/` when `GITHUB_REPOSITORY` is unset. To check a root site, run `npm run build` followed by `npm run preview` and open `http://127.0.0.1:4173/`.

To check a project site before publishing, pass the same base path to both commands:

```bash
npm run build -- --base=/academic-site/
npm run preview -- --base=/academic-site/
```

Open `http://127.0.0.1:4173/academic-site/`. Replace `academic-site` with your repository name, including its capitalization, and keep both slashes. Check that images, styles, and navigation load at that URL. A preview at `/` alone will not catch incorrect project paths.

### Custom domains

For a custom domain served from `/`, configure the domain in **Settings → Pages** and follow [GitHub's DNS setup instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site). Set `siteMeta.url` and `siteMeta.image` to that domain, and override the build step in `.github/workflows/pages.yml` so a project repository does not keep its repository prefix:

```yaml
- name: Build
  run: npm run build -- --base=/
```

## Project map

```text
src/content/          Editable profile and academic content
src/App.jsx           Page rendering and section composition
src/icons.js          Link and section icon mappings
src/styles.css        Design system and responsive layout
src/assets/fonts/     Bundled icon fonts
public/images/        Avatars, paper figures, favicons, and social preview assets
.github/workflows/    GitHub Pages deployment
```

## Check before publishing

```bash
npm run build
npm run preview
```

Check the profile details, publication links and figures, section navigation, both color themes, and the mobile layout. Also confirm that every PNG or JPEG publication figure has its same-name WebP file.

## License

Athena Personal Academic Page is available under the [MIT License](LICENSE).
