const { expect } = require('@playwright/test');
const { test } = require('../fixture');
const { CheckoutOverviewPage } = require('../pages/CheckoutOverview.page');
require('dotenv').config();

const standardUser = process.env.STANDARD_USER;
const standardPass = process.env.STANDARD_PASS;
const standardFirstName = process.env.STANDARD_FNAME;
const standardLastName = process.env.STANDARD_LNAME;
const standardPostalCode = process.env.STANDARD_POSTALCODE;

test.describe('Unit 10', () => {
    test.beforeEach(async ({ loginPage, inventoryPage }) => {
        await loginPage.navigate();
        await loginPage.performLogin(standardUser, standardPass);
        await expect(inventoryPage.headerTitle).toBeVisible();
    });

    test('Adding random items to the cart and verifying', async ({ inventoryPage, checkoutInfoPage, checkoutCompletePage }) => {
        const addedItems = await inventoryPage.addRandomItemsToCart();
        expect(addedItems.length).toBeGreaterThan(0);

        const shoppingCartPage = await inventoryPage.goToCartPage();
        const cartItems = await shoppingCartPage.getCartItemsInfo();

        for (const addedItem of addedItems) {
            expect(cartItems).toContainEqual(addedItem);
        }

        await shoppingCartPage.checkoutClick();

        await checkoutInfoPage.fillInfo(standardFirstName, standardLastName, standardPostalCode);
        await checkoutInfoPage.clickContinue();

        const checkoutOverviewPage = new CheckoutOverviewPage(checkoutInfoPage.page);
        await checkoutOverviewPage.verifyItemsInCheckout(addedItems);

        const calculatedTotalPrice = await checkoutOverviewPage.calculateTotalPrice();
        await checkoutOverviewPage.verifyTotalPrice(calculatedTotalPrice);

        await checkoutOverviewPage.clickFinish();

        await expect(checkoutCompletePage.thankYouMessage).toBeVisible();
        await expect(checkoutCompletePage.thankYouMessage).toHaveText('Thank you for your order!');
        await expect(checkoutCompletePage.dispatchMessage).toBeVisible();
        await expect(checkoutCompletePage.dispatchMessage).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');

        await checkoutCompletePage.clickBackHome();

        const itemsInInventory = await inventoryPage.getItemsList();
        for (const addedItem of addedItems) {
            expect(itemsInInventory).not.toContainEqual(addedItem);
        }
    });
});
