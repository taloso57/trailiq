const { chromium } = require("playwright");
const path = require("path");
const OUT = path.join(__dirname, "screenshots");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1400, height: 900 } });
  const page = await ctx.newPage();

  // Browse page — full + card close-up
  await page.goto("http://localhost:3000/browse", { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${OUT}/u01-browse-full.png` });
  console.log("✓ u01-browse-full.png");

  // Cards close-up to check overlap + text sizes
  await page.screenshot({ path: `${OUT}/u02-browse-cards.png`, clip: { x: 0, y: 220, width: 1400, height: 520 } });
  console.log("✓ u02-browse-cards.png");

  // Single card close-up
  await page.screenshot({ path: `${OUT}/u03-card-zoom.png`, clip: { x: 0, y: 220, width: 380, height: 540 } });
  console.log("✓ u03-card-zoom.png");

  // Navbar close-up
  await page.screenshot({ path: `${OUT}/u04-navbar.png`, clip: { x: 0, y: 0, width: 1400, height: 80 } });
  console.log("✓ u04-navbar.png");

  // Compare page headline + brand grid
  await page.goto("http://localhost:3000/compare", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}/u05-compare-headline.png`, clip: { x: 0, y: 60, width: 1400, height: 300 } });
  console.log("✓ u05-compare-headline.png");

  // Compare — select Osprey then comparison table
  await page.click("button:has-text('Osprey')");
  await page.waitForTimeout(600);
  const btns = await page.$$("button:has-text('+ Compare'), button:has-text('+ השווה')");
  if (btns[0]) { await btns[0].click(); await page.waitForTimeout(200); }
  if (btns[1]) { await btns[1].click(); await page.waitForTimeout(200); }
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/u06-compare-table.png` });
  console.log("✓ u06-compare-table.png");

  // Alerts page
  await page.goto("http://localhost:3000/alerts", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/u07-alerts.png`, clip: { x: 0, y: 60, width: 900, height: 300 } });
  console.log("✓ u07-alerts.png");

  await browser.close();
  console.log("Done.");
})();
