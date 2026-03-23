import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly completeHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.postalCode = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.completeHeader = page.locator('[data-test="complete-header"]');
    }

    async fillInformation(name: string, last: string, postalCode: string) {
        await this.firstName.fill(name);
        await this.lastName.fill(last);
        await this.postalCode.fill(postalCode);
        await this.continueButton.click();
    }

    async finishOrder() {
        await this.finishButton.click();
    }
}