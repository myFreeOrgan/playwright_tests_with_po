const { expect } = require('@playwright/test');
const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class CheckoutCompletePage extends BaseSwagLabPage {
    url = '/checkout-complete.html';

    get thankYouMessage() { return this.page.locator('h2.complete-header'); }

    get dispatchMessage() { return this.page.locator('div.complete-text'); }

    get backHomeButton() { return this.page.locator('#back-to-products'); }

    async verifyThankYouMessage() {
        await expect(this.thankYouMessage).toBeVisible();
        await expect(this.thankYouMessage).toHaveText('Thank you for your order!');
    }

    async verifyDispatchMessage() {
        await expect(this.dispatchMessage).toBeVisible();
        await expect(this.dispatchMessage).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    }

    async clickBackHome() {
        await this.backHomeButton.click();
    }
}
