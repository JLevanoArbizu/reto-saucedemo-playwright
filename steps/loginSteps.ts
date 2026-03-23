//loginSteps.ts

import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

Given('que el usuario navega a la pagina de inicio de sesion', async function () {
    this.loginPage = new LoginPage(this.page);
    await this.loginPage.navigate();
});

When('ingresa el usuario {string} y la contraseña {string}', async function (user, pass) {
    await this.loginPage.login(user, pass);
});

Then('deberia ser redirigido a la pagina de productos', async function () {
    await expect(this.page).toHaveURL(/inventory.html/);
});

Then('deberia ver un mensaje de error que dice {string}', async function (expectedError) {
    const actualError = await this.loginPage.errorMessage.innerText();
    expect(actualError).toContain(expectedError);
});