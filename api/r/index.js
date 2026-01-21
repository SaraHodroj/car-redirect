export default function handler(req, res) {
  try {
    let rawPath = req.query?.path;

    if (Array.isArray(rawPath)) rawPath = rawPath.join("/");
    if (!rawPath || typeof rawPath !== "string") {
      return res.status(400).send("Brand not provided");
    }

    const parts = rawPath.split("/").filter(Boolean);
    if (parts.length === 0) return res.status(400).send("Brand not provided");

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
    if (!base) return res.status(404).send(`Unknown brand: ${brand}`);

    // Build query string from req.query (excluding "path")
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(req.query || {})) {
      if (key === "path") continue;

      if (Array.isArray(value)) {
        value.forEach(v => params.append(key, v));
      } else if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    }

    const qs = params.toString() ? `?${params.toString()}` : "";
    const finalUrl = base + (restPath ? `/${restPath}` : "") + qs;

    return res.redirect(302, finalUrl);
  } catch (err) {
    console.error("Redirect error:", err);
    return res.status(500).send("Internal redirect error");
  }
}
