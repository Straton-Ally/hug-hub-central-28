import { expect, test } from "@playwright/test";

test("cookie choices are saved and can be reopened from the footer", async ({ page }) => {
  await page.goto("/");

  const preferences = page.getByRole("region", { name: "Cookie preferences" });
  await expect(preferences).toBeVisible();
  await page.getByRole("button", { name: "Manage choices" }).click();

  await expect(page.getByLabel("Necessary", { exact: false })).toBeChecked();
  await expect(page.getByLabel("Necessary", { exact: false })).toBeDisabled();
  await page.getByLabel("Analytics", { exact: false }).check();
  await page.getByRole("button", { name: "Save choices" }).click();
  await expect(preferences).toBeHidden();

  await page.reload();
  await page.waitForLoadState("networkidle");
  await expect(preferences).toBeHidden();
  await page.getByRole("button", { name: "Cookie settings" }).click();
  await expect(preferences).toBeVisible();
  await expect(page.getByLabel("Analytics", { exact: false })).toBeChecked();
});
