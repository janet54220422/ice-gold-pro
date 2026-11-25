exports.handler = async function() {
  try {
    const gRes = await fetch("https://gold-api.com");
    const gJson = await gRes.json();
    const fRes = await fetch("https://er-api.com");
    const fJson = await fRes.json();
    const xau = gJson && gJson.price;
    const twd = fJson && fJson.rates && fJson.rates.TWD;
    if (xau > 0 && twd > 0) {
      const qian = Math.round((xau * twd / 31.1034768) * 3.75);
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
        body: JSON.stringify({ qian: qian })
      };
    }
    return { statusCode: 500, body: JSON.stringify({ error: "no_data" }) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
