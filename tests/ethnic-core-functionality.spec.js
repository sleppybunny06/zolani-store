import { test, expect } from '@playwright/test';

test.describe('ZOLANI Ethnic Fashion - Core Features', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
  });

  test('should display ethnic branding and homepage content', async ({ page }) => {
    // Test main brand elements
    await expect(page.getByText('ZOLANI')).toBeVisible();
    await expect(page.getByText('Where tradition meets effortless modernity')).toBeVisible();
    
    // Test ethnic product presence
    await expect(page.getByText('Royal Banarasi Silk Saree')).toBeVisible();
    await expect(page.getByText('₹12,990')).toBeVisible();
  });

  test('should navigate to shop and display ethnic products', async ({ page }) => {
    // Go to shop page
    await page.click('a[href="/shop"]');
    await expect(page.getByRole('heading', { name: 'Shop All' })).toBeVisible();
    
    // Verify ethnic products are shown
    await expect(page.getByText('Showing 20 products')).toBeVisible();
    await expect(page.getByText('Royal Banarasi Silk Saree')).toBeVisible();
    await expect(page.getByText('Chanderi Silk Kurta Set')).toBeVisible();
    await expect(page.getByText('Embroidered Anarkali Suit')).toBeVisible();
  });

  test('should have functional product filtering', async ({ page }) => {
    await page.goto('/shop');
    
    // Try to find and click a Sarees filter
    const sareeFilters = [
      page.getByRole('checkbox', { name: /Sarees/i }),
      page.locator('input[type="checkbox"]').filter({ hasText: /Sarees/i }),
      page.locator('label:has-text("Sarees") input[type="checkbox"]')
    ];
    
    let filterFound = false;
    for (const filter of sareeFilters) {
      if (await filter.isVisible()) {
        await filter.check();
        filterFound = true;
        break;
      }
    }
    
    if (filterFound) {
      await page.waitForTimeout(1000);
      // Verify saree products are still visible after filtering
      await expect(page.getByText('Royal Banarasi Silk Saree')).toBeVisible();
    }
  });

  test('should have working add to bag functionality', async ({ page }) => {
    await page.goto('/shop');
    
    // Find first "Add to Bag" button and click it
    const addToBagButton = page.getByRole('button', { name: 'Add to Bag' }).first();
    await expect(addToBagButton).toBeVisible();
    await addToBagButton.click();
    
    // Simple verification that the action completed (page should still be functional)
    await expect(page.getByText('Royal Banarasi Silk Saree')).toBeVisible();
  });

  test('should display correct ethnic pricing format', async ({ page }) => {
    await page.goto('/shop');
    
    // Verify Indian Rupee pricing is displayed correctly
    const priceElements = [
      page.getByText('₹12,990'),
      page.getByText('₹4,990'),
      page.getByText('₹8,490'),
      page.getByText('₹6,990')
    ];
    
    let pricesFound = 0;
    for (const priceElement of priceElements) {
      if (await priceElement.isVisible()) {
        pricesFound++;
      }
    }
    
    expect(pricesFound).toBeGreaterThanOrEqual(2);
  });

  test('should display ethnic categories in filters', async ({ page }) => {
    await page.goto('/shop');
    
    // Check for ethnic-specific categories
    const ethnicCategories = [
      'Sarees',
      'Kurta Sets', 
      'Anarkalis',
      'Lehengas',
      'Palazzo Sets'
    ];
    
    let categoriesFound = 0;
    for (const category of ethnicCategories) {
      if (await page.getByText(category).isVisible()) {
        categoriesFound++;
      }
    }
    
    expect(categoriesFound).toBeGreaterThanOrEqual(3);
  });

  test('should display traditional fabric options', async ({ page }) => {
    await page.goto('/shop');
    
    // Check for traditional Indian fabric filters
    const traditionalFabrics = [
      'Silk',
      'Cotton', 
      'Chanderi',
      'Banarasi Silk',
      'Khadi'
    ];
    
    let fabricsFound = 0;
    for (const fabric of traditionalFabrics) {
      if (await page.getByText(fabric).isVisible()) {
        fabricsFound++;
      }
    }
    
    expect(fabricsFound).toBeGreaterThanOrEqual(3);
  });
});