# Proxy Browser (GitHub Pages)

This repository hosts a lightweight browser-like UI that loads websites through a CORS-friendly proxy and runs fully in the browser.

## Quick fix for GitHub Pages 404

If GitHub Pages shows:

> 404 — File not found

it usually means Pages is not publishing from the same place your site files are stored.

Use this exact setup:

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Keep/enable the included workflow at `.github/workflows/pages.yml`.
5. Push a commit (or run the workflow manually from the **Actions** tab).

This workflow publishes the static site from the `docs/` folder, so your Pages URL always gets an `index.html` and `404.html`.

## Local preview

```bash
python -m http.server 8000 --directory docs
```
