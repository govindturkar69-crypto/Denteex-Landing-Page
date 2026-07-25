// Regenerates the README screenshots from the live app.
// Playwright isn't a saved project dependency (kept out of package.json on
// purpose) — install it on demand before running this:
//   npm install --no-save playwright && npx playwright install chromium
// Then, with `npm run dev` already running on :3000:
//   node scripts/capture-screenshots.mjs

import { chromium } from "playwright";
import path from "node:path";
import fs from "node:fs";

const BASE_URL = "http://localhost:3000";
const OUT_DIR = path.resolve(process.cwd(), "docs/screenshots");
fs.mkdirSync(OUT_DIR, { recursive: true });

async function capture() {
  const browser = await chromium.launch({
    args: [
      "--use-gl=swiftshader",
      "--enable-webgl",
      "--ignore-gpu-blocklist",
      "--enable-unsafe-swiftshader",
    ],
  });

  // --- Desktop shots (1280x800) ---
  const desktopContext = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2,
  });
  const page = await desktopContext.newPage();
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(3000); // let 3D canvases / animations settle

  const heroSection = page.locator("section").first();
  await heroSection.screenshot({
    path: path.join(OUT_DIR, "hero.png"),
  });
  console.log("Saved hero.png");

  const playground = page.locator("#playground");
  await playground.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500); // let the 3D canvas mount + settle after scroll
  await playground.screenshot({
    path: path.join(OUT_DIR, "odontogram-playground.png"),
  });
  console.log("Saved odontogram-playground.png");

  const roiCalculator = page.locator("#roi-calculator");
  await roiCalculator.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await roiCalculator.screenshot({
    path: path.join(OUT_DIR, "roi-calculator.png"),
  });
  console.log("Saved roi-calculator.png");

  await desktopContext.close();

  // --- Mobile full-page shot (375px wide) ---
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(BASE_URL, { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(3000);
  await mobilePage.screenshot({
    path: path.join(OUT_DIR, "mobile-responsive.png"),
    fullPage: true,
  });
  console.log("Saved mobile-responsive.png");

  await mobileContext.close();
  await browser.close();
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
