export default async function handler(req, res) {
  const urlParts = req.url.split('?');
  const pathname = urlParts[0];
  const queryString = urlParts.length > 1 ? `?${urlParts[1]}` : '';

  // Forward to Django backend
  const targetUrl = `https://api.theskills4hire.com${pathname}${queryString}`;

  const headers = {};
  for (const [key, value] of Object.entries(req.headers)) {
    const lowerKey = key.toLowerCase();
    if (!['host', 'connection', 'x-forwarded-host', 'x-forwarded-proto'].includes(lowerKey)) {
      headers[key] = value;
    }
  }
  headers['host'] = 'api.theskills4hire.com';

  const fetchOptions = {
    method: req.method,
    headers,
  };

  if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.body) {
    fetchOptions.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
  }

  try {
    const upstreamRes = await fetch(targetUrl, fetchOptions);
    const buffer = await upstreamRes.arrayBuffer();

    res.status(upstreamRes.status);
    upstreamRes.headers.forEach((val, key) => {
      const lower = key.toLowerCase();
      if (!['content-encoding', 'content-length', 'transfer-encoding'].includes(lower)) {
        res.setHeader(key, val);
      }
    });

    res.send(Buffer.from(buffer));
  } catch (error) {
    res.status(502).json({ error: 'Proxy request failed', details: error.message });
  }
}
