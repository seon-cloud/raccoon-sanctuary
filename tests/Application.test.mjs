import Application from '../src/Application.mjs';
import avaspec from 'ava-spec';

const { describe } = avaspec;

const TEST_NAME = 'TestApplication';

const PLUGIN_LENGTH = 0;

describe('[ЗАГРУЗКА] Application', it => {
    it('<ИЗ ФАЙЛА> Импорт из .mjs', test => {
        test.not(Application, undefined);
    });
});

describe('[ФУНКЦИОНАЛЬНОСТЬ #1] Application', it => {
    it('<Создание объекта #1> Без опций', test => {
        const application = new Application();
        test.not(application, undefined);
    });

    it('<Создание объекта #2> Гетер name', test => {
        const application = new Application({ name: TEST_NAME });
        test.is(application.name, TEST_NAME);
    });

    it('<Создание объекта #3> Гетер alive', test => {
        const application = new Application({ name: TEST_NAME });
        test.true(application.alive);
    });

    it('<Создание объекта #4> Гетер packages', test => {
        const application = new Application({ name: TEST_NAME });
        test.is(application.plugins.length, PLUGIN_LENGTH);
    });
});

