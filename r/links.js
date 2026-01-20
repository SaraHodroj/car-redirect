export default function handler(req, res) {
  const parts = req.query.slug || [];
  const brand = parts[0]; 

  if (!brand) {
    return res.status(404).send("Brand not provided");
  }

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
    findmini: "https://findyourmini.ae/",
  };

  const redirectUrl = BRAND_URLS[brand.toLowerCase()];

  if (!redirectUrl) {
    return res.status(404).send("Unknown brand");
  }

  return res.redirect(302, redirectUrl);
} 