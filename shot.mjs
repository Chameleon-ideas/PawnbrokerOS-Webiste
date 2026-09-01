import { chromium } from 'playwright';
import fs from 'node:fs';

const OUT = process.argv[2] || 'shots';
const WIDTH = Number(process.argv[3] || 1440);
const URL = process.argv[4] || 'http://localhost:4321/';
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: WIDTH, height: 1000 },
  deviceScaleFactor: 1,
});
page.on('console', (m) => { if (m.type() === 'error') console.log('CONSOLE ERROR:', m.text()); });
page.on('pageerror', (e) => console.log('PAGE ERROR:', e.message));

await page.goto(URL, { waitUntil: 'networkidle' });

// force all reveals visible so screenshots show final state
await page.addStyleTag({
  content: '[data-reveal]{opacity:1 !important;transform:none !important}',
});
await page.evaluate(async () => {
  // force-load every image so nothing is blank in the capture
  document.querySelectorAll('img').forEach((i) => { i.loading = 'eager'; i.decoding = 'sync'; });
  // scroll through to trigger observers / scaler sizing
  const h = document.body.scrollHeight;
  for (let y = 0; y < h; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 12)); }
  window.scrollTo(0, 0);
  await Promise.all(
    Array.from(document.images).map((i) => (i.complete ? i.decode().catch(() => {}) : new Promise((r) => { i.onload = i.onerror = r; })))
  );
});
await page.waitForTimeout(1200);

const total = await page.evaluate(() => document.body.scrollHeight);
console.log('page height', total, 'at width', WIDTH);

const sections = await page.evaluate(() =>
  Array.from(document.querySelectorAll('main > section, header, footer')).map((el, i) => {
    const r = el.getBoundingClientRect();
    return { i, cls: el.className || el.tagName, top: Math.round(r.top + window.scrollY), h: Math.round(r.height) };
  })
);
console.log(JSON.stringify(sections, null, 1));

for (const s of sections) {
  const name = String(s.cls).split(' ').filter(Boolean).pop() || 'sec';
  await page.screenshot({
    path: `${OUT}/${String(s.i).padStart(2, '0')}-${name.replace(/[^\w-]/g, '')}.png`,
    fullPage: true,
    clip: { x: 0, y: s.top, width: WIDTH, height: Math.min(s.h, 4000) },
  });
}
await browser.close();
console.log('done ->', OUT);
