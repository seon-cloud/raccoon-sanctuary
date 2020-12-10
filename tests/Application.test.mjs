import Application from '../src/Application.mjs';
import test from 'ava';

const TEST_NAME = 'TestApplication';

const PLUGIN_LENGTH = 0;

test('[Из файла] Импорт из .mjs', t => {
    t.not(Application, undefined);
});

test('[Создание объекта #1] Без опций', t => {
    const application = new Application();
    t.not(application, undefined);
});

test('[Создание объекта #2] Гетер name', t => {
    const application = new Application({ name: TEST_NAME });
    t.is(application.name, TEST_NAME);
});

test('[Создание объекта #3] Гетер alive', t => {
    const application = new Application({ name: TEST_NAME });
    t.true(application.alive);
});

test('[Создание объекта #4] Гетер packages', t => {
    const application = new Application({ name: TEST_NAME });
    t.is(application.plugins.length, PLUGIN_LENGTH);
});
