import Plugin from '../src/Plugin.mjs';
import Applicatopm from '../src/Application.mjs';

import test from 'ava';

const NOT_EMPTY_PLUGINS = 1
const EMPTY_PLUGINS = 0;
const PLUGIN_INDEX = 0;

test('[Создание объекта #1] Передаём в plugins список классов', t => {
    const application = new Applicatopm({ plugins: [Plugin] });
    t.is(application.plugins.length, NOT_EMPTY_PLUGINS);
});

test('[Создание объекта #2] Передаём в plugins JSON', t => {
    const application = new Applicatopm({ plugins: [{}] });
    t.is(application.plugins.length, NOT_EMPTY_PLUGINS);
});

test('[Создание объекта #3] Передаём в plugins не корректное значение', t => {
    const application = new Applicatopm({ plugins: [123] });
    t.is(application.plugins.length, EMPTY_PLUGINS);
});

test('[Регистрация плагина #1] Получаем зарегистрированный плагин', t => {
    const application = new Applicatopm({ plugins: [Plugin] });
    t.not(application.plugins[PLUGIN_INDEX], undefined);
});

test('[Регистрация плагина #2] Проверяем регистрацию (сравниваем UUID)', t => {
    const application = new Applicatopm({ plugins: [Plugin] });
    t.is(application.plugins[PLUGIN_INDEX].application, application.uuid);
});