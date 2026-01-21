export default function handler(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);

  // pathname example: /api/r/bmw/owners/why-service-with-bmw/
  const path = url.pathname.replace(/^\/api\/r\/?/, "");
  const parts = path.split("/").filter(Boolean);

  const brand = (parts.shift() || "").toLowerCase();
  const restPath = parts.join("/");     // everything after the brand
  const query = url.search || "";       // keeps ?finances[term]=60 etc.

  if (!brand) return res.status(400).send("Brand not provided");

  // IMPORTANT: base URLs should be DOMAIN ROOT (no extra /dubai/ etc)
  const BRAND_BASE_URLS = {
    bmw: "https://www.bmw-abudhabi.com/",
    mercedes: "https://www.mercedes-benz-mena.com/",
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
  if (!baseUrl) return res.status(404).send(`Unknown brand: ${brand}`);

  // safe join (avoids //)
  const finalUrl =
    baseUrl.replace(/\/$/, "") +
    "/" +
    restPath.replace(/^\//, "") +
    query;

  return res.redirect(302, finalUrl);
}
