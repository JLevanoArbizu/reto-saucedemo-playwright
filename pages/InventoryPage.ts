import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly cartIcon: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    }

    async addToCart(productName: string) {
        // Buscamos el ítem por texto y luego el botón interno que empieza con add-to-cart
        const product = this.page.locator('[data-test="inventory-item"]', { hasText: productName });
        await product.locator('button[id^="add-to-cart"]').click();
    }

    async goToCart() {
        await this.cartIcon.click();
    }
}