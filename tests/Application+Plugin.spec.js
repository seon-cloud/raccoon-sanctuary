import Application from '../src/Application.mjs';
import Plugin from '../src/Plugin.mjs';

describe('Тесты взаимодействия класса приложения и плагина', () => {
    test('Тест регистрации плагина по классу плагина', () => {
        const app  = new Application({ plugins: [Plugin]});
        expect(app.plugins.length).toBe(1);
    });
    test('Тест регистрации плагина по объекту плагина', () => {
        const app  = new Application({ plugins: [{}]});
        expect(app.plugins.length).toBe(1);
    });
    test('Тест на то, что в свойство плагинов передана какая-то дичь', () => {
        const app  = new Application({ plugins: [123] });
        expect(app.plugins.length).toBe(0);
    });
});