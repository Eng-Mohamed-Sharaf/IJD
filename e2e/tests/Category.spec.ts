import { test } from '@playwright/test';
import { TestHelpers } from '../helpers/test-helpers';
import { FormInput } from '../types/form-input.interface';

test.describe('Category Management', () => {
    const testCategory: FormInput[] = [{
        type: 'text',
        name: 'name',
        valueAr: 'تست',
        valueEn: 'Test',
        multiLang: true
    }];

    test('Create, search, and delete category', async ({ page }) => {
        // Login
        await TestHelpers.login(page, 'admin@admin.com', 'Default@123');

        // Create category
        await TestHelpers.createCategory(page, testCategory);

        // Search and verify
        await TestHelpers.searchAndVerifyCategory(page, testCategory);

        // Clean up
        await TestHelpers.deleteCategories(page, testCategory);
    });
});