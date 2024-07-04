const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class ShopingCartPage extends BaseSwagLabPage {
    url = '/cart.html';

    cartItemSelector = '.cart_item';

    removeItemSelector = '[id^="remove"]';

    get headerTitle() { return this.page.locator('.title'); }

    get cartItems() { return this.page.locator(this.cartItemSelector); }

    async getCartItemByName(name) { return this.page.locator(this.cartItemSelector, { hasText: name }); }

    async removeCartItemByName(name) {
        const item = await this.getCartItemByName(name);
        return item.locator(this.removeItemSelector);
    }

    async removeCartItemById(id) {
        await this.cartItems.nth(id).locator(this.removeItemSelector).click();
    }

    async getCartItemsInfo() {
        const count = await this.cartItems.count();
        const items = [];
        for (let i = 0; i < count; i++) {
            const name = await this.cartItems.nth(i).locator('.inventory_item_name').textContent();
            const price = parseFloat((await this.cartItems.nth(i).locator('.inventory_item_price').textContent()).replace('$', ''));
            const description = await this.cartItems.nth(i).locator('.inventory_item_desc').textContent();
            items.push({ name, price, description });
        }
        return items;
    }
}
