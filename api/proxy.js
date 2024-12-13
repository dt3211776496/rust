// api/proxy.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { path } = req.query; // 提取路径参数

  if (!path) {
    return res.status(400).json({ error: 'No path provided' });
  }

  try {
 
    const response = await fetch(`http://northsea.xyz:38877/${path}`, {
      method: req.method,
      headers: {
        ...req.headers,
        
        Host: 'northsea.xyz',
      },
      body: req.body, // 转发请求体
    });

    const data = await response.text();
    res.status(response.status).send(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching the URL' });
  }
}
