export default function handler(req, res) {
  const pathParam = req.query.path;

  const parts = Array.isArray(pathParam)
    ? pathParam
    : (pathParam ? String(pathParam).split("/") : []);

  const brand = (parts[0] || "").toLowerCase();
  const restPath = parts.slice(1).join("/");

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

  // Forward query params (except "path")
  const { path, ...restQuery } = req.query;
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(restQuery)) {
    if (Array.isArray(v)) v.forEach(x => sp.append(k, x));
    else if (v !== undefined) sp.append(k, v);
  }

  const finalUrl =
    baseUrl.replace(/\/$/, "") +
    (restPath ? "/" + restPath : "") +
    (sp.toString() ? "?" + sp.toString() : "");

  return res.redirect(302, finalUrl);
}
