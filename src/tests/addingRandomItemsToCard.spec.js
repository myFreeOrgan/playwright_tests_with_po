const { expect } = require('@playwright/test');
const { test } = require('../fixture');
require('dotenv').config();

const standardUser = process.env.STANDARD_USER;
const standardPass = process.env.STANDARD_PASS;

test.describe('Unit 10', () => {
    test.beforeEach(async ({ loginPage, inventoryPage }) => {
        await loginPage.navigate();
        await loginPage.performLogin(standardUser, standardPass);
        await expect(inventoryPage.headerTitle).toBeVisible();
    });

    test('Adding random items to the cart', async ({ inventoryPage }) => {
        const listOfItems = await inventoryPage.getItemsList();
        expect(listOfItems.length).toBe(6);

        const addedItems = await inventoryPage.addRandomItemsToCart();
        expect(addedItems.length).toBeGreaterThan(0);

        const shoppingCartPage = await inventoryPage.goToCartPage();
        const cartItems = await shoppingCartPage.getCartItemsInfo();

        for (const addedItem of addedItems) {
            const match = cartItems.find((item) => item.name === addedItem.name
                && item.price === addedItem.price
                && item.description === addedItem.description);
            expect(match).toBeDefined();
        }
    });
});
