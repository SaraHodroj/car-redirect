export default function handler(req, res) {
  const url = new URL(req.url, `https://${req.headers.host}`);

  let rawPath = req.query?.path;

  if (Array.isArray(rawPath)) rawPath = rawPath.join("/");

  if (typeof rawPath !== "string" || rawPath.length === 0) {
    rawPath = url.pathname.replace(/^\/api\/r\/?/, "");
  }

  const parts = rawPath.split("/").filter(Boolean);

  if (parts.length === 0) {
    return res.status(400).send("Brand not provided");
  }

  const brand = parts.shift().toLowerCase();
  const restPath = parts.join("/");

  const BRAND_BASE_URLS = {
    bmw: "https://www.bmw-abudhabi.com",
    mercedes: "https://www.mercedes-benz-mena.com",
    altayer: "https://www.altayermotors.com",
    mg: "https://www.mg-uae.com",
    audi: "https://www.audi-dubai.com",
    jaguar: "https://www.jaguar-uae.com",
    porsche: "https://finder.porsche.com",
    polestar: "https://www.polestarimporteruae.com",
    tesla: "https://www.tesla.com",
    lexus: "https://www.lexus.ae",
    volvo: "https://www.volvocarsuae.ae",
    byd: "https://www.byduae.ae",
    smart: "https://uae.smart.com",
    jetour: "https://www.jetouruae.com",
    zeekr: "https://www.zeekrlife.com",
    genesis: "https://www.genesis.com",
    findbmw: "https://www.findyourbmw.ae",
    findmini: "https://findyourmini.ae"
  };

  const base = BRAND_BASE_URLS[brand];
  if (!base) {
    return res.status(404).send(`Unknown brand: ${brand}`);
  }

  // IMPORTANT: use the original query string ONLY (not the rewrite's ?path=...)
  const originalQuery = url.searchParams.has("path")
    ? "?" + [...url.searchParams.entries()]
        .filter(([k]) => k !== "path")
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        .join("&")
    : (url.search || "");

  const finalUrl = base + (restPath ? "/" + restPath : "") + originalQuery;
  return res.redirect(302, finalUrl);
}
