import { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import {
  awards,
  education,
  experience,
  news,
  profile,
  projects,
  publicationGroups,
  publications,
  services,
  sections,
  siteMeta,
  talks,
  teaching
} from "./content/index.js";
import {
  fallbackTitleIcon,
  getActionIcon,
  newsIconMap,
  profileIconMap,
  publicationGroupIconMap,
  sectionIconMap,
  serviceIconMap,
  statusIconMap,
  venueIcon
} from "./icons.js";

const chartColors = ["#245a96", "#5c9ec6", "#7a8f36", "#b66f36", "#7b6fb3", "#3f8b78", "#b75d69"];
const githubStatsCacheTtl = 1000 * 60 * 5;

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);
  const githubStatsSources = useMemo(() => [publications, projects], []);
  const githubStats = useGithubRepoStats(githubStatsSources);
  const stats = useMemo(() => getPublicationStats(publications), []);
  const groups = useMemo(() => getPublicationGroups(publications, publicationGroups), []);
  const visibleSections = useMemo(() => sections.filter((section) => section.enabled !== false), []);
  const navItems = useMemo(
    () => visibleSections
      .filter((section) => section.nav !== false)
      .map((section) => ({ href: `#${section.id}`, label: section.nav ?? section.title })),
    [visibleSections]
  );

  const sectionContent = {
    about: (
      <div className="intro-copy">
        {profile.about.map((paragraph, index) => (
          <p key={index}>{renderRichText(paragraph)}</p>
        ))}
      </div>
    ),
    metrics: <MetricsDashboard stats={stats} />,
    news: (
      <div className="news-list">
        {news.map((item) => (
          <a className="news-row" href={item.href} key={`${item.date}-${item.text}`} target="_blank" rel="noreferrer">
            <time>{item.date}</time>
            <span className="news-icon" aria-hidden="true">
              <SemanticIcon icon={newsIconMap[item.icon] ?? newsIconMap.accepted} />
            </span>
            <span className="news-text">{item.text}</span>
            <i className="news-external fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
          </a>
        ))}
      </div>
    ),
    publications: groups.map((group) => (
      <PublicationGroup
        key={group}
        title={group}
        papers={publications.filter((paper) => paper.group === group)}
        githubStats={githubStats}
      />
    )),
    projects: <ProjectList items={projects} githubStats={githubStats} />,
    teaching: <Timeline items={teaching} />,
    talks: <Timeline items={talks} />,
    education: <Timeline items={education} />,
    experience: <Timeline items={experience} />,
    awards: <HonorsList items={awards} />,
    service: <ServiceList items={services} />
  };

  useEffect(() => {
    document.title = siteMeta.title;
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event) => {
      setTheme(event.matches ? "dark" : "light");
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#about" aria-label={`${siteMeta.brand} home`}>
          {siteMeta.brand}
        </a>
        <nav className={`primary-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="theme-button"
            type="button"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={theme === "dark"}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
            onClick={() => setTheme((currentTheme) => currentTheme === "dark" ? "light" : "dark")}
          >
            <i className={theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon"} aria-hidden="true" />
          </button>
          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <i className={menuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"} aria-hidden="true" />
          </button>
        </div>
      </header>

      <div className="page-shell">
        <aside className="profile-sidebar" aria-label="Profile">
          <SidebarProfile />
        </aside>

        <main className="content-main">
          {visibleSections.map((section) => {
            const content = sectionContent[section.id];
            if (!content) return null;

            return (
              <section className={`section${section.id === "about" ? " about-section" : ""}`} id={section.id} key={section.id}>
                <SectionTitle title={section.title} note={section.note} />
                {content}
              </section>
            );
          })}
        </main>
      </div>

      <footer className="site-footer">
        <div className="section footer-inner">
          <span>{siteMeta.brand}</span>
          <div className="footer-links">
            {siteMeta.repositoryUrl ? (
              <a href={siteMeta.repositoryUrl} target="_blank" rel="noreferrer">
                <i className="fa-brands fa-github" aria-hidden="true" />
                <span>Built with Athena</span>
              </a>
            ) : null}
            {profile.email ? <a href={`mailto:${profile.email}`}>{profile.email}</a> : null}
          </div>
        </div>
      </footer>
    </>
  );
}

function SidebarProfile() {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const organizationText = [profile.role, profile.organization ? `at ${profile.organization}` : ""].filter(Boolean).join(" ");

  return (
    <div className="sidebar-card">
      <div className="sidebar-avatar-frame">
        {profile.avatar ? (
          <img
            className="sidebar-avatar"
            src={profile.avatar}
            width="192"
            height="192"
            decoding="async"
            fetchPriority="high"
            alt={profile.name}
          />
        ) : (
          <div className="sidebar-avatar sidebar-avatar-placeholder" aria-hidden="true">
            {getInitials(profile.name)}
          </div>
        )}
      </div>
      <div className="sidebar-identity">
        <h1>{profile.name}</h1>
        {profile.nativeName ? <p>{profile.nativeName}</p> : null}
        {organizationText ? <span>{organizationText}</span> : null}
      </div>
      <div className="sidebar-meta">
        {profile.location ? (
          <span>
            <i className="fa-solid fa-location-dot" aria-hidden="true" />
            {profile.location}
          </span>
        ) : null}
        {profile.email ? (
          <a href={`mailto:${profile.email}`}>
            <i className="fa-solid fa-envelope" aria-hidden="true" />
            {profile.email}
          </a>
        ) : null}
      </div>
      <ProfileLinks />

      <button
        className="sidebar-toggle"
        type="button"
        aria-controls="profile-details"
        aria-expanded={detailsOpen}
        onClick={() => setDetailsOpen((value) => !value)}
      >
        <span>Profile Details</span>
        <i className={`fa-solid fa-chevron-${detailsOpen ? "up" : "down"}`} aria-hidden="true" />
      </button>

      <div id="profile-details" className={`sidebar-collapsible${detailsOpen ? " is-open" : ""}`}>
        {profile.focus?.length ? (
          <div className="sidebar-block">
            <h2>Research Focus</h2>
            <TagList items={profile.focus} className="focus-row" />
          </div>
        ) : null}

        {news.length ? (
          <div className="sidebar-block">
            <h2>Recent News</h2>
            <div className="sidebar-news">
              {news.slice(0, 4).map((item) => (
                <a href={item.href} key={`${item.date}-${item.text}`} target="_blank" rel="noreferrer">
                  <time>{item.date}</time>
                  <span className="sidebar-news-text">
                    <span className="sidebar-news-icon" aria-hidden="true">
                      <SemanticIcon icon={newsIconMap[item.icon] ?? newsIconMap.accepted} />
                    </span>
                    <span>{item.text}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function MetricsDashboard({ stats }) {
  return (
    <div className="metrics-dashboard">
      <div className="metric-card-grid">
        <MetricCard label="Publications" value={stats.total} />
        <MetricCard label="Selected" value={stats.featured} />
        <MetricCard label="Open Artifacts" value={stats.openArtifacts} />
        <MetricCard label="Research Areas" value={stats.byGroup.length} />
      </div>
      <div className="chart-grid">
        <HorizontalBarChart title="Publications by Year" data={stats.byYear} />
        <DonutChart title="Research Areas" data={stats.byGroup} />
        <HorizontalBarChart title="Publication Types" data={stats.byType} />
        <HorizontalBarChart title="Venue Families" data={stats.byVenueFamily} />
      </div>
    </div>
  );
}

function MetricCard({ label, value }) {
  return (
    <div className="metric-card">
      <strong>{formatNumber(value)}</strong>
      <span>{label}</span>
    </div>
  );
}

function HorizontalBarChart({ title, data }) {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <article className="chart-card">
      <h3>{title}</h3>
      <div className="bar-chart">
        {data.map((item, index) => {
          const percent = Math.max((item.value / max) * 100, 4);
          return (
            <div className="bar-row" key={item.label}>
              <span className="bar-label">{item.label}</span>
              <span
                className="bar-track"
                style={{ "--bar-value": `${percent}%`, "--chart-color": chartColors[index % chartColors.length] }}
              >
                <span className="bar-fill" />
              </span>
              <span className="bar-value">{item.value}</span>
            </div>
          );
        })}
      </div>
    </article>
  );
}

function DonutChart({ title, data }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let start = 0;
  const gradient = total
    ? `conic-gradient(${data
        .map((item, index) => {
          const end = start + (item.value / total) * 360;
          const segment = `${chartColors[index % chartColors.length]} ${start}deg ${end}deg`;
          start = end;
          return segment;
        })
        .join(", ")})`
    : "var(--surface-strong)";

  return (
    <article className="chart-card chart-card-donut">
      <h3>{title}</h3>
      <div className="donut-layout">
        <div className="donut-chart" style={{ "--donut-gradient": gradient }}>
          <span>{total}</span>
        </div>
        <div className="chart-legend">
          {data.map((item, index) => (
            <span key={item.label}>
              <i style={{ "--chart-color": chartColors[index % chartColors.length] }} aria-hidden="true" />
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function PublicationGroup({ title, papers, githubStats }) {
  const highlighted = papers.filter((paper) => paper.featured);
  const compact = papers.filter((paper) => !paper.featured);

  return (
    <section className="publication-group" aria-labelledby={`group-${slugify(title)}`}>
      <h3 id={`group-${slugify(title)}`}>
        <TitleIcon icon={publicationGroupIconMap[title] ?? fallbackTitleIcon} compact />
        <span>{title}</span>
      </h3>
      {highlighted.length ? (
        <div className="highlight-list">
          {highlighted.map((paper) => (
            <FeaturedPaper key={paper.title} paper={paper} githubStats={githubStats} />
          ))}
        </div>
      ) : null}
      {compact.length ? (
        <div className="compact-paper-list">
          {compact.map((paper) => (
            <CompactPaper key={paper.title} paper={paper} githubStats={githubStats} />
          ))}
        </div>
      ) : null}
    </section>
  );
}

function FeaturedPaper({ paper, githubStats }) {
  return (
    <article className="featured-paper">
      <PublicationVisual paper={paper} />
      <div className="featured-paper-copy">
        <PublicationMeta paper={paper} />
        <h4>{paper.title}</h4>
        <p className="authors">{highlightAuthors(paper.authors)}</p>
        {paper.summary ? <p>{paper.summary}</p> : null}
        {paper.tags?.length ? <TagList items={paper.tags} className="paper-tags" /> : null}
        <ActionLinks links={paper.links} githubStats={githubStats} />
      </div>
    </article>
  );
}

function PublicationVisual({ paper }) {
  if (!paper.image) {
    return (
      <div className="paper-figure paper-figure-fallback">
        <span>{paper.group ?? paper.type ?? "Research"}</span>
      </div>
    );
  }

  return (
    <div className="paper-figure">
      <picture>
        {isRasterImage(paper.image) ? <source srcSet={toWebpPath(paper.image)} type="image/webp" /> : null}
        <img src={paper.image} alt={`${paper.title} visual summary`} loading="lazy" decoding="async" />
      </picture>
    </div>
  );
}

function CompactPaper({ paper, githubStats }) {
  return (
    <article className="compact-paper-row">
      <PublicationMeta paper={paper} compact />
      <div className="compact-main">
        <h4>{paper.title}</h4>
        <p className="authors">{highlightAuthors(paper.authors)}</p>
        {paper.tags?.length ? <TagList items={paper.tags.slice(0, 4)} className="paper-tags" /> : null}
      </div>
      <ActionLinks links={paper.links} githubStats={githubStats} />
    </article>
  );
}

function PublicationMeta({ paper, compact = false }) {
  const className = compact ? "compact-venue" : "paper-venue-line";

  return (
    <span className={className}>
      <SemanticIcon icon={venueIcon} />
      <span>{paper.venue}</span>
      {paper.year ? <time>{paper.year}</time> : null}
      {paper.type ? <span>{paper.type}</span> : null}
    </span>
  );
}

function ProjectList({ items, githubStats }) {
  return (
    <div className="project-grid">
      {items.map((project) => (
        <article className="project-card" key={project.title}>
          <div className="project-card-head">
            <h3>{project.title}</h3>
            {project.status ? (
              <span className="project-status">
                <SemanticIcon icon={statusIconMap[project.status] ?? fallbackTitleIcon} />
                {project.status}
              </span>
            ) : null}
          </div>
          <p>{project.summary}</p>
          {project.tags?.length ? <TagList items={project.tags} className="project-tags" /> : null}
          <ActionLinks links={project.links} githubStats={githubStats} />
        </article>
      ))}
    </div>
  );
}

function ProfileLinks() {
  return (
    <div className="profile-links">
      {profile.links.map((link) => (
        <a key={link.label} href={link.href} target="_blank" rel="noreferrer" aria-label={link.label} title={link.label}>
          <i className={profileIconMap[link.icon] ?? profileIconMap.Website} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}

function SectionTitle({ title, note }) {
  return (
    <div className="section-title">
      <h2>
        <TitleIcon icon={sectionIconMap[title] ?? fallbackTitleIcon} />
        <span>{title}</span>
      </h2>
      {note ? <p>{note}</p> : null}
    </div>
  );
}

function TitleIcon({ icon, compact = false }) {
  return (
    <span className={compact ? "title-icon title-icon-compact" : "title-icon"} aria-hidden="true">
      <SemanticIcon icon={icon} />
    </span>
  );
}

function SemanticIcon({ icon }) {
  return <Icon className="semantic-icon" icon={icon} aria-hidden="true" />;
}

function TagList({ items, className }) {
  return (
    <div className={className}>
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}

function ActionLinks({ links, githubStats = {} }) {
  if (!links?.length) return null;

  return (
    <div className="action-links">
      {links.map((link) => {
        const githubRepo = getGithubRepo(link.href);
        const showStats = Boolean(githubRepo && shouldShowGithubStats(link));
        const stats = showStats
          ? mergeGithubStats(githubStats[githubRepo], getGithubStatsFallback(link))
          : null;

        return (
          <a key={`${link.label}-${link.href}`} href={link.href} target="_blank" rel="noreferrer">
            <i className={getActionIcon(link)} aria-hidden="true" />
            <span>{link.label}</span>
            {showStats ? <GithubRepoStats stats={stats} /> : null}
          </a>
        );
      })}
    </div>
  );
}

function GithubRepoStats({ stats }) {
  if (!stats || (typeof stats.stars !== "number" && typeof stats.forks !== "number")) return null;

  return (
    <span className="repo-stats">
      {typeof stats.stars === "number" ? (
        <span className="repo-stat" title={`${stats.stars.toLocaleString()} GitHub stars`}>
          <i className="fa-solid fa-star" aria-hidden="true" />
          {formatGithubCount(stats.stars)}
        </span>
      ) : null}
      {typeof stats.forks === "number" ? (
        <span className="repo-stat" title={`${stats.forks.toLocaleString()} GitHub forks`}>
          <i className="fa-solid fa-code-fork" aria-hidden="true" />
          {formatGithubCount(stats.forks)}
        </span>
      ) : null}
    </span>
  );
}

function Timeline({ items }) {
  return (
    <div className="timeline">
      {items.map((item, index) => (
        <div className="timeline-item" key={`${item.period}-${item.title}-${index}`}>
          <div className="timeline-main">
            <strong>{item.title}</strong>
            {item.href ? (
              <a className="timeline-place" href={item.href} target="_blank" rel="noreferrer">
                {item.place}
              </a>
            ) : (
              <span className="timeline-place">{item.place}</span>
            )}
            {item.detail ? <p>{renderRichText(item.detail)}</p> : null}
          </div>
          <time>{item.period}</time>
        </div>
      ))}
    </div>
  );
}

function HonorsList({ items }) {
  return (
    <div className="honor-list">
      {items.map((item) => {
        const { title, year } = splitTrailingYear(item);

        return (
          <div className="honor-row" key={item}>
            <span>{title}</span>
            {year ? <time>{year}</time> : null}
          </div>
        );
      })}
    </div>
  );
}

function ServiceList({ items }) {
  return (
    <div className="service-groups">
      {items.map((group) => (
        <section className="service-group" key={group.category}>
          <h3>
            <TitleIcon icon={serviceIconMap[group.category] ?? fallbackTitleIcon} compact />
            <span>{group.category}</span>
          </h3>
          <div className="service-chip-grid">
            {group.items.map((item) => {
              const { title, year } = splitServiceYears(item);

              return (
                <span className="service-chip" key={item}>
                  <span>{title}</span>
                  {year ? <time>{year}</time> : null}
                </span>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

function getPublicationGroups(papers, preferredOrder) {
  const found = new Set(papers.map((paper) => paper.group).filter(Boolean));
  const ordered = preferredOrder.filter((group) => found.has(group));
  const remaining = Array.from(found).filter((group) => !ordered.includes(group)).sort();
  return [...ordered, ...remaining];
}

function getPublicationStats(papers) {
  const byYear = countBy(papers, (paper) => paper.year || "Unknown").sort((a, b) => b.label.localeCompare(a.label));
  const byGroup = countBy(papers, (paper) => paper.group || "Other").sort((a, b) => b.value - a.value);
  const byType = countBy(papers, (paper) => paper.type || "Publication").sort((a, b) => b.value - a.value);
  const byVenueFamily = countBy(papers, getVenueFamily).sort((a, b) => b.value - a.value);
  const openArtifacts = papers.filter((paper) =>
    paper.links?.some((link) => /code|dataset|demo|project|site|documentation/i.test(link.label))
  ).length;

  return {
    total: papers.length,
    featured: papers.filter((paper) => paper.featured).length,
    openArtifacts,
    byYear,
    byGroup,
    byType,
    byVenueFamily
  };
}

function countBy(items, getLabel) {
  const counts = new Map();
  items.forEach((item) => {
    const label = getLabel(item);
    counts.set(label, (counts.get(label) ?? 0) + 1);
  });
  return Array.from(counts, ([label, value]) => ({ label, value }));
}

function getVenueFamily(paper) {
  const value = `${paper.type ?? ""} ${paper.venue ?? ""}`.toLowerCase();
  if (value.includes("journal") || value.includes("jmlr") || value.includes("joss")) return "Journal";
  if (value.includes("dataset") || value.includes("benchmark")) return "Dataset";
  if (value.includes("report") || value.includes("preprint") || value.includes("technical")) return "Report";
  if (value.includes("workshop")) return "Workshop";
  return "Conference";
}

function renderRichText(content) {
  if (!Array.isArray(content)) return content;

  return content.map((part, index) => {
    if (typeof part === "string") return part;
    const body = part.strong ? <strong>{part.text}</strong> : part.text;

    if (part.href) {
      return (
        <a key={`${part.href}-${index}`} href={part.href} target="_blank" rel="noreferrer">
          {body}
        </a>
      );
    }

    return <span key={`${part.text}-${index}`}>{body}</span>;
  });
}

function useGithubRepoStats(collections) {
  const repos = useMemo(() => {
    const found = new Set();
    collections.forEach((items) => {
      items.forEach((item) => {
        item.links?.forEach((link) => {
          const repo = getGithubRepo(link.href);
          if (repo && shouldShowGithubStats(link)) {
            found.add(repo);
          }
        });
      });
    });
    return Array.from(found);
  }, [collections]);
  const [repoStats, setRepoStats] = useState({});

  useEffect(() => {
    if (!repos.length) {
      setRepoStats({});
      return undefined;
    }

    let cancelled = false;
    const now = Date.now();
    const cachedByRepo = Object.fromEntries(
      repos.map((repo) => [repo, readGithubStatsCache(repo)])
    );

    const cachedEntries = repos.flatMap((repo) => {
      const cached = cachedByRepo[repo];
      return cached ? [[repo, cached]] : [];
    });

    if (cachedEntries.length) {
      setRepoStats(Object.fromEntries(cachedEntries));
    }

    const reposToRefresh = repos.filter((repo) => {
      const cached = cachedByRepo[repo];
      // Template placeholder repos render fallback counts without noisy API errors.
      if (isPlaceholderGithubRepo(repo)) return false;
      return !cached || now - cached.checkedAt >= githubStatsCacheTtl;
    });

    if (!reposToRefresh.length) return undefined;

    const loadStats = async () => {
      const entries = await Promise.all(
        reposToRefresh.map(async (repo) => {
          const controller = new AbortController();
          const timeout = window.setTimeout(() => controller.abort(), 3500);
          try {
            const response = await fetch(`https://api.github.com/repos/${repo}`, {
              headers: { Accept: "application/vnd.github+json" },
              signal: controller.signal
            });
            if (!response.ok) {
              markGithubStatsCacheChecked(repo, cachedByRepo[repo]);
              return null;
            }
            const data = await response.json();
            const stats = normalizeGithubStats({
              stars: data.stargazers_count,
              forks: data.forks_count
            });
            if (!stats) return null;
            writeGithubStatsCache(repo, stats);
            return [repo, stats];
          } catch {
            markGithubStatsCacheChecked(repo, cachedByRepo[repo]);
            return null;
          } finally {
            window.clearTimeout(timeout);
          }
        })
      );

      const liveEntries = entries.filter(Boolean);
      if (!cancelled && liveEntries.length) {
        setRepoStats((currentStats) => ({
          ...currentStats,
          ...Object.fromEntries(liveEntries)
        }));
      }
    };

    let cleanupIdle = () => {};
    const cleanupLoad = runAfterInitialLoad(() => {
      cleanupIdle = runWhenIdle(loadStats, 1200);
    });

    return () => {
      cancelled = true;
      cleanupLoad();
      cleanupIdle();
    };
  }, [repos]);

  return repoStats;
}

