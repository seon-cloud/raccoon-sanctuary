import Plugin from '../src/Plugin.mjs';
import Applicatopm from '../src/Application.mjs';

import avaspec from 'ava-spec';

const { describe } = avaspec;

const NOT_EMPTY_PLUGINS = 1
const EMPTY_PLUGINS = 0;
const PLUGIN_INDEX = 0;

describe('[ВЗАИМОДЕЙСТВИЕ #1] Application + Plugin', it => {
    it('<Создание объекта #1> Передаём в plugins список классов', test => {
        const application = new Applicatopm({ plugins: [Plugin] });
        test.is(application.plugins.length, NOT_EMPTY_PLUGINS);
    });

    it('<Создание объекта #2> Передаём в plugins JSON', test => {
        const application = new Applicatopm({ plugins: [{}] });
        test.is(application.plugins.length, NOT_EMPTY_PLUGINS);
    });

    it('<Создание объекта #3> Передаём в plugins не корректное значение', test => {
        const application = new Applicatopm({ plugins: [123] });
        test.is(application.plugins.length, EMPTY_PLUGINS);
    });
});

describe('[ВЗАИМОДЕЙСТВИЕ #2] Application + Plugin', it => {
    it('<Регистрация плагина #1> Получаем зарегистрированный плагин', test => {
        const application = new Applicatopm({ plugins: [Plugin] });
        test.not(application.plugins[PLUGIN_INDEX], undefined);
    });

    it('<Регистрация плагина #2> Проверяем регистрацию (сравниваем UUID)', test => {
        const application = new Applicatopm({ plugins: [Plugin] });
        test.is(application.plugins[PLUGIN_INDEX].application, application.uuid);
    });
});