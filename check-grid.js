const { chromium } = require("playwright");
const path = require("path");
const OUT = path.join(__dirname, "screenshots");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1400, height: 900 } });
  const page = await ctx.newPage();

  await page.goto("http://localhost:3000/compare", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await page.click("button:has-text('Osprey')");
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}/fix-compare-products.png` });
  console.log("✓ fix-compare-products.png");
  await browser.close();
})();
