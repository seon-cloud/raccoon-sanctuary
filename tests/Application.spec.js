import Application from '../src/Application.mjs';

describe('Тесты объекта приложения Raccoon', () => {
    test("Создание объекта приложения", () => {
        const app  = new Application();
        expect(app).not.toBeUndefined();
    });

    test('Создание объекта приложения с корректными опциями', () => {
        const name = 'RacoonApplication';
        const app  = new Application({ name });
        expect(app.name).toEqual(name);
    });

    test('Создание атомарного объекта с проверкой свойст на read only', () => {
        const app = new Application();
        expect(app.alive).toBeTruthy();
        expect(app.name).not.toBeUndefined();
        expect(app.plugins.length).toBe(0);
    });
});