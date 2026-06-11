# Content Editing Guide

All profile data lives in this folder. In normal use, edit only `src/content/*` plus image files under `public/images/`; the React components and styles should not need changes.

## Recommended Fill Order

1. `profile.js`: identity, affiliation, contact links, research focus, and about text.
2. `publications.js`: papers and artifact links. The metrics section is generated from this file.
3. `site.js`: page metadata, publication group order, and section order.
4. Optional activity files: `projects.js`, `teaching.js`, `talks.js`, `education.js`, `experience.js`, `awards.js`, `services.js`, `news.js`.

Edit these files for the website content:

- `site.js`: brand, title, SEO text, repository link, section order, section labels, section visibility, and publication group order.
- `profile.js`: name, role, affiliation, location, email, links, research focus, and about text.
- `news.js`: dated announcements with icon keys.
- `publications.js`: publication entries, selected publication images, paper/demo/code/dataset/slides/video/DOI/BibTeX links, tags, type, group, and year.
- `projects.js`: project cards with status, summary, tags, and links.
- `teaching.js`: course timeline.
- `talks.js`: invited talks, workshops, and seminars.
- `education.js`: education timeline.
- `experience.js`: academic, industry, and research experience timeline.
- `awards.js`: honors list.
- `services.js`: reviewer, committee, organizer, and mentor service lists.

## Images

Images stay in `public/images/`. Leave `profile.avatar` empty to use the generated initials avatar.

Use these conventions so assets stay easy to find:

- `public/images/avatar.webp` for the profile photo.
- `public/images/<paper-slug>.png` or `.webp` for publication figures.
- `public/images/<project-slug>.png` or `.webp` for project images if you add project image support later.
- `public/images/athena-og.svg` or another social preview image referenced by `siteMeta.image`.
- `public/images/athena-mark.svg` or generated favicon files referenced by `index.html`.

For favicon generation, [redketchup favicon-generator](https://redketchup.io/favicon-generator) is a practical option. Generate the favicon package there, then copy the needed outputs into `public/images/`.

## Section Control

`site.js` has one `sections` array. It controls section order, navigation labels, titles, small notes, and visibility in one place:

```js
{ id: "projects", title: "Projects", nav: "Projects" }
```

Set `enabled: false` to hide a built-in section:

```js
{ id: "talks", title: "Talks", nav: "Talks", enabled: false }
```

Use `nav: false` to keep a section on the page but remove it from the top navigation.

## Rich Text

Most text fields can be plain strings. For text with links or bold spans, use an array:

```js
[
  "I am ",
  { text: "Researcher Name", strong: true },
  " at ",
  { text: "Example University", href: "https://example.com/" },
  "."
]
```

## Link and Icon Conventions

Publication/project link icons are inferred from labels such as `Paper`, `Code`, `Dataset`, `Demo`, `Slides`, `Video`, `DOI`, `BibTeX`, `Poster`, `Documentation`, and `Download`.

Profile link icon keys include `Email`, `Scholar`, `ORCID`, `DBLP`, `GitHub`, `LinkedIn`, `Website`, `Lab`, `CV`, and `HuggingFace`.

News icon keys include `release`, `accepted`, `dataset`, `code`, `talk`, `teaching`, `award`, `career`, `degree`, `visit`, and `service`.
