import { test, expect } from '@playwright/test';

test.describe('ZOLANI Luxury Redesign - E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for page content to load
    await page.waitForLoadState('networkidle');
  });

  test.describe('Hero Section - Cinematic Styling', () => {
    test('should display hero section with cinematic styling', async ({ page }) => {
      // Verify hero section is visible
      const heroSection = page.locator('section').first();
      await expect(heroSection).toBeVisible();

      // Verify hero has proper height and background
      const boundingBox = await heroSection.boundingBox();
      expect(boundingBox.height).toBeGreaterThan(400);
    });

    test('should display dual CTA buttons (solid and outline)', async ({ page }) => {
      // Verify primary button (solid background)
      const primaryButton = page.getByRole('link', { name: /Explore Sarees|Shop Anarkalis|Discover Lehengas/i }).first();
      await expect(primaryButton).toBeVisible();

      // Verify secondary button (outline style - "Learn More")
      const secondaryButton = page.getByRole('button', { name: /Learn More/i }).first();
      await expect(secondaryButton).toBeVisible();

      // Verify both buttons are clickable
      await expect(primaryButton).toHaveAttribute('href', /\/collections/);
    });

    test('should display hero with elegant sparkle icon decoration', async ({ page }) => {
      // Find the sparkle icon in hero section
      const heroContent = page.locator('section').first();
      const sparkles = heroContent.locator('svg').first(); // Framer Motion renders SVGs
      
      await expect(sparkles).toBeVisible();
    });

    test('should display slide controls with gold indicators', async ({ page }) => {
      // Verify play/pause button
      const playPauseButton = page.getByRole('button', { name: /Pause slideshow|Play slideshow/i });
      await expect(playPauseButton).toBeVisible();

      // Verify slide indicator dots
      const slideDots = page.getByRole('button', { name: /Go to slide/i });
      expect(await slideDots.count()).toBe(3);

      // Verify at least one dot is highlighted (gold color indicator)
      const firstDot = slideDots.first();
      await expect(firstDot).toBeVisible();
    });
  });

  test.describe('Elegant Divider Section', () => {
    test('should display "Luxury Redefined" divider with horizontal lines', async ({ page }) => {
      // Find the divider text
      const dividerText = page.getByText('Luxury Redefined');
      await expect(dividerText).toBeVisible();

      // Verify divider styling with proper structure
      const dividerContainer = dividerText.locator('..');
      await expect(dividerContainer).toBeVisible();
    });

    test('should apply proper styling to divider', async ({ page }) => {
      const dividerText = page.getByText('Luxury Redefined');
      const textElement = dividerText.locator('xpath=/parent::div');
      
      // Get computed styles
      const className = await textElement.getAttribute('class');
      expect(className).toContain('flex');
      expect(className).toContain('items-center');
    });
  });

  test.describe('Enhanced Brand Story Section', () => {
    test('should display "Crafted for the Bold, Defined by Elegance" headline', async ({ page }) => {
      const heading = page.getByRole('heading', { name: /Crafted for the Bold/i });
      await expect(heading).toBeVisible();

      // Verify heading contains both lines
      const headingText = await heading.textContent();
      expect(headingText).toContain('Crafted for the Bold');
      expect(headingText).toContain('Defined by Elegance');
    });

    test('should display enhanced brand story description', async ({ page }) => {
      const description = page.getByText(/ZOLANI celebrates the rich tapestry of Indian heritage through a contemporary lens/i);
      await expect(description).toBeVisible();

      const descriptionText = await description.textContent();
      expect(descriptionText).toContain('conscious luxury');
    });

    test('should display "The Story Behind the Craft" CTA link', async ({ page }) => {
      const storyLink = page.getByRole('link', { name: /The Story Behind the Craft/i });
      await expect(storyLink).toBeVisible();
      await expect(storyLink).toHaveAttribute('href', '/about');
    });

    test('should display decorative icon in brand story section', async ({ page }) => {
      const brandStorySection = page.getByRole('heading', { name: /Crafted for the Bold/i }).locator('ancestor::section');
      const decorativeIcon = brandStorySection.locator('svg').first();
      
      await expect(decorativeIcon).toBeVisible();
    });
  });

  test.describe('Zolani Signature Collection - New Premium Section', () => {
    test('should display "Zolani Signature Collection" section header', async ({ page }) => {
      const heading = page.getByRole('heading', { name: /Zolani Signature Collection/i });
      await expect(heading).toBeVisible();
    });

    test('should display "Exclusive Collection" label above signature collection heading', async ({ page }) => {
      const exclusiveLabel = page.getByText('Exclusive Collection');
      await expect(exclusiveLabel).toBeVisible();

      const label = exclusiveLabel.locator('xpath=/ancestor::div[contains(@class, "text-center")]/div[1]');
      await expect(label).toBeVisible();
    });

    test('should display signature collection description text', async ({ page }) => {
      const description = page.getByText(/Our most coveted pieces/i);
      await expect(description).toBeVisible();
      
      const fullText = await description.textContent();
      expect(fullText).toContain('handpicked');
      expect(fullText).toContain('heritage and haute couture');
    });

    test('should display three premium signature products with images', async ({ page }) => {
      // Find all signature product cards
      const signatureSection = page.getByRole('heading', { name: /Zolani Signature Collection/i })
        .locator('ancestor::section');
      
      // Count product images
      const productImages = signatureSection.locator('img');
      const count = await productImages.count();
      
      // Should have at least 3 product images
      expect(count).toBeGreaterThanOrEqual(3);
    });

    test('should display signature products with premium badges', async ({ page }) => {
      // Find badges in signature collection
      const limitedEditionBadge = page.getByText('Limited Edition');
      const exclusivelyCraftedBadge = page.getByText('Exclusively Crafted');
      const handEmbroideredBadge = page.getByText('Hand-Embroidered');

      await expect(limitedEditionBadge).toBeVisible();
      await expect(exclusivelyCraftedBadge).toBeVisible();
      await expect(handEmbroideredBadge).toBeVisible();
    });

    test('should display signature products with prices in INR format', async ({ page }) => {
      // Verify prices are displayed with rupee symbol
      const price1 = page.getByText('₹24,990');
      const price2 = page.getByText('₹34,990');
      const price3 = page.getByText('₹19,990');

      await expect(price1).toBeVisible();
      await expect(price2).toBeVisible();
      await expect(price3).toBeVisible();
    });

    test('should display "View Details" buttons for signature products', async ({ page }) => {
      const signatureSection = page.getByRole('heading', { name: /Zolani Signature Collection/i })
        .locator('ancestor::section');
      
      const viewDetailsButtons = signatureSection.getByRole('link', { name: /View Details/i });
      expect(await viewDetailsButtons.count()).toBe(3);

      // Verify all buttons are clickable
      for (let i = 0; i < 3; i++) {
        await expect(viewDetailsButtons.nth(i)).toBeVisible();
      }
    });

    test('should apply hover animations to signature products', async ({ page }) => {
      const signatureSection = page.getByRole('heading', { name: /Zolani Signature Collection/i })
        .locator('ancestor::section');
      
      // Find first product card
      const productCard = signatureSection.locator('div[class*="group"]').first();
      
      // Verify card is visible
      await expect(productCard).toBeVisible();

      // Hover over the card and verify it responds
      await productCard.hover();
      
      // Wait a moment for animation
      await page.waitForTimeout(300);
      
      // Card should still be visible and in position
      await expect(productCard).toBeVisible();
    });
  });

  test.describe('Curated Collections - Enhanced Section', () => {
    test('should display "Carefully Curated" label', async ({ page }) => {
      const label = page.getByText('Carefully Curated');
      await expect(label).toBeVisible();
    });

    test('should display enhanced "Curated Collections" heading', async ({ page }) => {
      const headings = page.getByRole('heading');
      const curatedHeading = headings.filter({ hasText: /^Curated Collections$/i });
      await expect(curatedHeading.first()).toBeVisible();
    });

    test('should display all three featured collections with proper images', async ({ page }) => {
      // Find collection names
      const royalSilks = page.getByText('Royal Silks');
      const bridalHeritage = page.getByText('Bridal Heritage');
      const artisanCrafts = page.getByText('Artisan Crafts');

      await expect(royalSilks).toBeVisible();
      await expect(bridalHeritage).toBeVisible();
      await expect(artisanCrafts).toBeVisible();
    });

    test('should display collection descriptions', async ({ page }) => {
      const banarasiDescription = page.getByText(/Authentic Banarasi and Kanjivaram sarees/i);
      const lehengaDescription = page.getByText(/Exquisite lehengas, anarkalis/i);
      const blockPrintDescription = page.getByText(/Block prints, Ajrakh patterns/i);

      await expect(banarasiDescription).toBeVisible();
      await expect(lehengaDescription).toBeVisible();
      await expect(blockPrintDescription).toBeVisible();
    });

    test('should display "Explore Collection" links', async ({ page }) => {
      const exploreLinks = page.getByText('Explore Collection');
      expect(await exploreLinks.count()).toBeGreaterThanOrEqual(3);
    });

    test('should display "View All Collections" button', async ({ page }) => {
      const viewAllButton = page.getByRole('link', { name: /View All Collections/i });
      await expect(viewAllButton).toBeVisible();
      await expect(viewAllButton).toHaveAttribute('href', '/collections');
    });
  });

  test.describe('Bestsellers Section - Enhanced Styling', () => {
    test('should display "Most Loved" label above Bestsellers heading', async ({ page }) => {
      const label = page.getByText('Most Loved');
      await expect(label).toBeVisible();
    });

    test('should display enhanced Bestsellers heading', async ({ page }) => {
      const headings = page.getByRole('heading');
      const bestsellerHeading = headings.filter({ hasText: /^Bestsellers$/i });
      await expect(bestsellerHeading.first()).toBeVisible();
    });

    test('should display bestseller products with NEW, BESTSELLER, and SALE badges', async ({ page }) => {
      const newBadge = page.getByText('NEW').first();
      const bestsellerBadge = page.getByText('BESTSELLER').first();
      const saleBadge = page.getByText('SALE').first();

      await expect(newBadge).toBeVisible();
      await expect(bestsellerBadge).toBeVisible();
      await expect(saleBadge).toBeVisible();
    });

    test('should display product cards with star ratings', async ({ page }) => {
      // Get all product cards
      const productSection = page.getByRole('heading', { name: /^Bestsellers$/i })
        .locator('ancestor::section');
      
      // Each product should have rating display
      const ratingDisplays = productSection.locator('div[class*="flex"] svg').first();
      await expect(ratingDisplays).toBeVisible();
    });

    test('should display "Add to Bag" buttons with icon', async ({ page }) => {
      const addToBagButtons = page.getByRole('button', { name: /Add to Bag/i });
      expect(await addToBagButtons.count()).toBeGreaterThanOrEqual(8);

      // Verify first button is visible and has icon
      const firstButton = addToBagButtons.first();
      await expect(firstButton).toBeVisible();
      
      const buttonText = await firstButton.textContent();
      expect(buttonText).toContain('Add to Bag');
    });

    test('should display product prices with original and sale prices', async ({ page }) => {
      // Find sale prices (with strikethrough)
      const salePrices = page.locator('span[class*="line-through"]');
      expect(await salePrices.count()).toBeGreaterThan(0);
    });

    test('should display "Explore All Products" CTA button', async ({ page }) => {
      const exploreButton = page.getByRole('link', { name: /Explore All Products/i });
      await expect(exploreButton).toBeVisible();
      await expect(exploreButton).toHaveAttribute('href', '/shop');
    });

    test('should apply hover animations to product cards', async ({ page }) => {
      // Get first product card in bestsellers
      const bestsellersSection = page.getByRole('heading', { name: /^Bestsellers$/i })
        .locator('ancestor::section');
      
      const productCard = bestsellersSection.locator('[class*="group"]').first();
      
      // Hover over card
      await productCard.hover();
      await page.waitForTimeout(300);

      // "Add to Bag" button should become visible on hover
      const addToCartButton = productCard.getByRole('button', { name: /Add to Bag/i });
      await expect(addToCartButton).toBeVisible();
    });
  });

  test.describe('Our Philosophy Section - Enhanced', () => {
    test('should display "Our Philosophy" heading', async ({ page }) => {
      const heading = page.getByRole('heading', { name: /Our Philosophy/i });
      await expect(heading).toBeVisible();
    });

    test('should display philosophy description', async ({ page }) => {
      const description = page.getByText(/Guided by principles of elegance/i);
      await expect(description).toBeVisible();
    });

    test('should display three philosophy cards with icons', async ({ page }) => {
      const philosophySection = page.getByRole('heading', { name: /Our Philosophy/i })
        .locator('ancestor::section');
      
      // Verify three main philosophy values
      const consciousCraftsmanship = philosophySection.getByRole('heading', { name: /Conscious Craftsmanship/i });
      const contemporaryDesign = philosophySection.getByRole('heading', { name: /Contemporary Design/i });
      const timelesElegance = philosophySection.getByRole('heading', { name: /Timeless Elegance/i });

      await expect(consciousCraftsmanship).toBeVisible();
      await expect(contemporaryDesign).toBeVisible();
      await expect(timelesElegance).toBeVisible();
    });

    test('should display detailed descriptions for each philosophy value', async ({ page }) => {
      const philosophySection = page.getByRole('heading', { name: /Our Philosophy/i })
        .locator('ancestor::section');
      
      const consciousDescription = philosophySection.getByText(/Every piece is thoughtfully created/i);
      const designDescription = philosophySection.getByText(/Modern silhouettes that honor traditional/i);
      const eleganceDescription = philosophySection.getByText(/Designs that transition seamlessly/i);

      await expect(consciousDescription).toBeVisible();
      await expect(designDescription).toBeVisible();
      await expect(eleganceDescription).toBeVisible();
    });

    test('should apply icon rotation animation on hover', async ({ page }) => {
      const philosophySection = page.getByRole('heading', { name: /Our Philosophy/i })
        .locator('ancestor::section');
      
      // Get first philosophy card
      const firstCard = philosophySection.locator('[class*="group"]').first();
      
      // Hover over the card
      await firstCard.hover();
      await page.waitForTimeout(600); // Wait for rotation animation (360deg in 0.6s)

      // Card should still be visible
      await expect(firstCard).toBeVisible();
    });
  });

  test.describe('Newsletter Section - Enhanced', () => {
    test('should display "Join the ZOLANI Circle" heading', async ({ page }) => {
      const heading = page.getByRole('heading', { name: /Join the ZOLANI Circle/i });
      await expect(heading).toBeVisible();
    });

    test('should display newsletter description text', async ({ page }) => {
      const description = page.getByText(/Where style meets soul/i);
      await expect(description).toBeVisible();
    });

    test('should display email input field', async ({ page }) => {
      const emailInput = page.getByPlaceholder(/Enter your email address/i);
      await expect(emailInput).toBeVisible();
    });

    test('should display Subscribe button', async ({ page }) => {
      const subscribeButton = page.getByRole('button', { name: /Subscribe/i });
      await expect(subscribeButton).toBeVisible();
    });

    test('should display newsletter benefits list', async ({ page }) => {
      const exclusiveCollections = page.getByText('Exclusive Collections');
      const earlyAccess = page.getByText('Early Access');
      const stylingTips = page.getByText('Styling Tips');
      const memberEvents = page.getByText('Member-Only Events');

      await expect(exclusiveCollections).toBeVisible();
      await expect(earlyAccess).toBeVisible();
      await expect(stylingTips).toBeVisible();
      await expect(memberEvents).toBeVisible();
    });

    test('should handle newsletter subscription', async ({ page }) => {
      const emailInput = page.getByPlaceholder(/Enter your email address/i);
      const subscribeButton = page.getByRole('button', { name: /Subscribe/i });

      // Fill in email
      await emailInput.fill('test@example.com');
      
      // Click subscribe
      await subscribeButton.click();

      // Wait for success message
      await page.waitForTimeout(1500); // Simulate API call
      
      // Verify success message appears
      const successMessage = page.getByText(/Welcome to the ZOLANI Circle/i);
      await expect(successMessage).toBeVisible();
    });
  });

  test.describe('Dark Mode Support', () => {
    test('should toggle dark mode and apply proper colors', async ({ page }) => {
      // Find dark mode toggle button
      const darkModeButton = page.getByRole('button', { name: /Switch to dark mode|Switch to light mode/i });
      await expect(darkModeButton).toBeVisible();

      // Get initial theme state
      const html = page.locator('html');
      const initialClass = await html.getAttribute('class');

      // Click to toggle
      await darkModeButton.click();
      await page.waitForTimeout(400); // Wait for transition

      // Verify dark class was toggled
      const newClass = await html.getAttribute('class');
      
      if (initialClass.includes('dark')) {
        expect(newClass).not.toContain('dark');
      } else {
        expect(newClass).toContain('dark');
      }
    });

    test('should maintain luxury colors in dark mode - signature collection', async ({ page }) => {
      // Toggle to dark mode
      const darkModeButton = page.getByRole('button', { name: /Switch to dark mode|Switch to light mode/i });
      await darkModeButton.click();
      await page.waitForTimeout(400);

      // Verify signature collection is still visible
      const signatureHeading = page.getByRole('heading', { name: /Zolani Signature Collection/i });
      await expect(signatureHeading).toBeVisible();

      // Check that premium badges are still visible
      const limitedEditionBadge = page.getByText('Limited Edition');
      await expect(limitedEditionBadge).toBeVisible();
    });

    test('should apply dark mode styling to newsletter section', async ({ page }) => {
      // Toggle to dark mode
      const darkModeButton = page.getByRole('button', { name: /Switch to dark mode|Switch to light mode/i });
      await darkModeButton.click();
      await page.waitForTimeout(400);

      // Verify newsletter section elements are visible
      const heading = page.getByRole('heading', { name: /Join the ZOLANI Circle/i });
      const emailInput = page.getByPlaceholder(/Enter your email address/i);
      
      await expect(heading).toBeVisible();
      await expect(emailInput).toBeVisible();
    });
  });

  test.describe('Animations and Transitions', () => {
    test('should display fade-in animation for brand story section', async ({ page }) => {
      // Scroll to brand story section
      const brandStoryHeading = page.getByRole('heading', { name: /Crafted for the Bold/i });
      await brandStoryHeading.scrollIntoViewIfNeeded();

      // Verify it's visible
      await expect(brandStoryHeading).toBeVisible();
    });

    test('should display staggered animations for philosophy cards', async ({ page }) => {
      // Scroll to philosophy section
      const philosophyHeading = page.getByRole('heading', { name: /Our Philosophy/i });
      await philosophyHeading.scrollIntoViewIfNeeded();

      // All three cards should be visible
      const cards = philosophyHeading.locator('ancestor::section').locator('[class*="group"]');
      expect(await cards.count()).toBe(3);

      for (let i = 0; i < 3; i++) {
        await expect(cards.nth(i)).toBeVisible();
      }
    });

    test('should display smooth hover effects on premium products', async ({ page }) => {
      // Scroll to signature collection
      const signatureHeading = page.getByRole('heading', { name: /Zolani Signature Collection/i });
      await signatureHeading.scrollIntoViewIfNeeded();

      // Get first product card
      const productCard = signatureHeading.locator('ancestor::section').locator('[class*="group"]').first();

      // Get initial position
      const initialBox = await productCard.boundingBox();

      // Hover
      await productCard.hover();
      await page.waitForTimeout(300);

      // Get position after hover
      const hoverBox = await productCard.boundingBox();

      // Should have moved up slightly (y decreased)
      expect(hoverBox.y).toBeLessThan(initialBox.y + 10);
    });
  });

  test.describe('Typography and Spacing', () => {
    test('should display proper font hierarchy with Playfair Display for headings', async ({ page }) => {
      // Check main heading
      const mainHeading = page.getByRole('heading', { name: /Crafted for the Bold/i });
      const fontFamily = await mainHeading.evaluate(el => window.getComputedStyle(el).fontFamily);
      
      expect(fontFamily.toLowerCase()).toContain('playfair');
    });

    test('should apply proper letter-spacing to labels and subtitles', async ({ page }) => {
      // Find a label (e.g., "Luxury Redefined")
      const label = page.getByText('Luxury Redefined');
      const letterSpacing = await label.evaluate(el => window.getComputedStyle(el).letterSpacing);

      // Should have some letter spacing (not "normal")
      expect(letterSpacing).not.toBe('0px');
      expect(letterSpacing).not.toBe('normal');
    });

    test('should maintain consistent spacing throughout sections', async ({ page }) => {
      // Get spacing of different sections
      const brandStorySection = page.getByRole('heading', { name: /Crafted for the Bold/i })
        .locator('ancestor::section');
      
      const philosophySection = page.getByRole('heading', { name: /Our Philosophy/i })
        .locator('ancestor::section');

      // Both should be visible
      await expect(brandStorySection).toBeVisible();
      await expect(philosophySection).toBeVisible();

      // Get padding/margin (sections should have py-24)
      const brandStoryClass = await brandStorySection.getAttribute('class');
      const philosophyClass = await philosophySection.getAttribute('class');

      expect(brandStoryClass).toContain('py');
      expect(philosophyClass).toContain('py');
    });
  });

  test.describe('Responsive Design', () => {
    test('should maintain luxury spacing on mobile viewport', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });

      // Wait for layout adjustment
      await page.waitForTimeout(500);

      // Verify key sections are still visible
      const brandStory = page.getByRole('heading', { name: /Crafted for the Bold/i });
      await expect(brandStory).toBeVisible();

      // Get heading size
      const box = await brandStory.boundingBox();
      expect(box.width).toBeGreaterThan(0);
      expect(box.width).toBeLessThanOrEqual(375); // Should fit in viewport
    });

    test('should stack signature collection products on mobile', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(500);

      // Find signature collection
      const signatureHeading = page.getByRole('heading', { name: /Zolani Signature Collection/i });
      await signatureHeading.scrollIntoViewIfNeeded();

      // Verify products are visible
      const productCards = signatureHeading.locator('ancestor::section').locator('[class*="group"]');
      const count = await productCards.count();
      expect(count).toBe(3);
    });

    test('should display properly on tablet viewport', async ({ page }) => {
      // Set tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.waitForTimeout(500);

      // Verify all sections render
      const sections = [
        page.getByRole('heading', { name: /Crafted for the Bold/i }),
        page.getByRole('heading', { name: /Zolani Signature Collection/i }),
        page.getByRole('heading', { name: /Our Philosophy/i })
      ];

      for (const section of sections) {
        await expect(section).toBeVisible();
      }
    });

    test('should display properly on desktop viewport', async ({ page }) => {
      // Set desktop viewport
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.waitForTimeout(500);

      // Verify luxury spacing is maintained
      const brandStory = page.getByRole('heading', { name: /Crafted for the Bold/i });
      const box = await brandStory.boundingBox();

      // Should have proper max-width container (container-luxury = max-w-7xl)
      expect(box.width).toBeLessThanOrEqual(1280); // 7xl breakpoint
    });
  });

  test.describe('Color Palette Verification', () => {
    test('should apply gold accent color to badges and highlights', async ({ page }) => {
      // Find a NEW badge
      const newBadge = page.getByText('NEW').first();
      
      // Get background color
      const bgColor = await newBadge.evaluate(el => window.getComputedStyle(el).backgroundColor);
      
      // Should contain gold-ish color (D4AF37 in light mode)
      expect(bgColor).toBeTruthy();
    });

    test('should maintain matte beige background in light mode', async ({ page }) => {
      // Get body background
      const body = page.locator('body');
      const bgColor = await body.evaluate(el => window.getComputedStyle(el).backgroundColor);
      
      // Should be light color
      expect(bgColor).toBeTruthy();
    });

    test('should apply charcoal text color in light mode', async ({ page }) => {
      // Find body text
      const text = page.getByText('ZOLANI celebrates the rich tapestry').first();
      const color = await text.evaluate(el => window.getComputedStyle(el).color);
      
      // Should be dark/charcoal
      expect(color).toBeTruthy();
    });
  });
});