function readGithubStatsCache(repo) {
  const key = getGithubStatsCacheKey(repo);
  const legacyKey = getLegacyStarCacheKey(repo);
  return readGithubStatsCacheStorage("localStorage", key)
    ?? readGithubStatsCacheStorage("sessionStorage", key)
    ?? readGithubStatsCacheStorage("localStorage", legacyKey)
    ?? readGithubStatsCacheStorage("sessionStorage", legacyKey);
}

function writeGithubStatsCache(repo, stats) {
  const now = Date.now();
  writeGithubStatsCacheEntry(repo, { ...stats, updatedAt: now, checkedAt: now });
}

function markGithubStatsCacheChecked(repo, cached) {
  if (!cached) return;
  writeGithubStatsCacheEntry(repo, { ...cached, checkedAt: Date.now() });
}

function writeGithubStatsCacheEntry(repo, entry) {
  const key = getGithubStatsCacheKey(repo);
  if (writeGithubStatsCacheStorage("localStorage", key, entry)) return;
  if (!writeGithubStatsCacheStorage("sessionStorage", key, entry)) {
    // Optional cache only.
  }
}

function readGithubStatsCacheStorage(storageName, key) {
  try {
    const storage = window[storageName];
    const cached = JSON.parse(storage.getItem(key));
    const stats = normalizeGithubStats({
      stars: cached?.stars ?? cached?.count,
      forks: cached?.forks
    });
    const updatedAt = Number(cached?.updatedAt ?? cached?.timestamp);
    const checkedAt = Number(cached?.checkedAt ?? updatedAt);
    if (!stats || !Number.isFinite(updatedAt) || !Number.isFinite(checkedAt)) return null;
    return { ...stats, updatedAt, checkedAt };
  } catch {
    return null;
  }
}

