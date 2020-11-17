import Spirit from '../src/Spirit.mjs';

describe('Тесты атомарного объекта Raccoon', () => {
    test("Создание атомарного объекта", () => {
        const spirit  = new Spirit();
        expect(spirit).not.toBeUndefined();
    });

    test('Создание атомарного объекта с корректными опциями', () => {
        const name = 'spirit';
        const spirit  = new Spirit({ name });
        expect(spirit.name).toEqual(name);
    });

    test('Создание атомарного объекта с проверкой свойст на read only', () => {
        const spirit = new Spirit();
        expect(spirit.alive).toBeTruthy();
        expect(spirit.name).not.toBeUndefined();
    });

    test('Тест на уничтожение объейта класса Spirit', () => {
        const spirit = new Spirit();
        expect(spirit.alive).toBeTruthy();
        spirit.destroy();
        expect(spirit.alive).toBeFalsy();
    });
});