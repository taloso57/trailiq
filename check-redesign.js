const { chromium } = require("playwright");
const path = require("path");
const fs   = require("fs");

const OUT = path.join(__dirname, "screenshots");
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT);

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1400, height: 900 } });
  const page = await ctx.newPage();

  // Wait for Next.js HMR to settle
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(4000);

  // 1. Hero — top fold
  await page.screenshot({ path: `${OUT}/r01-hero.png` });
  console.log("✓ r01-hero.png");

  // 2. Hero + navbar close-up
  await page.screenshot({ path: `${OUT}/r02-navbar.png`, clip: { x: 0, y: 0, width: 1400, height: 80 } });
  console.log("✓ r02-navbar.png");

  // 3. Scroll to 3-card chat section
  await page.evaluate(() => window.scrollTo({ top: 820, behavior: "instant" }));
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}/r03-chat-cards.png` });
  console.log("✓ r03-chat-cards.png");

  // 4. Feature cards
  await page.evaluate(() => window.scrollTo({ top: 1600, behavior: "instant" }));
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/r04-features.png` });
  console.log("✓ r04-features.png");

  // 5. Browse page
  await page.goto("http://localhost:3000/browse", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${OUT}/r05-browse.png` });
  console.log("✓ r05-browse.png");

  // 6. Browse cards close-up
  await page.evaluate(() => window.scrollTo({ top: 250, behavior: "instant" }));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/r06-browse-cards.png` });
  console.log("✓ r06-browse-cards.png");

  // 7. Hover over first card to reveal actions
  const firstCard = await page.$(".product-card");
  if (firstCard) {
    await firstCard.hover();
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${OUT}/r07-card-hover.png`, clip: { x: 0, y: 240, width: 380, height: 460 } });
    console.log("✓ r07-card-hover.png");
  }

  // 8. Compare page
  await page.goto("http://localhost:3000/compare", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${OUT}/r08-compare.png` });
  console.log("✓ r08-compare.png");

  // 9. Alerts page
  await page.goto("http://localhost:3000/alerts", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/r09-alerts.png` });
  console.log("✓ r09-alerts.png");

  // 10. WeightBar — add items then screenshot
  await page.goto("http://localhost:3000/browse", { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  const bags = await page.$$(".product-card button");
  for (const btn of bags.slice(0, 3)) {
    try { const t = await btn.textContent(); if (t && (t.includes("הוסף") || t.includes("Add"))) { await btn.click(); await page.waitForTimeout(200); } } catch {}
  }
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/r10-weightbar.png`, clip: { x: 0, y: 780, width: 1400, height: 120 } });
  console.log("✓ r10-weightbar.png");

  await browser.close();
  console.log("\nAll screenshots saved!");
})();
