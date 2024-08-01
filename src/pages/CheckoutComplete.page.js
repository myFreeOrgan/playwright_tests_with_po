const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class CheckoutCompletePage extends BaseSwagLabPage {
    url = '/checkout-complete.html';

    get thankYouMessage() { return this.page.locator('h2.complete-header'); }

    get dispatchMessage() { return this.page.locator('div.complete-text'); }

    get backHomeButton() { return this.page.locator('#back-to-products'); }

    async clickBackHome() {
        await this.backHomeButton.click();
    }
}
