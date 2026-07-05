const path = require("path");

const playwrightPath = process.env.FILADELFIA_PLAYWRIGHT_PATH ||
  path.join(process.env.TEMP || "", "filadelfia-playwright", "node_modules", "playwright");
const { chromium } = require(playwrightPath);

const baseUrl = process.env.FILADELFIA_BASE_URL || "http://127.0.0.1:8080/";
const chromePath = process.env.FILADELFIA_CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const login = process.env.FILADELFIA_TEST_LOGIN;
const password = process.env.FILADELFIA_TEST_PASSWORD;

if (!login || !password) {
  throw new Error("Defina FILADELFIA_TEST_LOGIN e FILADELFIA_TEST_PASSWORD antes de rodar o smoke test.");
}

const routes = ["home", "access", "members", "churches", "events", "finance", "messages", "mobile", "settings"];

async function runViewport(viewport, isMobile) {
  const browser = await chromium.launch({ headless: true, executablePath: chromePath });
  const page = await browser.newPage({ viewport, isMobile });
  const errors = [];

  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await page.route("https://nominatim.openstreetmap.org/**", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify([{ lat: "-22.826800", lon: "-43.063400", display_name: "Filadelfia - Sede" }])
    });
  });

  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.fill('#loginForm [name="email"]', login);
  await page.fill('#loginForm [name="password"]', password);
  await page.click('#loginForm button[type="submit"]');
  await page.waitForSelector("#adminApp:not([hidden])", { timeout: 15000 });

  for (const route of routes) {
    await page.evaluate((view) => window.activateView?.(view), route);
    await page.waitForTimeout(250);
    const visible = await page.locator(`#${route}.is-visible`).count();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    if (!visible) throw new Error(`View nao ficou visivel: ${route}`);
    if (overflow) throw new Error(`Overflow horizontal em ${route} (${viewport.width}px)`);
  }

  await page.evaluate(() => window.activateView?.("churches"));
  await page.evaluate(() => window.openChurchFormFromButton?.({ preventDefault() {}, stopPropagation() {} }));
  await page.fill('#churchForm [name="address"]', "Rua Teste, 123, Centro");
  await page.fill('#churchForm [name="city"]', "Sao Goncalo");
  await page.fill('#churchForm [name="state"]', "RJ");
  await page.click("#locateChurchButton");
  await page.waitForFunction(() => document.querySelector('#churchForm [name="lat"]').value.length > 0);

  await page.click("#closeChurchFormButton");
  await page.click("#openMemberAppButton");
  await page.waitForSelector("#memberLogoutButton", { state: "visible" });
  await page.click("#memberLogoutButton");
  await page.waitForSelector("#authScreen:not([hidden])");

  await browser.close();
  return { viewport, routes: routes.length, errors };
}

(async () => {
  const result = {
    desktop: await runViewport({ width: 1440, height: 900 }, false),
    mobile: await runViewport({ width: 390, height: 844 }, true)
  };

  const errors = [...result.desktop.errors, ...result.mobile.errors];
  if (errors.length) {
    throw new Error(`Erros de console: ${errors.join(" | ")}`);
  }

  console.log(JSON.stringify(result, null, 2));
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
