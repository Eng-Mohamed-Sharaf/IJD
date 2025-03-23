import { test, expect } from '@playwright/test';
import { TIMEOUT } from 'dns';

const languages = [
    { lang: 'ar', data: require('../locales/ar.json') },
    { lang: 'en', data: require('../locales/en.json') }
];

test.describe('Multilingual Category Test', () => {
    
    languages.forEach(({ lang, data }) => {
        test.beforeEach(async ({page})=>{
            await page.goto(`https://ijd-dashboard.vercel.app/${lang}`);
            await page.locator('#email').fill('admin@admin.com');
            await page.locator('#password').fill('123456');
            await page.locator('button[type="submit"]').click();
        });
        test(`Add and Delete Category - [${lang}]`, async ({ page }) => {
        
            await page.goto(`https://ijd-dashboard.vercel.app/${lang}`);

            await page.getByRole('link', { name: data.Category }).click();

            await page.getByTestId('create-new').click();

            await page.getByTestId('nameAr').fill('تست');
            await page.getByRole('button', { name:'English'}).click();
            await page.getByTestId('nameEn').fill('Test');

            await page.getByRole('button', { name: data.create }).click();
            await expect(page.getByText(data.create_msg)).toBeVisible({timeout:10000});

            await expect(page.getByRole('cell', { name: 'تست' }).nth(1)).toBeVisible({timeout:10000});

            await page.getByRole('row', { name: 'تست Test' }).getByRole('button').nth(1).click();
            await page.getByRole('button', { name: data.Delete }).click();
            
            await expect(page.getByText(data.delete_msg)).toBeVisible({timeout:10000});
  


         });
    });


});
