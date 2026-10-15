import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { siteMeta } from "./src/content/site.js";

const siteUrl = getSiteUrl();

const siteMetaPlugin = {
  name: "site-meta",
  transformIndexHtml(html) {
    const replacements = {
      "%SITE_TITLE%": siteMeta.title,
      "%SITE_DESCRIPTION%": siteMeta.description,
      "%SITE_SOCIAL_DESCRIPTION%": siteMeta.socialDescription,
      "%SITE_URL%": siteUrl.href,
      "%SITE_IMAGE%": new URL(siteMeta.image, siteUrl).href
    };

    return Object.entries(replacements).reduce(
      (content, [token, value]) => content.replaceAll(token, escapeHtml(value)),
      html
    );
  }
};

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export default defineConfig(({ command, isPreview }) => ({
  base: command === "serve" && !isPreview ? "/" : siteUrl.pathname,
  plugins: [react(), siteMetaPlugin]
}));

function getSiteUrl() {
  if (siteMeta.url) {
    const url = new URL(siteMeta.url);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      throw new Error("siteMeta.url must be an http:// or https:// URL.");
    }
    if (!url.pathname.endsWith("/")) url.pathname += "/";
    return url;
  }

  const [owner, repo] = (process.env.GITHUB_REPOSITORY ?? "").split("/");
  if (!owner || !repo) return new URL("http://127.0.0.1:5173/");
  const base = repo.toLowerCase() === `${owner.toLowerCase()}.github.io` ? "/" : `/${repo}/`;
  return new URL(`https://${owner.toLowerCase()}.github.io${base}`);
}
