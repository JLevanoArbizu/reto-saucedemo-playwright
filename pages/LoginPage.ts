import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly userInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async navigate() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(user: string, pass: string) {
        await this.userInput.fill(user);
        await this.passwordInput.fill(pass);
        await this.loginButton.click();
    }
}