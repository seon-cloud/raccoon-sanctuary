import Plugin from '../src/Plugin.mjs';
import test from 'ava';

const TEST_NAME = 'TestPlugin';

const TEST_ACTIONS = {
    test() {
        return this.name;
    }
};

const DEFAULT_ACTIONS_LIST = ['healthCheck'];

import path from 'path';

test('[Загрузка из файла] Импорт из .mjs', t => {
    t.not(Plugin, undefined);
});

test('[Создение объекта #1] Без опций', test => {
    const plugin = new Plugin();
    test.not(plugin, undefined);
});

test('[Создение объекта #2] Без опций, с генерацией name', t => {
    const plugin = new Plugin();
    const name = plugin.name;
    t.not(name, undefined);
});

test('[Создение объекта #3] С опцией name', t => {
    const plugin = new Plugin({ name: TEST_NAME });
    const name = plugin.name;
    t.is(name, TEST_NAME);
});

test('[Создение объекта #4] Проверка опции actions по умолчанию', t => {
    const plugin = new Plugin();
    const actionsList = Object.keys(plugin.actions);
    t.deepEqual(actionsList, DEFAULT_ACTIONS_LIST);
});

test('[Создение объекта #5] С опцией actions', t => {
    const plugin = new Plugin({ 
        name: TEST_NAME,
        actions: TEST_ACTIONS
    });
    t.not([plugin?.actions?.test], undefined);
});

test('[Создение объекта #6] С опцией packages', t => {
    const plugin = new Plugin({ 
        packages: { path }
    });
    t.not(plugin?.packages?.path, undefined);
});

test('[Проверка actions #1] Action доступный по умолчанию', t => {
    const plugin = new Plugin({ 
        name: TEST_NAME,
        actions: TEST_ACTIONS
    });
    const result = plugin.actions.test();
    t.is(result, TEST_NAME);
});

test('[Проверка actions #2] Пользовательский action', t => {
    const plugin = new Plugin({ 
        name: TEST_NAME,
        actions: TEST_ACTIONS
    });
    const result = plugin.actions.test();
    t.is(result, TEST_NAME);
});

