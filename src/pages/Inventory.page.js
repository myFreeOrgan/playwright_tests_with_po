const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    get headerTitle() { return this.page.locator('.title'); }

    get inventoryItems() { return this.page.locator('.inventory_item'); }

    get addItemToCartBtns() { return this.page.locator('[id^="add-to-cart"]'); }

    get inventoryItemName() { return this.page.locator('.inventory_item_name'); }

    get inventoryItemPrice() { return this.page.locator('.inventory_item_price'); }

    get cartButton() { return this.page.locator('.shopping_cart_link'); }

    async selectSortOption(value) {
        await this.productSorting.selectOption(value);
    }

    async getNameValues() {
        return this.inventoryItemName.allTextContents();
    }

    async getPriceValues() {
        const price = await this.inventoryItemPrice.allTextContents();
        return price.map((priceText) => parseFloat(priceText.replace('$', '')));
    }

    async addItemToCartById(id) {
        await this.addItemToCartBtns.nth(id).click();
    }

    async addItemToCartByIndex(index) {
        const itemDiv = this.inventoryItems.nth(index);
        const addButton = itemDiv.locator('.btn_inventory').first();
        await addButton.click();
    }

    async getItemInfoById(id) {
        const name = await this.inventoryItemName.nth(id).textContent();
        const price = parseFloat((await this.inventoryItemPrice.nth(id).textContent()).replace('$', ''));
        const description = await this.page.locator('.inventory_item_desc').nth(id).textContent();
        return { name, price, description };
    }

    async getItemInfoByIndex(index) {
        const name = await this.inventoryItemName.nth(index).textContent();
        const price = parseFloat((await this.inventoryItemPrice.nth(index).textContent()).replace('$', ''));
        const description = await this.page.locator('.inventory_item_desc').nth(index).textContent();
        return { name, price, description };
    }

    async getItemsList() {
        const items = await this.inventoryItems.allTextContents();
        return items;
    }

    async addRandomItemsToCart() {
        const addedItems = [];

        const itemCount = await this.inventoryItems.count();

        const count = Math.floor(Math.random() * itemCount) + 1;

        const randomIndexes = this.generateRandomIndexes(itemCount, count);

        for (const index of randomIndexes) {
            await this.addItemToCartByIndex(index);

            try {
                const itemInfo = await this.getItemInfoByIndex(index);
                addedItems.push(itemInfo);
            } catch (error) {
                console.error(`Error ${index}: ${error.message}`);
            }
        }

        return addedItems;
    }

    generateRandomIndexes(maxIndex, count) {
        const indexes = [];
        while (indexes.length < count) {
            const randomIndex = Math.floor(Math.random() * maxIndex);
            if (!indexes.includes(randomIndex)) {
                indexes.push(randomIndex);
            }
        }
        return indexes;
    }

    async goToCart() {
        await this.cartButton.click();
    }
}
