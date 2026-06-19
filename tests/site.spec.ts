import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/index.html");
});

test("page loads with RTL Arabic and correct title", async ({ page }) => {
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.locator("html")).toHaveAttribute("lang", "ar");
  await expect(page).toHaveTitle(/ورد الشوق/);
});

test("hero headline and primary CTA are visible", async ({ page }) => {
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.getByRole("link", { name: /اطلب باقتك الآن/ }).first()).toBeVisible();
});

test("Google rating 4.7 (459) is cited", async ({ page }) => {
  await expect(page.getByText(/4\.7/).first()).toBeVisible();
  await expect(page.getByText(/459/).first()).toBeVisible();
});

test("all images reference existing files and have alt", async ({ page }) => {
  const imgs = page.locator("img");
  const count = await imgs.count();
  expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i++) {
    const img = imgs.nth(i);
    await expect(img).toHaveAttribute("alt");
    const natural = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
    expect(natural, `image ${i} should load`).toBeGreaterThan(0);
  }
});

test("no horizontal scroll at 390px", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  expect(overflow).toBeLessThanOrEqual(1);
});

test("full-screen mobile menu opens and closes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.locator("#burger").click();
  const menu = page.locator("#mobileMenu");
  await expect(menu).toHaveClass(/open/);
  // covers full viewport
  const box = await menu.boundingBox();
  expect(box!.width).toBeGreaterThanOrEqual(389);
  await page.locator("#mmClose").click();
  await expect(menu).not.toHaveClass(/open/);
});

test("order form validates required fields", async ({ page }) => {
  await page.locator("#orderForm button[type=submit]").click();
  await expect(page.locator("#name").locator("..")).toHaveClass(/invalid/);
});

test("order form builds wa.me link and saves to localStorage", async ({ page, context }) => {
  await page.locator("#name").fill("سارة المطيري");
  await page.locator("#phone").fill("0561112769");
  await page.locator("#type").selectOption({ label: "باقة ورد" });
  const popupPromise = context.waitForEvent("page");
  await page.locator("#orderForm button[type=submit]").click();
  const popup = await popupPromise;
  expect(popup.url()).toContain("wa.me/966561112769");
  const saved = await page.evaluate(() => localStorage.getItem("ward_alshouq_orders"));
  expect(saved).toContain("سارة المطيري");
});

test("gallery lightbox opens on click", async ({ page }) => {
  await page.locator(".gallery-grid figure").first().click();
  await expect(page.locator("#lightbox")).toHaveClass(/open/);
});

test("scroll-reveal elements become visible", async ({ page }) => {
  await page.locator("#services").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1800);
  const hidden = await page.locator(".reveal:not(.in), .bloom:not(.in)").count();
  expect(hidden).toBe(0);
});

test("JSON-LD Florist schema with aggregateRating present", async ({ page }) => {
  const ld = await page.locator('script[type="application/ld+json"]').textContent();
  expect(ld).toContain('"@type": "Florist"');
  expect(ld).toContain('"ratingValue": "4.7"');
  expect(ld).toContain('"reviewCount": "459"');
});
