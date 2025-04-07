import { Page } from '@playwright/test';
import { BASE_URL, DEFAULT_TIMEOUT } from '../config/constants';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(path: string = '') {
        await this.page.goto(`${BASE_URL}${path}`);
        await this.page.waitForLoadState('networkidle');
    }

    async fillInput(selector: string, value: string) {
        await this.page.locator(selector).fill(value);
    }

    async clickButton(selector: string) {
        await this.page.locator(selector).click();
    }

    async selectOption(selector: string, value: string) {
        await this.page.locator(selector).selectOption(value);
    }

    async waitForTimeout(ms: number = DEFAULT_TIMEOUT) {
        await this.page.waitForTimeout(ms);
    }
}