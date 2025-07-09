import { test, expect } from '@chromatic-com/playwright';
import paths from './paths.js';

const hostname = process.env.CHROMATIC_TEST_URL;

/**
 * Convert a URL pathname string to kebab case string
 * @param  {string}  pathname  A URL pathname string
 * @return  {string}  A test name string
 */
const getTestNameFromPath = (pathname) => {
  if (pathname === '/') return 'Home';
  const name = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  return name.slice(1).replaceAll('/', '-');
};

test.use({ delay: 1000, ignoreSelectors: ['.a-ribbon', '.g-header', '.g-footer'] });

paths.forEach((pathname) => {
  const url = new URL(pathname, hostname).toString();
  test(getTestNameFromPath(pathname), async ({ page }) => {
    await page.goto(url);
    await page.click('.g-alert__close');
    await expect(page).toHaveURL(url);
  });
});
