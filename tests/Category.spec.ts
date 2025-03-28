import { test } from '@playwright/test';
import { login, addCategory, searchCategory, deleteCategory } from './categoryFunctions.ts';

test.describe('Category Automation Test', () => {
    test('Add, Search, and Delete Category', async ({ page }) => {

        const adminEmail = "admin@admin.com";
        const adminPassword = "Default@123";
    
        const inputs = [
            { name: 'name', type: 'text', multiLang: true ,valueAr:'تست',valueEn:'Test'}
        ];
        
        await login(page, adminEmail, adminPassword);
        await addCategory(page, inputs);
        await searchCategory(page, inputs);
        await deleteCategory(page, inputs);
    });
});
