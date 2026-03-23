import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    getProductLocator(productName: string): Locator {
        return this.page.locator('[data-test="inventory-item-name"]', { hasText: productName });
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }
}