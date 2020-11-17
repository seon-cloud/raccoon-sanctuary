import Plugin from '../src/Plugin.mjs';

describe('Тестирование класс плагинов Raccoon', () => {
    test('Создание плагина с присвоением ему UUID приложения', () => {
        const plugin = new Plugin();
        expect(plugin).not.toBeUndefined();
    });

    test('Тестирование действия плагина', () => {
        const actions = {
            health: function() {
                return this.name;
            }
        };
        const name = "TestPlugin"
        const plugin = new Plugin({ actions, name });
        expect(plugin).not.toBeUndefined();
        expect(plugin.actions.health()).toEqual(name);
    });
});