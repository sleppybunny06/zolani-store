import { test, expect } from '@playwright/test';

test.describe('ZOLANI Ethnic Indian Fashion Website', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Homepage - Ethnic Collections Showcase', () => {
    test('should display ZOLANI brand and ethnic tagline', async ({ page }) => {
      // Verify main branding
      await expect(page.getByRole('link', { name: 'ZOLANI Home' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'ZOLANI' })).toBeVisible();
      
      // Verify ethnic-focused tagline
      await expect(page.getByText('Where tradition meets effortless modernity')).toBeVisible();
    });

    test('should display ethnic hero carousel with Indian collections', async ({ page }) => {
      // Check for ethnic collection names in hero section
      const heroCollections = [
        'Royal Banarasi Collection',
        'Festive Anarkalis', 
        'Handcrafted Lehengas'
      ];

      // Wait for carousel to be loaded
      await expect(page.locator('[data-testid="hero-section"], .hero-carousel, section').first()).toBeVisible();
      
      for (const collection of heroCollections) {
        // Try to find the collection name anywhere on the page during carousel navigation
        const collectionVisible = page.getByText(collection);
        
        // Navigate through slides to find the collection
        let found = false;
        for (let i = 0; i < 3; i++) {
          if (await collectionVisible.isVisible()) {
            found = true;
            break;
          }
          
          // Click next slide if available
          const nextButton = page.locator('button').filter({ hasText: /next|arrow|slide/i }).or(page.locator('[aria-label*="next"], [aria-label*="slide"]')).first();
          if (await nextButton.isVisible()) {
            await nextButton.click();
            await page.waitForTimeout(1000); // Wait for transition
          }
        }
        
        expect(found, `${collection} should be visible in hero carousel`).toBeTruthy();
      }
    });

    test('should display ethnic product categories in featured collections', async ({ page }) => {
      // Verify ethnic collections are displayed
      await expect(page.getByText('Royal Silks')).toBeVisible();
      await expect(page.getByText('Bridal Heritage')).toBeVisible();
      await expect(page.getByText('Artisan Crafts')).toBeVisible();
      
      // Check for authentic descriptions
      await expect(page.getByText(/Authentic Banarasi and Kanjivaram sarees/i)).toBeVisible();
      await expect(page.getByText(/Exquisite lehengas, anarkalis, and shararas/i)).toBeVisible();
      await expect(page.getByText(/Block prints, Ajrakh patterns, and Kalamkari/i)).toBeVisible();
    });

    test('should display ethnic products in bestsellers section', async ({ page }) => {
      // Check for specific ethnic product names
      const ethnicProducts = [
        'Royal Banarasi Silk Saree',
        'Chanderi Silk Kurta Set',
        'Embroidered Anarkali Suit',
        'Handloom Cotton Lehenga',
        'Kalamkari Print Palazzo Set'
      ];

      for (const product of ethnicProducts) {
        await expect(page.getByText(product)).toBeVisible();
      }

      // Verify Indian pricing format
      await expect(page.getByText('₹12,990')).toBeVisible();
      await expect(page.getByText('₹4,990')).toBeVisible();
    });
  });

  test.describe('Shop Page - Ethnic Product Filtering', () => {
    test.beforeEach(async ({ page }) => {
      await page.click('a[href="/shop"]');
      await expect(page.getByRole('heading', { name: 'Shop All' })).toBeVisible();
    });

    test('should display all 20 ethnic products', async ({ page }) => {
      // Verify product count
      await expect(page.getByText('Showing 20 products')).toBeVisible();
      
      // Verify some key ethnic products are displayed
      await expect(page.getByText('Royal Banarasi Silk Saree')).toBeVisible();
      await expect(page.getByText('Kanjivaram Wedding Saree')).toBeVisible();
      await expect(page.getByText('Mirror Work Ghagra Choli')).toBeVisible();
    });

    test('should filter products by ethnic categories', async ({ page }) => {
      // Test Sarees filter
      await page.check('input[type="checkbox"][value="Sarees"], [data-filter="Sarees"], [name="Sarees"]');
      
      // Wait for filter to apply
      await page.waitForTimeout(1000);
      
      // Verify Saree products are visible
      await expect(page.getByText('Royal Banarasi Silk Saree')).toBeVisible();
      await expect(page.getByText('Bandhani Chiffon Saree')).toBeVisible();
      
      // Clear filter and test Anarkalis
      await page.click('button:has-text("Clear All")');
      await page.waitForTimeout(500);
      
      await page.check('input[type="checkbox"][value="Anarkalis"], [data-filter="Anarkalis"], [name="Anarkalis"]');
      await page.waitForTimeout(1000);
      
      await expect(page.getByText('Embroidered Anarkali Suit')).toBeVisible();
    });

    test('should filter by traditional Indian fabrics', async ({ page }) => {
      // Test Banarasi Silk filter
      const banarasisilkFilter = page.locator('input[type="checkbox"]').filter({ hasText: /Banarasi Silk/i }).first()
        .or(page.locator('label:has-text("Banarasi Silk") input[type="checkbox"]'))
        .or(page.getByRole('checkbox', { name: /Banarasi Silk/i }));
      
      if (await banarasisilkFilter.isVisible()) {
        await banarasisilkFilter.check();
        await page.waitForTimeout(1000);
        
        // Verify Banarasi products appear
        await expect(page.getByText('Royal Banarasi Silk Saree')).toBeVisible();
      }
      
      // Clear and test Chanderi
      await page.click('button:has-text("Clear All")');
      await page.waitForTimeout(500);
      
      const chanderiFilter = page.locator('input[type="checkbox"]').filter({ hasText: /Chanderi/i }).first()
        .or(page.locator('label:has-text("Chanderi") input[type="checkbox"]'))
        .or(page.getByRole('checkbox', { name: /Chanderi/i }));
      
      if (await chanderiFilter.isVisible()) {
        await chanderiFilter.check();
        await page.waitForTimeout(1000);
        
        await expect(page.getByText('Chanderi Silk Kurta Set')).toBeVisible();
      }
    });

    test('should filter by Indian occasions', async ({ page }) => {
      // Test Wedding occasion filter
      const weddingFilter = page.getByRole('checkbox', { name: /Wedding/i }).first()
        .or(page.locator('input[type="checkbox"][value="Wedding"]'))
        .or(page.locator('label:has-text("Wedding") input[type="checkbox"]'));
      
      if (await weddingFilter.isVisible()) {
        await weddingFilter.check();
        await page.waitForTimeout(1000);
        
        // Wedding-appropriate products should be visible
        await expect(page.getByText('Kanjivaram Wedding Saree')).toBeVisible();
      }
      
      // Test Sangeet filter
      await page.click('button:has-text("Clear All")');
      await page.waitForTimeout(500);
      
      const sangeetFilter = page.getByRole('checkbox', { name: /Sangeet/i }).first()
        .or(page.locator('input[type="checkbox"][value="Sangeet"]'))
        .or(page.locator('label:has-text("Sangeet") input[type="checkbox"]'));
      
      if (await sangeetFilter.isVisible()) {
        await sangeetFilter.check();
        await page.waitForTimeout(1000);
        
        // Sangeet-appropriate products should appear
        expect(await page.locator('.product-card, [data-testid="product"]').count()).toBeGreaterThan(0);
      }
    });

    test('should have working product interactions', async ({ page }) => {
      // Test Add to Bag functionality
      const addToBagButton = page.getByRole('button', { name: 'Add to Bag' }).first();
      await expect(addToBagButton).toBeVisible();
      await addToBagButton.click();
      
      // Verify shopping bag counter increases (should show at least 1)
      const bagCounter = page.locator('[data-testid="cart-count"], .cart-counter, .bag-counter').first()
        .or(page.locator('button:has-text("Shopping bag") + *:has-text(/\\d+/)'))
        .or(page.locator('[aria-label*="Shopping bag"] *:has-text(/\\d+/)'));
      
      if (await bagCounter.isVisible()) {
        await expect(bagCounter).not.toHaveText('0');
      }
      
      // Test wishlist functionality
      const wishlistButton = page.getByRole('button', { name: 'Add to wishlist' }).first();
      await expect(wishlistButton).toBeVisible();
      await wishlistButton.click();
      
      // Verify wishlist counter increases
      const wishlistCounter = page.locator('[data-testid="wishlist-count"], .wishlist-counter').first()
        .or(page.locator('button:has-text("Wishlist") + *:has-text(/\\d+/)'))
        .or(page.locator('[aria-label*="Wishlist"] *:has-text(/\\d+/)'));
      
      if (await wishlistCounter.isVisible()) {
        await expect(wishlistCounter).not.toHaveText('0');
      }
    });
  });

  test.describe('Product Details - Ethnic Items', () => {
    test('should display detailed ethnic product information', async ({ page }) => {
      // Navigate to a specific ethnic product
      await page.goto('/shop');
      await page.click('a[href="/product/1"], .product-card:has-text("Royal Banarasi Silk Saree") a');
      
      // Verify we're on product page
      await expect(page.getByText('Royal Banarasi Silk Saree')).toBeVisible();
      
      // Check for ethnic-specific details
      await expect(page.getByText(/₹12,990|₹15,900/)).toBeVisible();
      
      // Verify rating is displayed
      const ratingElement = page.locator('[data-testid="rating"], .rating, .stars').first()
        .or(page.getByText(/4\\.9|\\(4\\.9\\)|★/));
      
      await expect(ratingElement).toBeVisible();
    });

    test('should allow quantity selection and cart addition', async ({ page }) => {
      await page.goto('/product/1');
      
      // Find and interact with quantity selector if available
      const quantityInput = page.locator('input[type="number"], .quantity-input, [data-testid="quantity"]').first();
      if (await quantityInput.isVisible()) {
        await quantityInput.fill('2');
      }
      
      // Add to cart
      const addToCartButton = page.getByRole('button', { name: /Add to Cart|Add to Bag/i }).first();
      await expect(addToCartButton).toBeVisible();
      await addToCartButton.click();
    });
  });

  test.describe('Navigation and User Experience', () => {
    test('should navigate between different pages smoothly', async ({ page }) => {
      // Test main navigation
      const navLinks = [
        { name: 'Shop', url: '/shop' },
        { name: 'Collections', url: '/collections' },
        { name: 'About', url: '/about' },
        { name: 'Contact', url: '/contact' }
      ];

      for (const link of navLinks) {
        await page.click(`a[href="${link.url}"]`);
        await page.waitForURL(`**${link.url}`);
        await expect(page).toHaveURL(new RegExp(link.url));
        
        // Return to home for next iteration
        if (link.url !== '/contact') {
          await page.goto('/');
        }
      }
    });

    test('should display proper Indian cultural content on About page', async ({ page }) => {
      await page.goto('/about');
      
      // Check for cultural and heritage content
      await expect(page.getByText(/heritage|craftsmanship|artisan|tradition/i)).toBeVisible();
      
      // Verify the page loads completely
      await expect(page.getByRole('heading')).toBeVisible();
    });

    test('should be responsive on mobile devices', async ({ page, isMobile }) => {
      if (isMobile) {
        // Verify mobile navigation works
        await expect(page.getByRole('navigation')).toBeVisible();
        
        // Check that product grid adapts to mobile
        await page.goto('/shop');
        const productGrid = page.locator('.product-grid, [data-testid="products"], .grid').first();
        await expect(productGrid).toBeVisible();
        
        // Verify products are still accessible on mobile
        await expect(page.getByText('Royal Banarasi Silk Saree')).toBeVisible();
      }
    });
  });

  test.describe('Performance and Accessibility', () => {
    test('should load homepage within reasonable time', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/');
      await expect(page.getByText('ZOLANI')).toBeVisible();
      const loadTime = Date.now() - startTime;
      
      // Expect page to load within 5 seconds
      expect(loadTime).toBeLessThan(5000);
    });

    test('should have accessible form elements', async ({ page }) => {
      await page.goto('/contact');
      
      // Check for proper form labels and accessibility
      const inputs = page.locator('input, textarea, select');
      const inputCount = await inputs.count();
      
      if (inputCount > 0) {
        for (let i = 0; i < inputCount; i++) {
          const input = inputs.nth(i);
          const isVisible = await input.isVisible();
          
          if (isVisible) {
            // Check if input has proper labeling or aria attributes
            const hasLabel = await input.locator('+ label, ~ label').count() > 0;
            const hasAriaLabel = await input.getAttribute('aria-label');
            const hasPlaceholder = await input.getAttribute('placeholder');
            
            expect(
              hasLabel || hasAriaLabel || hasPlaceholder,
              'Input should have proper labeling for accessibility'
            ).toBeTruthy();
          }
        }
      }
    });
  });

  test.describe('Search and Filtering Edge Cases', () => {
    test('should handle multiple filter combinations', async ({ page }) => {
      await page.goto('/shop');
      
      // Apply multiple filters
      const sareeFilter = page.getByRole('checkbox', { name: /Sarees/i });
      if (await sareeFilter.isVisible()) {
        await sareeFilter.check();
      }
      
      const silkFilter = page.getByRole('checkbox', { name: /Silk/i });
      if (await silkFilter.isVisible()) {
        await silkFilter.check();
      }
      
      await page.waitForTimeout(1000);
      
      // Should show filtered results
      const productCount = await page.locator('.product-card, [data-testid="product"]').count();
      expect(productCount).toBeGreaterThanOrEqual(1);
    });

    test('should handle price range filtering', async ({ page }) => {
      await page.goto('/shop');
      
      // Find and interact with price slider if available
      const priceSlider = page.locator('input[type="range"], .slider, [data-testid="price-slider"]').first();
      if (await priceSlider.isVisible()) {
        // Set a price range
        await priceSlider.fill('5000');
        await page.waitForTimeout(1000);
        
        // Verify products in price range are shown
        const productCount = await page.locator('.product-card, [data-testid="product"]').count();
        expect(productCount).toBeGreaterThanOrEqual(1);
      }
    });
  });
});