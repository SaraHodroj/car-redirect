export default function handler(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);

  const path = url.pathname.replace("/api/r/", "");
  const parts = path.split("/");

  const brand = parts.shift()?.toLowerCase();
  const restPath = parts.join("/");
  const query = url.search;

  if (!brand) {
    return res.status(400).send("Brand not provided");
  }

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

  // ✅ Normalize paths for specific brands
  let normalizedRestPath = restPath;

  // Mercedes: /stock/... -> /en/stock/...
  if (brand === "mercedes" && normalizedRestPath.startsWith("stock/")) {
    normalizedRestPath = "en/" + normalizedRestPath;
  }

  // BMW: /stock/... -> /en/stock/...
  if (brand === "bmw" && normalizedRestPath.startsWith("stock/")) {
    normalizedRestPath = "en/" + normalizedRestPath;
  }

  const finalUrl = baseUrl + normalizedRestPath + query;
  return res.redirect(302, finalUrl);
}
