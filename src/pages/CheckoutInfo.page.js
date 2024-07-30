const { BaseSwagLabPage } = require('./BaseSwagLab.page');
const { CheckoutOverviewPage } = require('./CheckoutOverview.page');

export class CheckoutInfoPage extends BaseSwagLabPage {
    url = '/checkout-step-one.html';

    get firstName() { return this.page.locator('#first-name'); }

    get lastName() { return this.page.locator('#last-name'); }

    get postalCode() { return this.page.locator('#postal-code'); }

    get continueButton() { return this.page.locator('#continue'); }

    get cancelButton() { return this.page.locator('#cancel'); }

    async fillInfo(firstName, lastName, postalCode) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);
    }

    async clickContinue() {
        await this.continueButton.click();
        return new CheckoutOverviewPage(this.page);
    }
}
