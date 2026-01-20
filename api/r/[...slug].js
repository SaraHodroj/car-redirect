export default function handler(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);

  // Everything after /api/r/
  const parts = url.pathname.replace("/api/r/", "").split("/");

  const brand = parts.shift()?.toLowerCase();
  const restPath = parts.join("/");

  const BRAND_URLS = {
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

  const baseUrl = BRAND_URLS[brand];

  if (!baseUrl) {
    return res.status(404).send("Unknown brand");
  }

  const finalUrl =
    baseUrl +
    restPath +
    (url.search ? url.search : "");

  return res.redirect(302, finalUrl);
}
