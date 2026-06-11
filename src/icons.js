import abacusIcon from "@iconify-icons/twemoji/abacus";
import artistPaletteIcon from "@iconify-icons/twemoji/artist-palette";
import barChartIcon from "@iconify-icons/twemoji/bar-chart";
import booksIcon from "@iconify-icons/twemoji/books";
import bookmarkTabsIcon from "@iconify-icons/twemoji/bookmark-tabs";
import briefcaseIcon from "@iconify-icons/twemoji/briefcase";
import calendarIcon from "@iconify-icons/twemoji/calendar";
import cardFileBoxIcon from "@iconify-icons/twemoji/card-file-box";
import chartIncreasingIcon from "@iconify-icons/twemoji/chart-increasing";
import classicalBuildingIcon from "@iconify-icons/twemoji/classical-building";
import clipboardIcon from "@iconify-icons/twemoji/clipboard";
import globeIcon from "@iconify-icons/twemoji/globe-with-meridians";
import graduationCapIcon from "@iconify-icons/twemoji/graduation-cap";
import identificationCardIcon from "@iconify-icons/twemoji/identification-card";
import ledgerIcon from "@iconify-icons/twemoji/ledger";
import lightBulbIcon from "@iconify-icons/twemoji/light-bulb";
import memoIcon from "@iconify-icons/twemoji/memo";
import microscopeIcon from "@iconify-icons/twemoji/microscope";
import newspaperIcon from "@iconify-icons/twemoji/newspaper";
import openBookIcon from "@iconify-icons/twemoji/open-book";
import rocketIcon from "@iconify-icons/twemoji/rocket";
import schoolIcon from "@iconify-icons/twemoji/school";
import speechBalloonIcon from "@iconify-icons/twemoji/speech-balloon";
import telescopeIcon from "@iconify-icons/twemoji/telescope";
import trophyIcon from "@iconify-icons/twemoji/trophy";

export const profileIconMap = {
  Email: "fa-solid fa-envelope",
  Scholar: "ai ai-google-scholar",
  "Google Scholar": "ai ai-google-scholar",
  GitHub: "fa-brands fa-github",
  GitLab: "fa-solid fa-code",
  HuggingFace: "fa-brands fa-hugging-face",
  LinkedIn: "fa-brands fa-linkedin-in",
  ORCID: "ai ai-orcid",
  DBLP: "ai ai-dblp",
  Website: "fa-solid fa-globe",
  Lab: "fa-solid fa-globe",
  CV: "fa-solid fa-file-pdf",
  Resume: "fa-solid fa-file-pdf",
  X: "fa-solid fa-link",
  Bluesky: "fa-solid fa-link",
  Mastodon: "fa-solid fa-link",
  SemanticScholar: "fa-solid fa-book",
  Twitter: "fa-solid fa-link"
};

export const fallbackTitleIcon = openBookIcon;
export const venueIcon = bookmarkTabsIcon;

export const sectionIconMap = {
  About: identificationCardIcon,
  "About Me": identificationCardIcon,
  Metrics: barChartIcon,
  News: newspaperIcon,
  Publications: booksIcon,
  Projects: lightBulbIcon,
  Teaching: schoolIcon,
  Talks: speechBalloonIcon,
  Education: graduationCapIcon,
  Experience: briefcaseIcon,
  Awards: trophyIcon,
  Honors: trophyIcon,
  "Academic Service": clipboardIcon,
  Service: clipboardIcon
};

export const publicationGroupIconMap = {
  "Machine Learning": microscopeIcon,
  "Human-Computer Interaction": artistPaletteIcon,
  "Data Systems": abacusIcon,
  "Digital Humanities": openBookIcon,
  "Natural Language Processing": speechBalloonIcon,
  "Computer Vision": telescopeIcon,
  Robotics: rocketIcon,
  Systems: ledgerIcon,
  Security: clipboardIcon,
  Theory: chartIncreasingIcon,
  Other: cardFileBoxIcon,
  Others: cardFileBoxIcon
};

export const serviceIconMap = {
  "Conference Reviewer": classicalBuildingIcon,
  "Journal Reviewer": ledgerIcon,
  "Program Committee": clipboardIcon,
  "Area Chair": clipboardIcon,
  Organizer: calendarIcon,
  Mentor: graduationCapIcon
};

export const newsIconMap = {
  release: rocketIcon,
  accepted: bookmarkTabsIcon,
  dataset: cardFileBoxIcon,
  code: memoIcon,
  talk: speechBalloonIcon,
  teaching: schoolIcon,
  award: trophyIcon,
  career: briefcaseIcon,
  degree: graduationCapIcon,
  visit: globeIcon,
  service: clipboardIcon
};

export const statusIconMap = {
  Active: rocketIcon,
  Prototype: lightBulbIcon,
  Maintained: clipboardIcon,
  Archived: cardFileBoxIcon,
  Released: bookmarkTabsIcon
};

export function getActionIcon(link) {
  const label = normalize(link.label);
  const href = normalize(link.href);

  if (href.includes("github.com")) return "fa-brands fa-github";
  if (href.includes("huggingface.co")) return "fa-brands fa-hugging-face";
  if (href.includes("doi.org") || label.includes("doi")) return "fa-solid fa-link";
  if (label.includes("paper") || label.includes("pdf")) return "fa-solid fa-file-lines";
  if (label.includes("report") || label.includes("preprint")) return "fa-solid fa-file-lines";
  if (label.includes("code") || label.includes("github") || label.includes("repo")) return "fa-solid fa-code";
  if (label.includes("dataset") || label.includes("data") || label.includes("benchmark")) return "fa-solid fa-database";
  if (label.includes("demo") || label.includes("site") || label.includes("project")) return "fa-solid fa-play";
  if (label.includes("video") || label.includes("recording")) return "fa-solid fa-video";
  if (label.includes("slide") || label.includes("talk")) return "fa-solid fa-chalkboard";
  if (label.includes("poster")) return "fa-solid fa-images";
  if (label.includes("bib") || label.includes("cite")) return "fa-solid fa-quote-right";
  if (label.includes("doc")) return "fa-solid fa-book";
  if (label.includes("download")) return "fa-solid fa-download";
  return "fa-solid fa-arrow-up-right-from-square";
}

function normalize(value = "") {
  return value.toString().toLowerCase();
}
