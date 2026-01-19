export default function handler(req, res) {
  const slug = (req.query.slug || []).join("/");
  const [brand, id] = slug.split("/");

  if (!brand || !id) {
    return res.status(404).send("Not found");
  }

  if (brand === "mercedes") {
    return res.redirect(
      302,
      `https://www.mercedes-benz-mena.com/dubai/en/stock/${id}`
    );
  }

  if (brand === "bmw") {
    return res.redirect(
      302,
      `https://www.bmw-abudhabi.com/en/stock/${id}`
    );
  }

  return res.status(404).send("Unknown brand");
}
