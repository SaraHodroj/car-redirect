export default function handler(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);

  const path = url.pathname.replace(/^\/api\/r\/?/, "");
  const parts = path.split("/").filter(Boolean);

  const brand = (parts.shift() || "").toLowerCase();
  const restPath = parts.join("/"); // can be ANYTHING: stock, offers, owners, etc.
  const query = url.search || "";

  if (!brand) return res.status(400).send("Brand not provided");

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

  // Build final URL safely
  const cleanRest = restPath ? "/" + restPath : "";
  const finalUrl = base + cleanRest + query;

  return res.redirect(302, finalUrl);
}
