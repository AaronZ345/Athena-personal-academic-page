export const profile = {
  name: "Researcher Name",
  nativeName: "",
  role: "Assistant Professor",
  organization: "Example University",
  organizationUrl: "https://example.com/",
  location: "City, Country",
  email: "researcher@example.edu",
  avatar: "",
  focus: ["Machine Learning", "Human-Computer Interaction", "Data Systems", "Digital Scholarship"],
  highlightNames: ["Researcher Name"],
  about: [
    [
      "I am ",
      { text: "Researcher Name", strong: true },
      ", an Assistant Professor at ",
      { text: "Example University", href: "https://example.com/" },
      ". My group builds reliable, human-centered computational systems."
    ],
    "My research spans learning algorithms, interactive tools, data infrastructure, and responsible deployment in real-world settings.",
    [
      "I am always interested in research collaboration, student mentoring, and open-source academic infrastructure. Contact: ",
      { text: "researcher@example.edu", href: "mailto:researcher@example.edu" },
      "."
    ]
  ],
  links: [
    { label: "Email", href: "mailto:researcher@example.edu", icon: "Email" },
    { label: "Google Scholar", href: "https://scholar.google.com/", icon: "Scholar" },
    { label: "ORCID", href: "https://orcid.org/", icon: "ORCID" },
    { label: "DBLP", href: "https://dblp.org/", icon: "DBLP" },
    { label: "GitHub", href: "https://github.com/", icon: "GitHub" },
    { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "LinkedIn" }
  ]
};