function writeGithubStatsCacheStorage(storageName, key, entry) {
  try {
    window[storageName].setItem(key, JSON.stringify(entry));
    return true;
  } catch {
    return false;
  }
}

function getGithubStatsCacheKey(repo) {
  return `github-repo-stats:${repo}`;
}

function getLegacyStarCacheKey(repo) {
  return `github-stars:${repo}`;
}

function shouldShowGithubStats(link) {
  if (link.showGithubStats === false || link.stats === false) return false;
  if (link.showGithubStats === true || link.stats === true) return true;
  const label = String(link.label ?? "").toLowerCase();
  return ["code", "github", "repo", "repository"].some((keyword) => label.includes(keyword));
}

function getGithubStatsFallback(link) {
  return normalizeGithubStats({
    stars: link.stars,
    forks: link.forks
  });
}

function mergeGithubStats(liveStats, fallbackStats) {
  return normalizeGithubStats({
    stars: liveStats?.stars ?? fallbackStats?.stars,
    forks: liveStats?.forks ?? fallbackStats?.forks
  });
}

function normalizeGithubStats(stats) {
  const normalized = {};
  const stars = Number(stats?.stars);
  const forks = Number(stats?.forks);

  if (Number.isFinite(stars)) normalized.stars = stars;
  if (Number.isFinite(forks)) normalized.forks = forks;

  return Object.keys(normalized).length ? normalized : null;
}

