const { chromium } = require("playwright");
const path = require("path");
const OUT = path.join(__dirname, "screenshots");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1400, height: 900 } });
  const page = await ctx.newPage();

  // 1. Hero with expanded map
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(5000);
  await page.screenshot({ path: `${OUT}/m01-hero-map-expanded.png` });
  console.log("✓ m01-hero-map-expanded.png");

  // 2. Map widget close-up
  await page.screenshot({ path: `${OUT}/m02-map-widget.png`, clip: { x: 0, y: 570, width: 420, height: 320 } });
  console.log("✓ m02-map-widget.png");

  // 3. Collapse the map
  await page.click('[aria-label="Minimize map"]');
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/m03-hero-map-collapsed.png` });
  console.log("✓ m03-hero-map-collapsed.png");

  // 4. Collapsed icon close-up
  await page.screenshot({ path: `${OUT}/m04-map-icon.png`, clip: { x: 0, y: 780, width: 160, height: 110 } });
  console.log("✓ m04-map-icon.png");

  // 5. Expand again
  await page.click('[aria-label="Expand map"]');
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/m05-hero-re-expanded.png` });
  console.log("✓ m05-hero-re-expanded.png");

  // 6. Mobile — map widget hidden
  const mCtx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mPage = await mCtx.newPage();
  await mPage.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await mPage.waitForTimeout(3000);
  await mPage.screenshot({ path: `${OUT}/m06-mobile-no-map.png` });
  console.log("✓ m06-mobile-no-map.png");

  await browser.close();
  console.log("Done.");
})();
