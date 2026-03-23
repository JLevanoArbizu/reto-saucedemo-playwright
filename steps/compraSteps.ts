import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

Given('que el usuario {string} ha iniciado sesion', async function (user) {
    this.loginPage = new LoginPage(this.page);
    this.inventoryPage = new InventoryPage(this.page);
    await this.loginPage.navigate();
    await this.loginPage.login(user, 'secret_sauce'); // Credenciales según requerimiento [cite: 74]
});

When('agrega el producto {string} al carrito', async function (productName) {
    await this.inventoryPage.addToCart(productName);
});

Then('el icono del carrito deberia mostrar {string} unidad', async function (count) {
    await expect(this.inventoryPage.cartBadge).toHaveText(count);
});

Given('que el usuario tiene el producto {string} en su carrito', async function (productName) {
    this.inventoryPage = this.inventoryPage || new InventoryPage(this.page);
    await this.inventoryPage.addToCart(productName);
});

When('navega al carrito de compras', async function () {
    await this.inventoryPage.goToCart();
});

Then('deberia ver el producto {string} en la lista', async function (productName) {
    this.cartPage = new CartPage(this.page);
    await expect(this.cartPage.getProductLocator(productName)).toBeVisible();
});

Given('se encuentra en la pagina de informacion de pago', async function () {
    await this.inventoryPage.goToCart();
    this.cartPage = new CartPage(this.page);
    await this.cartPage.clickCheckout();
});

When('completa el formulario con {string} {string} {string}', async function (name, last, postalCode) {
    this.checkoutPage = new CheckoutPage(this.page);
    await this.checkoutPage.fillInformation(name, last, postalCode);
});

When('finaliza la orden', async function () {
    await this.checkoutPage.finishOrder();
});

Then('deberia ver el mensaje de confirmacion {string}', async function (msg) {
    await expect(this.checkoutPage.completeHeader).toHaveText(msg);
});