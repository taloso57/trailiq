const { chromium } = require("playwright");
const OUT = require("path").join(__dirname, "screenshots");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1400, height: 900 } });
  const page = await ctx.newPage();

  // Hero fresh
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(4000);
  await page.screenshot({ path: `${OUT}/f01-hero.png` });
  console.log("✓ f01-hero.png");

  // Compare — brand grid (new minimal style)
  await page.goto("http://localhost:3000/compare", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${OUT}/f02-compare-brands.png` });
  console.log("✓ f02-compare-brands.png");

  // Compare — product list (Osprey)
  await page.click("button:has-text('Osprey')");
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/f03-compare-products.png` });
  console.log("✓ f03-compare-products.png");

  // Select 2 for comparison table
  const btns = await page.$$("button:has-text('+ Compare'), button:has-text('+ השווה')");
  if (btns[0]) { await btns[0].click(); await page.waitForTimeout(300); }
  if (btns[1]) { await btns[1].click(); await page.waitForTimeout(300); }
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${OUT}/f04-compare-table.png` });
  console.log("✓ f04-compare-table.png");

  // Browse hover state
  await page.goto("http://localhost:3000/browse", { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  const card = await page.$(".product-card");
  if (card) { await card.hover(); await page.waitForTimeout(600); }
  await page.screenshot({ path: `${OUT}/f05-browse-hover.png`, clip: { x: 0, y: 220, width: 700, height: 540 } });
  console.log("✓ f05-browse-hover.png");

  await browser.close();
  console.log("Done.");
})();
