import Plugin from '../src/Plugin.mjs';
import avaspec from 'ava-spec';

const { describe } = avaspec;

const TEST_NAME = 'TestPlugin';

const TEST_ACTIONS = {
    test() {
        return this.name;
    }
};

const DEFAULT_ACTIONS_LIST = ['healthCheck'];

import path from 'path';

describe('[ЗАГРУЗКА] Plugin', it => {
    it('<ИЗ ФАЙЛА> Импорт из .mjs', test => {
        test.not(Plugin, undefined);
    });
});

describe('[ФУНКЦИОНАЛЬНОСТЬ #1] Plugin', it => {
    it('<Создение объекта #1> Без опций', test => {
        const plugin = new Plugin();
        test.not(plugin, undefined);
    });

    it('<Создение объекта #2> Без опций, с генерацией name', test => {
        const plugin = new Plugin();
        const name = plugin.name;
        test.not(name, undefined);
    });

    it('<Создение объекта #3> С опцией name', test => {
        const plugin = new Plugin({ name: TEST_NAME });
        const name = plugin.name;
        test.is(name, TEST_NAME);
    });

    it('<Создение объекта #4> Проверка опции actions по усолчанию', test => {
        const plugin = new Plugin();
        const actionsList = Object.keys(plugin.actions);
        test.deepEqual(actionsList, DEFAULT_ACTIONS_LIST);
    });

    it('<Создение объекта #6> С опцией actions', test => {
        const plugin = new Plugin({ 
            name: TEST_NAME,
            actions: TEST_ACTIONS
        });
        test.not([plugin?.actions?.test], undefined);
    });

    it('<Создение объекта #7> С опцией packages', test => {
        const plugin = new Plugin({ 
            packages: { path }
        });
        test.not(plugin?.packages?.path, undefined);
    });
});


describe('[ФУНКЦИОНАЛЬНОСТЬ #2] Plugin', it => {
    it('<Проверка actions #1> Action доступный по умолчанию', test => {
        const plugin = new Plugin({ 
            name: TEST_NAME,
            actions: TEST_ACTIONS
        });
        const result = plugin.actions.test();
        test.is(result, TEST_NAME);
    });

    it('<Проверка actions #2> Пользовательский action', test => {
        const plugin = new Plugin({ 
            name: TEST_NAME,
            actions: TEST_ACTIONS
        });
        const result = plugin.actions.test();
        test.is(result, TEST_NAME);
    });
});

