const form = document.getElementById("proxy-form");
const input = document.getElementById("url-input");
const status = document.getElementById("status");
const frame = document.getElementById("viewer-frame");

const PROXY_BASE = "https://api.allorigins.win/raw?url=";

const normalizeUrl = (value) => {
  if (!value) {
    return "";
  }

  const trimmed = value.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
};

const setStatus = (message, isError = false) => {
  status.textContent = message;
  status.style.color = isError ? "#ff5c5c" : "";
};

const buildSrcDoc = (html, targetUrl) => {
  const baseTag = `<base href="${targetUrl}" />`;
  if (/<head[^>]*>/i.test(html)) {
    return html.replace(/<head[^>]*>/i, (match) => `${match}${baseTag}`);
  }

  return `<!doctype html><html><head>${baseTag}</head><body>${html}</body></html>`;
};

const fetchViaProxy = async (targetUrl) => {
  const proxyUrl = `${PROXY_BASE}${encodeURIComponent(targetUrl)}`;
  const response = await fetch(proxyUrl, { method: "GET" });
  if (!response.ok) {
    throw new Error(`Proxy responded with ${response.status}`);
  }
  return response.text();
};

const loadUrl = async (rawUrl) => {
  const targetUrl = normalizeUrl(rawUrl);
  if (!targetUrl) {
    setStatus("Please enter a valid URL.", true);
    return;
  }

  setStatus("Loading…");

  try {
    const html = await fetchViaProxy(targetUrl);
    frame.srcdoc = buildSrcDoc(html, targetUrl);
    setStatus(`Loaded ${targetUrl}`);
  } catch (error) {
    setStatus(
      `Unable to load this page. The proxy may be blocking it or the URL is invalid. (${error.message})`,
      true,
    );
    frame.srcdoc = "";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  loadUrl(input.value);
});

input.value = "https://example.com";
loadUrl(input.value);
