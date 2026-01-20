export default function handler(req, res) {
  // Full path (e.g. /api/r/bmw/stock/123)
  const pathname = new URL(req.url, `http://${req.headers.host}`).pathname;

  // Remove "/api/r/"
  const pathAfterR = pathname.replace("/api/r/", "");

  // Split into brand + rest of path
  const [brandRaw, ...rest] = pathAfterR.split("/");
  const brand = (brandRaw || "").toLowerCase();

  const BRAND_BASE_URLS = {
    bmw: "https://www.bmw-abudhabi.com/",
    mercedes: "https://www.mercedes-benz-mena.com/dubai/",
    altayer: "https://www.altayermotors.com/",
    mg: "https://www.mg-uae.com/",
    audi: "https://www.audi-dubai.com/",
    jaguar: "https://www.jaguar-uae.com/",
    porsche: "https://finder.porsche.com/",
    polestar: "https://www.polestarimporteruae.com/",
    tesla: "https://www.tesla.com/",
    lexus: "https://www.lexus.ae/",
    volvo: "https://www.volvocarsuae.ae/",
    byd: "https://www.byduae.ae/",
    smart: "https://uae.smart.com/",
    jetour: "https://www.jetouruae.com/",
    zeekr: "https://www.zeekrlife.com/",
    genesis: "https://www.genesis.com/",
    findbmw: "https://www.findyourbmw.ae/",
    findmini: "https://findyourmini.ae/"
  };

  const baseUrl = BRAND_BASE_URLS[brand];

  if (!baseUrl) {
    return res.status(404).send(`Unknown brand: ${brand}`);
  }

  // Build final redirect URL
  const finalUrl =
    rest.length > 0
      ? baseUrl.replace(/\/$/, "") + "/" + rest.join("/")
      : baseUrl;

  return res.redirect(302, finalUrl);
}
