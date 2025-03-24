import { expect } from '@playwright/test';

const BASE_URL = "https://ijd-dashboard.vercel.app";

export async function login(page, email, password) {
    await page.goto(`${BASE_URL}`);
    await page.locator('#email').fill(email);
    await page.locator('#password').fill(password);
    await page.locator('button[type="submit"]').click();
    await page.waitForLoadState('networkidle');
}




export async function fillFormInputs(page, inputs) {
    for (const input of inputs) {
        if (input.type === 'text') {
            if (input.multiLang) {
                await page.getByTestId(`${input.name}Ar`).fill(input.valueAr);
                await page.getByRole('button', { name: 'English' }).click();
                await page.getByTestId(`${input.name}En`).fill(input.valueEn);
            } else {
                await page.getByTestId(input.name).fill(input.value);
            }
        } else if (input.type === 'select') {
            await page.getByTestId(input.name).selectOption(input.option);
        }
    }
}

export async function addCategory(page, inputs) {
    await page.goto(`${BASE_URL}/ar/category`);
    await page.getByTestId('create-new').click();
    await fillFormInputs(page, inputs);
    await page.getByTestId('button-edit').click();
}

export async function searchCategory(page, inputs) {
    await page.goto(`${BASE_URL}/ar/category`);
    for (const input of inputs) {  
        await page.waitForSelector('[data-testid="name"]');

        await page.getByTestId('name').click();
        await page.getByTestId('name').fill(input.valueAr); 

        await page.getByRole('button', { name: 'Search' }).click();

        const categoryCell = page
            .getByRole('cell', { name: input.valueAr })
            .or(page.getByRole('cell', { name: input.valueEn }))
            .first();

        await expect(categoryCell).toHaveText(new RegExp(`${input.valueAr}|${input.valueEn}`), { timeout: 100000 });
    }
}

export async function deleteCategory(page, inputs) {
    for (const input of inputs) {  
    const categoryRow = page.getByRole('row', { name: `${input.valueAr} ${input.valueEn}` });
    await categoryRow.getByRole('button').nth(1).click();
    await page.getByRole('button', { name: 'حذف' }).or(page.getByRole('button', { name: 'Delete' })).click();
    }
}
