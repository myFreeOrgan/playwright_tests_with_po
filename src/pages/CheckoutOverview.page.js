/* eslint-disable no-undef */
const { expect } = require('@playwright/test');
const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class CheckoutOverviewPage extends BaseSwagLabPage {
    url = '/checkout-step-two.html';

    get itemNames() { return this.page.locator('.inventory_item_name'); }

    get itemDescriptions() { return this.page.locator('.inventory_item_desc'); }

    get itemPrices() { return this.page.locator('.inventory_item_price'); }

    get totalItemPrice() { return this.page.locator('.summary_subtotal_label'); }

    get addedTax() { return this.page.locator('.summary_tax_label'); }

    get totalPrice() { return this.page.locator('.summary_total_label'); }

    get finishButton() { return this.page.locator('#finish'); }

    get cancelButton() { return this.page.locator('#cancel'); }

    async verifyItemsInCheckout(addedItems) {
        const names = await this.itemNames.allTextContents();
        const descriptions = await this.itemDescriptions.allTextContents();
        const prices = await this.itemPrices.allTextContents();

        addedItems.forEach((item) => {
            const index = names.findIndex((name) => name === item.name);
            expect(index).not.toBe(-1);
            expect(descriptions[index]).toBe(item.description);
            expect(prices[index]).toBe(`$${item.price.toFixed(2)}`);
        });
    }

    async calculateTotalPrice() {
        const subtotal = parseFloat((await this.totalItemPrice.textContent()).replace('Item total: $', ''));
        const tax = parseFloat((await this.addedTax.textContent()).replace('Tax: $', ''));
        return subtotal + tax;
    }

    async verifyTotalPrice(expectedTotal) {
        const total = parseFloat((await this.totalPrice.textContent()).replace('Total: $', ''));
        expect(total).toBeCloseTo(expectedTotal, 2);
    }

    async clickFinish() {
        await this.finishButton.click();
    }
}
