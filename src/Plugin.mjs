import Spirit  from './Spirit.mjs';
/**
 * @class
 * @name Plugin
 * @description Базовый класс плагина фреймворка Raccoon
 * @author Dmitrii Shevelev
 * @extends Spirit
 */
export default class Plugin extends Spirit {

    /** Свойство, которое содержит все доступные внутри плагина пакеты */
    #packages = {};

    /** Ссылка на родительский объек */
    #application

    /** Объект действий, которые 
     * доступны внутри плагина */
    #actions = {
        healthCheck: function() {
            return this.alive;
        }
    }
    
    /** 
     * @method
     * @name actions
     * @description Гетер объекта действий плагина
     * @returns {Object} объект действий плагина
     * @memberof Plugin
     * @public
     */
    get actions() {
        return this.#actions
    }

    /** 
     * @method
     * @name #setActions
     * @description Метод, который привязывает функции actions к экземпляру объекта
     * @param {Object} actions_object объек, содержащий функции для привязки
     * @memberof Plugin 
     * @private
     */
    #setActions(actions_object) {
        Object.keys(actions_object).forEach(fn_name => {
            this.#actions[fn_name] = actions_object[fn_name].bind(this);
        });
    }

    /**
     * @name setPackages
     * @description
     * @param {Object} value
     * @memberof Plugin 
     * @private
     */
    #setPackages(value) {
        this.#packages = { ...this.#packages, ...value };
    }

    /**
     * @method
     * @name packages
     * @description Гетер для свойства, возвращающего пакеты, которые доступны в рамках плагина
     * @returns {Object} объект, содержащий все пакеты, доступные в рамках плагина
     * @private
     */
    get packages() {
        return this.#packages;
    }

    /** 
     * @method
     * @name application
     * @description Гетер UUID приложения, к которому привязан плагин
     * @returns {String} UUID приложения-родителя
     * @memberof Plugin 
     */
    get application() {
        return (this.#application && this.#application?.uuid) 
            ? this.#application.uuid 
            : undefined;
    }

    /**
     * @name call
     * @description Гетер объекта плагинов зарегистрированного приложения
     * @returns {object} объект с плагинами зарегистрированного приложения
     * @memberof Plugin
     * @public
     */
    get call() {
        const callObj = {};
        this.#application.plugins.forEach(plugin => {
            if (plugin.alive) {
                callObj[plugin.name] = plugin.actions;
            }
        });
        return callObj;
    }

    /**
     * @method
     * @name registerApplication
     * @description Метод, который регистрирует приложение в плагине
     * @param {object} application объект приложеня
     * @returns {void} 
     * @memberof Plugin
     * @public
     */
    registerApplication(application) {
        this.#application = application ? application : undefined;
    }

    /**
     * @constructor
     * @description Конструктор класса плагина
     * @param {Object} options объект опция для создания экземпляра класса
     * @memberof Plugin
     */
    constructor(options) {
        /** Инициализируем родителя */
        super(options);

        /** Присваиваем ссылку свойству application (приложене-родитель) */
        this.#application = options?.application
            ? options.application 
            : undefined;
       
        /** Собираем действия по для объекта плагина*/
        const actions = options?.actions 
            ? { ...options.actions, ...this.#actions }
            : this.#actions;

        /** Присваиваение действий текущему плагину */
        this.#setActions(actions);

        /** Проверяем есть ли опции packages в объекте options.
         * Если есть packages - добавляем пакеты к текущему 
         *                      плагину (присваиваем к свойству).
         * Если нет packages - не делаем ничего.
         */
        if (options?.packages) {
            this.#setPackages(options.packages);
        }
    }
}