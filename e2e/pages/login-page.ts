import { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class LoginPage extends BasePage {
    private selectors = {
        emailInput: '#email',
        passwordInput: '#password',
        submitButton: 'button[type="submit"]'
    };

    constructor(page: Page) {
        super(page);
    }

    async login(email: string, password: string) {
        await this.navigateTo();
        await this.fillInput(this.selectors.emailInput, email);
        await this.fillInput(this.selectors.passwordInput, password);
        await this.clickButton(this.selectors.submitButton);
        await this.waitForTimeout();
    }
}