import { test, expect } from '@playwright/test';

test.describe('Reel Section E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/shop');
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
    // Scroll to the reel section
    await page.locator('h2:has-text("Style Stories")').scrollIntoView();
  });

  test('should display the reel section with correct title and description', async ({ page }) => {
    // Verify section heading
    await expect(page.locator('h2:has-text("Style Stories")')).toBeVisible();
    
    // Verify section description
    await expect(page.locator('text=Discover the artistry behind our collections and get inspired by authentic Indian fashion')).toBeVisible();
  });

  test('should show the first reel by default with correct content', async ({ page }) => {
    // Verify the first reel is displayed (1/5)
    await expect(page.locator('text=1 / 5')).toBeVisible();
    
    // Verify first reel title
    await expect(page.locator('h3:has-text("Royal Banarasi Collection")')).toBeVisible();
    
    // Verify first reel description
    await expect(page.locator('text=Experience the grandeur of handwoven Banarasi silk sarees with intricate gold zari work')).toBeVisible();
    
    // Verify product information
    await expect(page.locator('text=Heritage Banarasi Silk Saree')).toBeVisible();
    await expect(page.locator('text=₹12,500')).toBeVisible();
    
    // Verify social stats
    await expect(page.locator('text=15.8k')).toBeVisible(); // views
    await expect(page.locator('text=2.4k')).toBeVisible(); // likes
  });

  test('should navigate to next reel when clicking right arrow', async ({ page }) => {
    // Click the next reel button
    await page.locator('button:has-text("→")').click();
    
    // Verify we moved to second reel (2/5)
    await expect(page.locator('text=2 / 5')).toBeVisible();
    
    // Verify second reel content
    await expect(page.locator('h3:has-text("Festive Lehenga Styling")')).toBeVisible();
    await expect(page.locator('text=Transform your wedding look with our exquisite hand-embroidered lehengas')).toBeVisible();
    
    // Verify updated product information
    await expect(page.locator('text=Bridal Heritage Lehenga')).toBeVisible();
    await expect(page.locator('text=₹28,900')).toBeVisible();
    
    // Verify updated social stats
    await expect(page.locator('text=22.1k')).toBeVisible(); // views
    await expect(page.locator('text=3.2k')).toBeVisible(); // likes
  });

  test('should navigate to previous reel when clicking left arrow', async ({ page }) => {
    // First go to next reel
    await page.locator('button:has-text("→")').click();
    await expect(page.locator('text=2 / 5')).toBeVisible();
    
    // Then go back to previous reel
    await page.locator('button:has-text("←")').click();
    
    // Verify we're back to first reel
    await expect(page.locator('text=1 / 5')).toBeVisible();
    await expect(page.locator('h3:has-text("Royal Banarasi Collection")')).toBeVisible();
  });

  test('should cycle through all 5 reels', async ({ page }) => {
    const reelData = [
      { index: '1 / 5', title: 'Royal Banarasi Collection', product: 'Heritage Banarasi Silk Saree', price: '₹12,500' },
      { index: '2 / 5', title: 'Festive Lehenga Styling', product: 'Bridal Heritage Lehenga', price: '₹28,900' },
      { index: '3 / 5', title: 'Artisan Craft Process', product: 'Handcrafted Anarkali Set', price: '₹8,750' },
      { index: '4 / 5', title: 'Contemporary Kurta Styling', product: 'Contemporary Kurta Set', price: '₹4,200' },
      { index: '5 / 5', title: 'Palazzo Set Collection', product: 'Elegant Palazzo Set', price: '₹3,800' }
    ];

    for (let i = 0; i < reelData.length; i++) {
      const reel = reelData[i];
      
      // Verify current reel content
      await expect(page.locator(`text=${reel.index}`)).toBeVisible();
      await expect(page.locator(`h3:has-text("${reel.title}")`)).toBeVisible();
      await expect(page.locator(`text=${reel.product}`)).toBeVisible();
      await expect(page.locator(`text=${reel.price}`)).toBeVisible();
      
      // Navigate to next reel (except on last reel)
      if (i < reelData.length - 1) {
        await page.locator('button:has-text("→")').click();
        await page.waitForTimeout(100); // Brief wait for UI update
      }
    }

    // Verify cycling back to first reel
    await page.locator('button:has-text("→")').click();
    await expect(page.locator('text=1 / 5')).toBeVisible();
  });

  test('should interact with like button', async ({ page }) => {
    // Get initial like count
    const likeButton = page.locator('button').filter({ hasText: '2.4k' }).first();
    
    // Click the like button
    await likeButton.click();
    
    // Verify the button was clicked (it should become active/focused)
    await expect(likeButton).toBeFocused();
  });

  test('should interact with share button', async ({ page }) => {
    const shareButton = page.locator('button').filter({ hasText: 'Share' });
    
    // Verify share button is visible and clickable
    await expect(shareButton).toBeVisible();
    await shareButton.click();
    
    // Verify the button was clicked
    await expect(shareButton).toBeFocused();
  });

  test('should display Shop Now button and be clickable', async ({ page }) => {
    const shopNowButton = page.locator('button:has-text("Shop Now")');
    
    // Verify button is visible and has correct styling
    await expect(shopNowButton).toBeVisible();
    await expect(shopNowButton).toHaveClass(/bg-luxury-gold/);
    
    // Click the button
    await shopNowButton.click();
    
    // Verify button interaction
    await expect(shopNowButton).toBeFocused();
  });

  test('should display sidebar reel thumbnails on desktop', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });
    
    // Verify left sidebar thumbnails (first 3 reels)
    await expect(page.locator('button').filter({ hasText: 'Royal Banarasi Collection' })).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'Festive Lehenga Styling' })).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'Artisan Craft Process' })).toBeVisible();
    
    // Verify right sidebar thumbnails (last 2 reels)
    await expect(page.locator('button').filter({ hasText: 'Contemporary Kurta Styling' })).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'Palazzo Set Collection' })).toBeVisible();
  });

  test('should allow clicking sidebar thumbnails to change reels', async ({ page }) => {
    // Set desktop viewport to ensure sidebar is visible
    await page.setViewportSize({ width: 1200, height: 800 });
    
    // Click on "Festive Lehenga Styling" thumbnail
    await page.locator('button').filter({ hasText: 'Festive Lehenga Styling' }).click();
    
    // Verify we switched to the second reel
    await expect(page.locator('text=2 / 5')).toBeVisible();
    await expect(page.locator('h3:has-text("Festive Lehenga Styling")')).toBeVisible();
    
    // Click on "Contemporary Kurta Styling" thumbnail
    await page.locator('button').filter({ hasText: 'Contemporary Kurta Styling' }).click();
    
    // Verify we switched to the fourth reel
    await expect(page.locator('text=4 / 5')).toBeVisible();
    await expect(page.locator('h3:has-text("Contemporary Kurta Styling")')).toBeVisible();
  });

  test('should display mobile navigation dots on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Scroll to reel section again (viewport change might affect scroll position)
    await page.locator('h2:has-text("Style Stories")').scrollIntoView();
    
    // Wait for mobile layout to adjust
    await page.waitForTimeout(500);
    
    // Look for navigation dots container
    const dotsContainer = page.locator('.flex.justify-center.mt-8.lg\\:hidden');
    await expect(dotsContainer).toBeVisible();
    
    // Count navigation dots (should be 5 for 5 reels)
    const dots = dotsContainer.locator('button');
    await expect(dots).toHaveCount(5);
  });

  test('should handle video controls', async ({ page }) => {
    // Verify mute button is present
    const muteButton = page.locator('button').filter({ has: page.locator('svg') }).first();
    await expect(muteButton).toBeVisible();
    
    // Look for video element (might be hidden until interaction)
    const videoElement = page.locator('video').first();
    if (await videoElement.isVisible()) {
      // Verify video attributes
      await expect(videoElement).toHaveAttribute('playsInline');
      await expect(videoElement).toHaveAttribute('loop');
      await expect(videoElement).toHaveAttribute('muted');
    }
  });

  test('should maintain responsive design across different viewports', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667 },   // Mobile
      { width: 768, height: 1024 },  // Tablet
      { width: 1200, height: 800 },  // Desktop
      { width: 1920, height: 1080 }  // Large Desktop
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.locator('h2:has-text("Style Stories")').scrollIntoView();
      await page.waitForTimeout(300);
      
      // Verify section is visible
      await expect(page.locator('h2:has-text("Style Stories")')).toBeVisible();
      
      // Verify main video player is visible
      await expect(page.locator('text=1 / 5')).toBeVisible();
      
      // Verify navigation buttons are functional
      await page.locator('button:has-text("→")').click();
      await expect(page.locator('text=2 / 5')).toBeVisible();
      
      // Go back to first reel for next viewport test
      await page.locator('button:has-text("←")').click();
    }
  });

  test('should integrate properly with shop page layout', async ({ page }) => {
    // Verify reel section appears after products grid
    const productsGrid = page.locator('.grid').filter({ hasText: 'Royal Banarasi Silk Saree' });
    const reelSection = page.locator('h2:has-text("Style Stories")');
    
    await expect(productsGrid).toBeVisible();
    await expect(reelSection).toBeVisible();
    
    // Verify reel section has proper spacing and styling
    await expect(reelSection.locator('xpath=ancestor::section')).toHaveClass(/py-16/);
    await expect(reelSection.locator('xpath=ancestor::section')).toHaveClass(/bg-gradient-to-br/);
  });

  test('should handle rapid navigation between reels', async ({ page }) => {
    // Rapidly navigate through reels
    for (let i = 0; i < 10; i++) {
      await page.locator('button:has-text("→")').click();
      await page.waitForTimeout(50); // Very brief wait
    }
    
    // Should still be on a valid reel (cycling back to beginning)
    await expect(page.locator('text=1 / 5')).toBeVisible();
    
    // Verify content is still correct
    await expect(page.locator('h3:has-text("Royal Banarasi Collection")')).toBeVisible();
  });

  test('should preserve state during reel navigation', async ({ page }) => {
    // Navigate to third reel
    await page.locator('button:has-text("→")').click();
    await page.locator('button:has-text("→")').click();
    
    await expect(page.locator('text=3 / 5')).toBeVisible();
    await expect(page.locator('h3:has-text("Artisan Craft Process")')).toBeVisible();
    
    // Click like button
    const likeButton = page.locator('button').filter({ hasText: '1.8k' }).first();
    await likeButton.click();
    
    // Navigate away and back
    await page.locator('button:has-text("→")').click();
    await page.locator('button:has-text("←")').click();
    
    // Verify we're back on the third reel
    await expect(page.locator('text=3 / 5')).toBeVisible();
    await expect(page.locator('h3:has-text("Artisan Craft Process")')).toBeVisible();
  });
});