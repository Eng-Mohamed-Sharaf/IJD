import { test, expect } from '@playwright/test';

const languages = [
    { lang: 'ar', data: require('../locales/ar.json') },
    { lang: 'en', data: require('../locales/en.json') }
];

test.describe('Multilingual Category Test', () => {
    
    languages.forEach(({ lang, data }) => {
        test(`Add and Delete Category - [${lang}]`, async ({ page }) => {
            
            await page.goto(`https://ijd-dashboard.vercel.app/${lang}/signin`);

            await page.getByRole('textbox', { name: data.email }).fill('admin@admin.com');
            await page.getByRole('textbox', { name: data.password }).fill('123456');
            await page.getByRole('button', { name: data.signin }).click();
            
            await page.getByRole('link', { name: data.Category }).click();
            await page.getByTestId('create-new').click();

            await page.getByTestId('nameAr').fill('تست');
            await page.getByRole('button', { name:'English'}).click();
            await page.getByTestId('nameEn').fill('Test');

            await page.getByRole('button', { name: data.create }).click();

            await expect(page.getByRole('cell', { name: 'تست' }).nth(1)).toBeVisible();

            await page.getByRole('row', { name: 'تست Test' }).getByRole('button').nth(1).click();
            await page.getByRole('button', { name: data.Delete }).click();
            
            await expect(page.getByText(data.delete_msg)).toBeVisible();      
         });
    });


});
