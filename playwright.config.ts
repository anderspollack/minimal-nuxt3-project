import { fileURLToPath } from 'node:url'
import { defineConfig, devices } from '@playwright/test'
import type { ConfigOptions } from '@nuxt/test-utils/playwright'

export default defineConfig<ConfigOptions>({
  // Fail the build on CI if `test.only` in found in the source code
  forbidOnly: !!process.env.CI,
  // Run tests in files in parallel
  fullyParallel: true,
  // Retry on CI only
  retries: process.env.CI ? 2 : 0,  testDir: './tests',
  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  // @see https://playwright.dev/docs/test-reporters
  reporter: 'html',
  /**
    * Shared settings for all of the projects below
    * @see https://playwright.dev/docs/api/class-testoptions
    */
  use: {
    // Base URL to use in actions @example `await page.goto('/')`
    baseURL: `${process.env.NUXT_SITE_URL}`,
    // Collect trace when retrying the failed test
    trace: 'on-first-retry',
  },
  /**
   * Run the local dev server before starting the test runner
   * @see https://playwright.dev/docs/test-webserver#configuring-a-web-server
   */
  webServer: {
    command: 'npm run start',
    reuseExistingServer: !process.env.CI,
    url: `${process.env.NUXT_SITE_URL}`
  },
  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,
})
