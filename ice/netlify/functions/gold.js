exports.handler = async function() {
  try {
    const g = await (await fetch("https://gold-api.com")).json();
    const f = await (await fetch("https://er-api.com")).json();
    if (g.price > 0 && f.rates.TWD > 0) {
      return { statusCode: 200, body: JSON.stringify({ qian: Math.round((g.price * f.rates.TWD / 31.1034768) * 3.75) }) };
    }
    return { statusCode: 500, body: "{}" };
  } catch (e) { return { statusCode: 500, body: "{}" }; }
};
