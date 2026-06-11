import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { siteMeta } from "./src/content/site.js";

const siteMetaPlugin = {
  name: "site-meta",
  transformIndexHtml(html) {
    const replacements = {
      "%SITE_TITLE%": siteMeta.title,
      "%SITE_DESCRIPTION%": siteMeta.description,
      "%SITE_SOCIAL_DESCRIPTION%": siteMeta.socialDescription,
      "%SITE_URL%": siteMeta.url,
      "%SITE_IMAGE%": siteMeta.image
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

export default defineConfig({
  plugins: [react(), siteMetaPlugin]
});
