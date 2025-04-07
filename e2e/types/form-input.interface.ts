export interface FormInput {
    type: 'text' | 'select';
    name: string;
    value?: string;
    valueAr?: string;
    valueEn?: string;
    option?: string;
    multiLang?: boolean;
}