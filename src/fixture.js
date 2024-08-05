import { test as base } from '@playwright/test';
import { LoginPage } from './pages/Login.page';
import { InventoryPage } from './pages/Inventory.page';
import { ShopingCartPage } from './pages/ShopingCart.page';
import { CheckoutInfoPage } from './pages/CheckoutInfo.page';
import { CheckoutOverviewPage } from './pages/CheckoutOverview.page';
import { CheckoutCompletePage } from './pages/CheckoutComplete.page';

export const test = base.extend({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    },
    shopingCartPage: async ({ page, inventoryPage }, use) => {
        await inventoryPage.goToCart();
        await use(new ShopingCartPage(page));
    },
    checkoutInfoPage: async ({ page }, use) => {
        await use(new CheckoutInfoPage(page));
    },
    checkoutOverviewPage: async ({ page }, use) => {
        await use(new CheckoutOverviewPage(page));
    },
    checkoutCompletePage: async ({ page }, use) => {
        await use(new CheckoutCompletePage(page));
    },
});
