import { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from './base-page';
import { FormInput } from '../types/form-input.interface';

export class CategoryPage extends BasePage {
    private selectors = {
        createNewButton: '[data-testid="create-new"]',
        editButton: '[data-testid="button-edit"]',
        searchButton: 'button[aria-label="Search"]',
        deleteButton: 'button:has-text("Delete"), button:has-text("حذف")',
        nameInput: '[data-testid="name"]'
    };

    constructor(page: Page) {
        super(page);
    }

    async open() {
        await this.navigateTo('/ar/category');
    }

    async createNew() {
        await this.clickButton(this.selectors.createNewButton);
    }

    async save() {
        await this.clickButton(this.selectors.editButton);
    }

    async search(name: string) {
        await this.fillInput(this.selectors.nameInput, name);
        await this.clickButton(this.selectors.searchButton);
    }

    async verifyExists(nameAr: string, nameEn: string) {
        const categoryCell = this.page
            .getByRole('cell', { name: nameAr })
            .or(this.page.getByRole('cell', { name: nameEn }))
            .first();

        await expect(categoryCell).toHaveText(new RegExp(`${nameAr}|${nameEn}`));
    }

    async delete(nameAr: string, nameEn: string) {
        const categoryRow = this.page.getByRole('row', { name: `${nameAr} ${nameEn}` });
        await categoryRow.getByRole('button').nth(1).click();
        await this.clickButton(this.selectors.deleteButton);
    }

    async fillForm(inputs: FormInput[]) {
        for (const input of inputs) {
            if (input.type === 'text') {
                if (input.multiLang) {
                    await this.page.getByTestId(`${input.name}Ar`).fill(input.valueAr || '');
                    await this.page.getByRole('button', { name: 'English' }).click();
                    await this.page.getByTestId(`${input.name}En`).fill(input.valueEn || '');
                } else {
                    await this.page.getByTestId(input.name).fill(input.value || '');
                }
            } else if (input.type === 'select') {
                await this.page.getByTestId(input.name).selectOption(input.option || '');
            }
        }
    }
}