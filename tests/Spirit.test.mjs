import Spirit from '../src/Spirit.mjs';
import avaspec from 'ava-spec';

const { describe } = avaspec;

const TEST_NAME = 'TestSpirit'

describe('[ЗАГРУЗКА] Spirit', it => {
    it('<ИЗ ФАЙЛА> Импорт из .mjs', test=> {
        test.not(Spirit, undefined);
    });
});

describe('[ФУНКЦИОНАЛЬНОСТЬ #1] Spirit', it => {
    it('<Создание объекта> Создание объекта без опций', test=> {
        const spirit = new Spirit();
        test.not(spirit, undefined);
    });

    it('<Создание объекта> Создание объекта с опциями', test=> {
        const spirit = new Spirit({ name: TEST_NAME });
        test.is(spirit.name, TEST_NAME);
    });
});

describe('[ФУНКЦИОНАЛЬНОСТЬ #2] Spirit', it => {
    it('<Проверка публичных методов #1> Метод alive', test=> {
        const spirit = new Spirit();
        test.true(spirit.alive)    
    });

    it('<Проверка публичных методов #2> Метод destroy', test => {
        const spirit = new Spirit();
        spirit.destroy();
        test.false(spirit.alive);
    });

    it('<Проверка публичных методов #3> Гетер name', test=> {
        const spirit = new Spirit();
        test.not(spirit.name, undefined);
    });

    it('<Проверка публичных методов #4> Гетер uuid', test=> {
        const spirit = new Spirit();
        test.not(spirit.uuid, undefined);
    });
});