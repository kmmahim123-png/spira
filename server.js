const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

// Load .env if present
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx > 0) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      if (!process.env[key]) process.env[key] = val;
    }
  }
}

const PORT = process.env.PORT || 3000;
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://weuoxuszauoacifshvuy.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_eOYLlZ5-QcljD00uQP6LJQ_YrK9Vk8z';
const SUPABASE_JWKS_URL = process.env.SUPABASE_JWKS_URL || 'https://weuoxuszauoacifshvuy.supabase.co/auth/v1/.well-known/jwks.json';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

function probeSupabaseRest(endpointPath) {
  return new Promise((resolve) => {
    const targetUrl = new URL(endpointPath, SUPABASE_URL);
    const req = https.request(
      targetUrl,
      {
        method: 'GET',
        headers: {
          apikey: SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`
        },
        timeout: 6000
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => { body += chunk; });
        res.on('end', () => {
          resolve({ statusCode: res.statusCode, body });
        });
      }
    );
    req.on('error', (err) => resolve({ statusCode: 0, error: err.message }));
    req.on('timeout', () => {
      req.destroy();
      resolve({ statusCode: 0, error: 'timeout' });
    });
    req.end();
  });
}

const server = http.createServer(async (req, res) => {
  const cleanUrl = req.url.split('?')[0];

  // Backend API Health & Supabase Connection Test Endpoint
  if (cleanUrl === '/api/health') {
    const jwksCheck = await probeSupabaseRest('/auth/v1/.well-known/jwks.json');
    const productsCheck = await probeSupabaseRest('/rest/v1/products?select=id&limit=1');
    const isApiConnected = jwksCheck.statusCode === 200 && (productsCheck.statusCode === 200 || productsCheck.statusCode === 404);
    const payload = {
      ok: isApiConnected,
      server: 'SPIRA Node & Supabase Backend Server',
      projectRef: 'weuoxuszauoacifshvuy',
      supabaseUrl: SUPABASE_URL,
      publishableKeyValid: productsCheck.statusCode === 200 || (productsCheck.body && productsCheck.body.includes('PGRST205')),
      jwksStatus: jwksCheck.statusCode,
      productsTableReady: productsCheck.statusCode === 200,
      productsTableStatus: productsCheck.statusCode,
      nextAction: productsCheck.statusCode === 200
        ? 'Tables are live and synced!'
        : 'Run supabase_schema.sql in Supabase SQL Editor (or authenticate MCP in Antigravity Settings -> Customizations -> Supabase -> Authenticate)'
    };
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify(payload, null, 2));
  }

  // Public Client Config Endpoint
  if (cleanUrl === '/api/config') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify({
      supabaseUrl: SUPABASE_URL,
      supabasePublishableKey: SUPABASE_PUBLISHABLE_KEY,
      jwksUrl: SUPABASE_JWKS_URL
    }));
  }

  let filePath = path.join(__dirname, cleanUrl === '/' ? 'index.html' : cleanUrl);
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      filePath = path.join(__dirname, 'index.html');
    }
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500);
        return res.end('Server Error');
      }
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log(`SPIRA Organic Superfood Server running at http://localhost:${PORT}`);
  console.log(`Connected to Supabase Project: ${SUPABASE_URL}`);
});
