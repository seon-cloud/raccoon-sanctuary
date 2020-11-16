import { v1 } from 'uuid';

/**
 * @class
 * @name Spirit
 * @description Класс атомарной сущности фреймворка Raccoon
 * @author Dmitrii Shevelev
 */
export default class Spirit {

    /**  Идентификатор объекта */
    #uuid
    /** Имя объекта */
    #name
    /** Время создания */
    #created
    /** Время уничтожения */
    #destroyed

    /**
     * @description Гетерн идентификатора объекта
     * @returns {String} текущее значение жизни объекта
     * @memberof Spirit
     */
    get uuid() {
        return this.#uuid;
    }

    /**
     * @description Гетер имени объекта
     * @returns {String} текущее значение жизни объекта
     * @memberof Spirit
     */
    get name() {
        return this.#name;
    }

    /**
     * @description Вычисляемое свойство. Текущее состояние в жизненном цикле
     * @returns {Boolean} текущее значение жизни объекта
     * @memberof Spirit
     */
    get alive() {
        return this.#destroyed ? false : true;
    }

    /**
     * @method
     * @name destroy
     * @description Метод, который помечает объект как уничтоженный 
     * @memberof Spirit
     */
    destroy() {
        this.#destroyed = true;
    }

    /**
     * @constructor
     * @description Конструктор атомарного класса фреймворка Raccoon 
     * @param {Object} options
     * @memberof Spirit 
     */
    constructor(options) {
        this.#name = options?.name ? options.name : `spirit_${Date.now()}`;
        this.#created = Date.now();
        this.#destroyed = undefined;
        this.#uuid = v1();
    }
}