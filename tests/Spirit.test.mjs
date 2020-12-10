import Spirit from '../src/Spirit.mjs';
import test from 'ava';

const TEST_NAME = 'TestSpirit'

test('[Загрузка из файла] Импорт из .mjs', t => {
    t.not(Spirit, undefined);
});

test('[Создание объекта #1] Создание объекта без опций', 
    t => {
        const spirit = new Spirit();
        t.not(spirit, undefined);
});

test('[Создание объекта #2] Создание объекта с опциями', t => {
    const spirit = new Spirit({ name: TEST_NAME });
    t.is(spirit.name, TEST_NAME);
});

test('[Проверка публичных методов #1] Метод alive', t => {
    const spirit = new Spirit();
    t.true(spirit.alive)    
});

test('[Проверка публичных методов #2] Метод destroy', t => {
    const spirit = new Spirit();
    spirit.destroy();
    t.false(spirit.alive);
});

test('[Проверка публичных методов #3] Гетер name', t => {
    const spirit = new Spirit();
    t.not(spirit.name, undefined);
});

test('[Проверка публичных методов #4] Гетер uuid', t => {
    const spirit = new Spirit();
    t.not(spirit.uuid, undefined);
});