const { chromium } = require("playwright");
const path = require("path");
const OUT = path.join(__dirname, "screenshots");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1400, height: 900 } });
  const page = await ctx.newPage();

  // Hero: wait extra long so the video starts loading and fades in
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(6000); // enough time for video fetch + canPlay event

  await page.screenshot({ path: `${OUT}/v01-hero-video.png` });
  console.log("✓ v01-hero-video.png");

  // Crop: just the top-left text area
  await page.screenshot({ path: `${OUT}/v02-hero-text.png`, clip: { x: 0, y: 0, width: 700, height: 500 } });
  console.log("✓ v02-hero-text.png");

  // Crop: bottom-right corner to check video credit
  await page.screenshot({ path: `${OUT}/v03-hero-credit.png`, clip: { x: 1100, y: 800, width: 300, height: 100 } });
  console.log("✓ v03-hero-credit.png");

  // Mobile viewport — should use poster image
  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mPage = await mobile.newPage();
  await mPage.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await mPage.waitForTimeout(4000);
  await mPage.screenshot({ path: `${OUT}/v04-hero-mobile.png` });
  console.log("✓ v04-hero-mobile.png");

  await browser.close();
  console.log("\nAll video screenshots done.");
})();