function getGithubRepo(href) {
  try {
    const url = new URL(href);
    if (url.hostname !== "github.com") return null;
    const [owner, repo] = url.pathname.split("/").filter(Boolean);
    if (!owner || !repo) return null;
    return `${owner}/${repo.replace(/\.git$/, "")}`;
  } catch {
    return null;
  }
}

function isPlaceholderGithubRepo(repo) {
  return repo.split("/")[0]?.toLowerCase() === "example";
}

function highlightAuthors(authors = "") {
  const names = profile.highlightNames?.length ? profile.highlightNames : [profile.name].filter(Boolean);
  if (!names.length) return authors;

  const nameSet = new Set(names);
  const pattern = new RegExp(`(${names.map(escapeRegExp).join("|")})`, "g");
  return authors.split(pattern).map((part, index) => (
    nameSet.has(part) ? <strong key={`${part}-${index}`}>{part}</strong> : <span key={`${part}-${index}`}>{part}</span>
  ));
}

function getInitialTheme() {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function runAfterInitialLoad(callback) {
  let timeoutId = 0;

  const run = () => {
    timeoutId = window.setTimeout(callback, 0);
  };

  if (document.readyState === "complete") {
    run();
    return () => window.clearTimeout(timeoutId);
  }

  window.addEventListener("load", run, { once: true });
  return () => {
    window.removeEventListener("load", run);
    window.clearTimeout(timeoutId);
  };
}

function runWhenIdle(callback, timeout = 1000) {
  if ("requestIdleCallback" in window) {
    const idleId = window.requestIdleCallback(callback, { timeout });
    return () => window.cancelIdleCallback(idleId);
  }

  const timeoutId = window.setTimeout(callback, timeout);
  return () => window.clearTimeout(timeoutId);
}

function splitTrailingYear(value) {
  const match = value.match(/^(.*),\s*(\d{4})$/);
  if (!match) return { title: value, year: "" };
  return { title: match[1], year: match[2] };
}

function splitServiceYears(value) {
  const match = value.match(/^(.+?)\s((?:\d{4}(?:,\s*)?)+)$/);
  if (!match) return { title: value, year: "" };
  return { title: match[1], year: match[2].replace(/,\s*/g, " / ") };
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function formatNumber(value) {
  return new Intl.NumberFormat("en").format(value);
}

function formatGithubCount(value) {
  if (value >= 1000) {
    const rounded = Math.round((value / 1000) * 10) / 10;
    return `${rounded.toString().replace(/\.0$/, "")}k`;
  }
  return value.toString();
}

function getInitials(value = "") {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "A";
}

function isRasterImage(src) {
  return /\.(png|jpe?g)$/i.test(src);
}

function toWebpPath(src) {
  return src.replace(/\.(png|jpe?g)$/i, ".webp");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default App;
