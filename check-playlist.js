const { chromium } = require("playwright");
const path = require("path");
const OUT = path.join(__dirname, "screenshots");

(async () => {
  const browser = await chromium.launch({ headless: true });

  // Desktop — let video 1 play briefly, check it fades in
  const ctx = await browser.newContext({ viewport: { width: 1400, height: 900 } });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(7000); // enough for playlist fetch + video 1 canPlay
  await page.screenshot({ path: `${OUT}/p01-hero-playlist.png` });
  console.log("✓ p01-hero-playlist.png");

  // Mobile — poster cycling
  const mCtx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mPage = await mCtx.newPage();
  await mPage.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await mPage.waitForTimeout(4000);
  await mPage.screenshot({ path: `${OUT}/p02-mobile-poster.png` });
  console.log("✓ p02-mobile-poster.png");

  await browser.close();
  console.log("Done.");
})();
