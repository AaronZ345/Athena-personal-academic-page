export const siteMeta = {
  brand: "Athena Personal Academic Page",
  title: "Athena Personal Academic Page",
  description:
    "Athena Personal Academic Page is a configurable academic website framework for researchers.",
  socialDescription:
    "A configurable personal academic page framework for publications, projects, teaching, talks, service, and research metrics.",
  // Leave empty for automatic GitHub Pages URLs; set once for a custom domain.
  url: "",
  image: "images/athena-og.png",
  repositoryUrl: "https://github.com/AaronZ345/Athena-personal-academic-page"
};

export const sections = [
  { id: "about", title: "About", nav: "About" },
  { id: "metrics", title: "Metrics", nav: "Metrics", note: "Publication record snapshot." },
  { id: "news", title: "News", nav: "News" },
  {
    id: "publications",
    title: "Publications",
    nav: "Publications",
    note: "Use * in author strings for equal contribution."
  },
  { id: "teaching", title: "Teaching", nav: "Teaching" },
  { id: "talks", title: "Talks", nav: "Talks" },
  { id: "education", title: "Education", nav: "Education" },
  { id: "experience", title: "Experience", nav: "Experience" },
  { id: "awards", title: "Awards", nav: "Awards" },
  { id: "service", title: "Academic Service", nav: "Service" },
  { id: "projects", title: "Projects", nav: "Projects" }
];

export const publicationGroups = [
  "Machine Learning",
  "Human-Computer Interaction",
  "Data Systems",
  "Digital Humanities",
  "Other"
];
