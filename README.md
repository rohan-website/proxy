# Proxy Browser (GitHub Pages)

This repo hosts a lightweight browser-like UI that loads sites through a CORS-friendly proxy. It is designed to run entirely on GitHub Pages with no downloads.

## Deploy on GitHub Pages

1. Push this repository to GitHub.
2. In **Settings → Pages**, set **Source** to `Deploy from a branch`.
3. Choose the branch containing this code and select the **/docs** folder.
4. Save. Your site will be available at the GitHub Pages URL shown in the Pages settings.

> The project includes a `docs/` copy of the site so Pages can serve it directly from that folder. If you prefer the root, update Pages to serve from `/` instead.

## Local preview

```bash
python -m http.server 8000 --directory docs
```
