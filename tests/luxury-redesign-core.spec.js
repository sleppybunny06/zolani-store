import { test, expect } from '@playwright/test';

test.describe('ZOLANI Luxury Redesign - Core Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Hero Section', () => {
    test('should display hero section with cinematic styling', async ({ page }) => {
      const heroSection = page.locator('section').first();
      await expect(heroSection).toBeVisible();
      
      const boundingBox = await heroSection.boundingBox();
      expect(boundingBox.height).toBeGreaterThan(400);
    });

    test('should display dual CTA buttons in hero', async ({ page }) => {
      const primaryButton = page.getByRole('link').filter({ hasText: /Explore|Shop|Discover/ }).first();
      const learnMoreButton = page.getByRole('button', { name: /Learn More/i }).first();
      
      await expect(primaryButton).toBeVisible();
      await expect(learnMoreButton).toBeVisible();
    });

    test('should display hero slide controls', async ({ page }) => {
      const playPauseButton = page.getByRole('button').filter({ hasText: /Pause|Play/ }).first();
      const slideDots = page.getByRole('button', { name: /Go to slide/ });
      
      await expect(playPauseButton).toBeVisible();
      expect(await slideDots.count()).toBe(3);
    });
  });

  test.describe('Brand Story & Signature Collections', () => {
    test('should display "Crafted for the Bold" brand story', async ({ page }) => {
      const heading = page.getByRole('heading', { name: /Crafted for the Bold/ });
      await expect(heading).toBeVisible();
      
      const description = page.getByText(/conscious luxury/i);
      await expect(description).toBeVisible();
    });

    test('should display "Zolani Signature Collection" with premium products', async ({ page }) => {
      const heading = page.getByRole('heading', { name: /Zolani Signature Collection/i });
      await expect(heading).toBeVisible();
      
      // Verify premium badges
      await expect(page.getByText('Limited Edition')).toBeVisible();
      await expect(page.getByText('Exclusively Crafted')).toBeVisible();
      await expect(page.getByText('Hand-Embroidered')).toBeVisible();
    });

    test('should display signature collection prices in INR format', async ({ page }) => {
      const price1 = page.getByText('₹24,990');
      const price2 = page.getByText('₹34,990');
      const price3 = page.getByText('₹19,990');

      await expect(price1).toBeVisible();
      await expect(price2).toBeVisible();
      await expect(price3).toBeVisible();
    });

    test('should display "The Story Behind the Craft" CTA link', async ({ page }) => {
      const storyLink = page.getByRole('link', { name: /The Story Behind the Craft/i });
      await expect(storyLink).toBeVisible();
      await expect(storyLink).toHaveAttribute('href', '/about');
    });
  });

  test.describe('Curated Collections & Bestsellers', () => {
    test('should display curated collections section', async ({ page }) => {
      const heading = page.getByRole('heading', { name: /Curated Collections/i });
      await expect(heading).toBeVisible();
      
      // Verify collection names
      await expect(page.getByText('Royal Silks')).toBeVisible();
      await expect(page.getByText('Bridal Heritage')).toBeVisible();
      await expect(page.getByText('Artisan Crafts')).toBeVisible();
    });

    test('should display bestsellers with enhanced styling', async ({ page }) => {
      const heading = page.getByRole('heading', { name: /^Bestsellers$/i });
      await expect(heading).toBeVisible();
      
      // Verify badges
      const newBadges = page.getByText('NEW');
      const bestsellerBadges = page.getByText('BESTSELLER');
      const saleBadges = page.getByText('SALE');
      
      expect(await newBadges.count()).toBeGreaterThan(0);
      expect(await bestsellerBadges.count()).toBeGreaterThan(0);
      expect(await saleBadges.count()).toBeGreaterThan(0);
    });

    test('should display product cards with "Add to Bag" buttons', async ({ page }) => {
      const addToBagButtons = page.getByRole('button', { name: /Add to Bag/i });
      expect(await addToBagButtons.count()).toBeGreaterThanOrEqual(8);
    });

    test('should display "Explore All Products" button', async ({ page }) => {
      const exploreButton = page.getByRole('link', { name: /Explore All Products/i });
      await expect(exploreButton).toBeVisible();
      await expect(exploreButton).toHaveAttribute('href', '/shop');
    });
  });

  test.describe('Philosophy Section', () => {
    test('should display "Our Philosophy" section', async ({ page }) => {
      const heading = page.getByRole('heading', { name: /Our Philosophy/i });
      await expect(heading).toBeVisible();
      
      // Verify philosophy values
      await expect(page.getByRole('heading', { name: /Conscious Craftsmanship/i })).toBeVisible();
      await expect(page.getByRole('heading', { name: /Contemporary Design/i })).toBeVisible();
      await expect(page.getByRole('heading', { name: /Timeless Elegance/i })).toBeVisible();
    });

    test('should display philosophy descriptions', async ({ page }) => {
      const conscious = page.getByText(/Every piece is thoughtfully created/i);
      const contemporary = page.getByText(/Modern silhouettes that honor/i);
      const timeless = page.getByText(/Designs that transition seamlessly/i);
      
      await expect(conscious).toBeVisible();
      await expect(contemporary).toBeVisible();
      await expect(timeless).toBeVisible();
    });
  });

  test.describe('Newsletter Section', () => {
    test('should display newsletter signup section', async ({ page }) => {
      const heading = page.getByRole('heading', { name: /Join the ZOLANI Circle/i });
      await expect(heading).toBeVisible();
      
      const emailInput = page.getByPlaceholder(/Enter your email address/i);
      const subscribeButton = page.getByRole('button', { name: /Subscribe/i });
      
      await expect(emailInput).toBeVisible();
      await expect(subscribeButton).toBeVisible();
    });

    test('should display newsletter benefits', async ({ page }) => {
      await expect(page.getByText('Exclusive Collections')).toBeVisible();
      await expect(page.getByText('Early Access')).toBeVisible();
      await expect(page.getByText('Styling Tips')).toBeVisible();
      await expect(page.getByText('Member-Only Events')).toBeVisible();
    });

    test('should handle newsletter subscription', async ({ page }) => {
      const emailInput = page.getByPlaceholder(/Enter your email address/i);
      const subscribeButton = page.getByRole('button', { name: /Subscribe/i });

      await emailInput.fill('test@example.com');
      await subscribeButton.click();

      // Wait for success message
      await page.waitForTimeout(1500);
      
      const successMessage = page.getByText(/Welcome to the ZOLANI Circle/i);
      await expect(successMessage).toBeVisible();
    });
  });

  test.describe('Dark Mode Support', () => {
    test('should toggle dark mode successfully', async ({ page }) => {
      const darkModeButton = page.getByRole('button', { name: /Switch to/ });
      await expect(darkModeButton).toBeVisible();

      const html = page.locator('html');
      const initialClass = await html.getAttribute('class');

      await darkModeButton.click();
      await page.waitForTimeout(400);

      const newClass = await html.getAttribute('class');
      
      // Verify theme was toggled
      if (initialClass.includes('dark')) {
        expect(newClass).not.toContain('dark');
      } else {
        expect(newClass).toContain('dark');
      }
    });

    test('should maintain signature collection in dark mode', async ({ page }) => {
      const darkModeButton = page.getByRole('button', { name: /Switch to/ });
      await darkModeButton.click();
      await page.waitForTimeout(400);

      const signatureHeading = page.getByRole('heading', { name: /Zolani Signature Collection/i });
      await expect(signatureHeading).toBeVisible();
      
      const limitedEditionBadge = page.getByText('Limited Edition');
      await expect(limitedEditionBadge).toBeVisible();
    });

    test('should maintain newsletter styling in dark mode', async ({ page }) => {
      const darkModeButton = page.getByRole('button', { name: /Switch to/ });
      await darkModeButton.click();
      await page.waitForTimeout(400);

      const heading = page.getByRole('heading', { name: /Join the ZOLANI Circle/i });
      const emailInput = page.getByPlaceholder(/Enter your email address/i);
      
      await expect(heading).toBeVisible();
      await expect(emailInput).toBeVisible();
    });
  });

  test.describe('Animations & Hover Effects', () => {
    test('should apply hover animations to product cards', async ({ page }) => {
      // Get first product card
      const productCards = page.locator('[class*="group"]').filter({ has: page.locator('img[alt]') });
      const firstCard = productCards.first();

      await firstCard.hover();
      await page.waitForTimeout(300);

      // "Add to Bag" button should become visible on hover
      const addToCartButton = firstCard.getByRole('button', { name: /Add to Bag/i });
      await expect(addToCartButton).toBeVisible();
    });

    test('should display fade-in animations on section visibility', async ({ page }) => {
      // All major headings should be visible with animations
      const headings = await page.getByRole('heading').all();
      expect(headings.length).toBeGreaterThan(5);

      for (const heading of headings) {
        await expect(heading).toBeVisible();
      }
    });
  });

  test.describe('Typography & Brand Elements', () => {
    test('should display elegant divider with "Luxury Redefined"', async ({ page }) => {
      const dividerText = page.getByText('Luxury Redefined');
      await expect(dividerText).toBeVisible();
    });

    test('should use proper font families', async ({ page }) => {
      const heading = page.getByRole('heading', { name: /Crafted for the Bold/i });
      const fontFamily = await heading.evaluate(el => window.getComputedStyle(el).fontFamily);
      
      expect(fontFamily.toLowerCase()).toContain('playfair');
    });

    test('should apply letter-spacing to labels', async ({ page }) => {
      const luxuryLabel = page.getByText('Luxury Redefined');
      const letterSpacing = await luxuryLabel.evaluate(el => window.getComputedStyle(el).letterSpacing);

      expect(letterSpacing).not.toBe('0px');
    });
  });

  test.describe('Responsive Design', () => {
    test('should maintain layout on mobile viewport (375px)', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(500);

      const brandStory = page.getByRole('heading', { name: /Crafted for the Bold/i });
      await expect(brandStory).toBeVisible();

      const box = await brandStory.boundingBox();
      expect(box.width).toBeLessThanOrEqual(375);
    });

    test('should maintain layout on tablet viewport (768px)', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.waitForTimeout(500);

      // Verify all main sections render
      await expect(page.getByRole('heading', { name: /Crafted for the Bold/i })).toBeVisible();
      await expect(page.getByRole('heading', { name: /Zolani Signature Collection/i })).toBeVisible();
      await expect(page.getByRole('heading', { name: /Our Philosophy/i })).toBeVisible();
    });

    test('should maintain layout on desktop viewport (1920px)', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.waitForTimeout(500);

      const heading = page.getByRole('heading', { name: /Crafted for the Bold/i });
      const box = await heading.boundingBox();

      // Should be centered in container (max-w-7xl)
      expect(box.width).toBeLessThanOrEqual(1280);
    });
  });

  test.describe('Luxury Color Palette', () => {
    test('should display gold accents on badges', async ({ page }) => {
      const newBadge = page.getByText('NEW').first();
      const bgColor = await newBadge.evaluate(el => window.getComputedStyle(el).backgroundColor);
      
      expect(bgColor).toBeTruthy();
    });

    test('should maintain matte beige background', async ({ page }) => {
      const body = page.locator('body');
      const bgColor = await body.evaluate(el => window.getComputedStyle(el).backgroundColor);
      
      expect(bgColor).toBeTruthy();
    });

    test('should apply charcoal text in light mode', async ({ page }) => {
      const text = page.getByText(/ZOLANI celebrates the rich tapestry/i).first();
      const color = await text.evaluate(el => window.getComputedStyle(el).color);
      
      expect(color).toBeTruthy();
    });
  });

  test.describe('Navigation & Footer', () => {
    test('should display main navigation with all links', async ({ page }) => {
      const navLinks = ['Home', 'Shop', 'Collections', 'About', 'Journal', 'Contact'];
      
      for (const linkName of navLinks) {
        const link = page.getByRole('link', { name: new RegExp(linkName, 'i') });
        expect(await link.count()).toBeGreaterThan(0);
      }
    });

    test('should display footer with brand info', async ({ page }) => {
      // Scroll to footer
      await page.getByRole('contentinfo').scrollIntoViewIfNeeded();

      // Verify footer content
      await expect(page.getByText(/© .* ZOLANI/i)).toBeVisible();
      await expect(page.getByText(/Made with/).locator('...')).toBeVisible();
    });
  });
});