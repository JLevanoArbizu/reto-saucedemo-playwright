// hooks.ts

import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { chromium, Browser, Page, BrowserContext } from '@playwright/test';

let browser: Browser;
let page: Page;
let context: BrowserContext;

BeforeAll(async function () {
    browser = await chromium.launch({ headless: false });
});

Before(async function () {
    context = await browser.newContext();
    page = await context.newPage();
    this.page = page;
});

After(async function () {
    await this.page.close();
    await context.close();
});

AfterAll(async function () {
    await browser.close();
});