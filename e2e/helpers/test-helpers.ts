import { Page } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { CategoryPage } from '../pages/category-page';
import { FormInput } from '../types/form-input.interface';

export class TestHelpers {
    static async login(page: Page, email: string, password: string) {
        const loginPage = new LoginPage(page);
        await loginPage.login(email, password);
    }

    static async createCategory(page: Page, inputs: FormInput[]) {
        const categoryPage = new CategoryPage(page);
        await categoryPage.open();
        await categoryPage.createNew();
        await categoryPage.fillForm(inputs);
        await categoryPage.save();
    }

    static async searchAndVerifyCategory(page: Page, inputs: FormInput[]) {
        const categoryPage = new CategoryPage(page);
        await categoryPage.open();
        
        for (const input of inputs) {
            await categoryPage.search(input.valueAr || '');
            await categoryPage.verifyExists(input.valueAr || '', input.valueEn || '');
        }
    }

    static async deleteCategories(page: Page, inputs: FormInput[]) {
        const categoryPage = new CategoryPage(page);
        await categoryPage.open();
        
        for (const input of inputs) {
            await categoryPage.delete(input.valueAr || '', input.valueEn || '');
        }
    }
}