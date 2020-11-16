import Spirit from './Spirit.mjs';

const CLASS_TYPE = 'function';
const NOT_CLASS_TYPE = 'object';
const NAME_FIELD = 'name';

/**
 * @class
 * @name Application
 * @extends Spirit
 * @description Класс базового приложения фреймворка Raccoon
 * @author Dmitrii Shevelev
 */
export default class Application extends Spirit {

    #pluginsOptions

    /** Массив плагинов приложения */
    #plugins = []

    /**
     * Гетер приватного поля списка плагинов приложения
     * @memberof Application
     * @returns {Array<object|function>} Массив плагинов
     * @public
     */
    get plugins() {
        return this.#plugins;
    }

    /**
     * @method #registerPlugin
     * @description Метод для регистрации плагина в приложении
     * @memberof Application
     * @param {function|object} Plugin плагин приложения
     * @returns {undefined}
     * @private
     */
    #registerPlugin(Plugin) {
        const pluginType = typeof Plugin;
    
        let plugin = undefined;
        switch(pluginType) {
            case CLASS_TYPE:
                const pluginOptions = (this.#pluginsOptions.hasOwnProperty(Plugin.name))
                    ? { ...this.#pluginsOptions[Plugin.name], application: this }
                    : { application: this };
                plugin = new Plugin(pluginOptions);
                break;
            case NOT_CLASS_TYPE:
                plugin = Plugin;
                plugin.application = this;
                break;
            default:
                break;
        }

        if (plugin !== undefined) {
            this.#plugins.push(plugin);
        }
    }

    /**
     * @method
     * @name registerAdditionalsPlugins
     * @description Метод, который регистрирует дополнительные плагины, заданные в опциях (дополнительные плагины приложения)
     * @param {Array<object>} additionalsPlugins список дополнительных плагинов
     * @returns {void}
     * @memberof Application
     * @private
     */
    #registerAdditionalsPlugins(additionalsPlugins) {
        let pluginClass;
        let pluginOptions;
        let plugin;
        /** Проходимся по списку дополнительных плагинов */
        additionalsPlugins.forEach(pluginObj => {
            /** Проверем, есть ли в дополнительных плагинах класс и опции.
             * Если есть - заканчиваем формирвоание опций плагина, создаём его и регистрируем в приложении.
             * ЕСли нет - ничего не делаем.
             */
            if (pluginObj?.plugin && pluginObj?.options) {
                pluginOptions = pluginObj.options;
                pluginClass = pluginObj.plugin;

                /** Проверяем есть ли имя плагина в опция.
                 * Если есть - ничего не делаем.
                 * Если нет - формируем имя плагина как имя класса и значение текущего времен в миллесекундах,
                 *            а затем добавляем его в объект опций. 
                 */
                if (pluginOptions.hasOwnProperty(NAME_FIELD) == false) {
                    pluginOptions.name = `${pluginClass.name}_${Date.now()}`;
                }

                /** Присваиваем плагину ссылку на текущий инстанс приложения */
                pluginOptions.application = this;
                /** Создаём экземпляр плагина */
                plugin = new pluginClass(pluginOptions);
                /** Регистрируем плаги в приложении */
                this.#plugins.push(plugin);
            }
        });
    }
    
    /**
     * @constructor
     * @description Конструктор класса базового приложеиня
     * @param {Object} options опции для создания объкта
     * @memberof Application 
     */
    constructor(options) {
        super(options);

        this.#pluginsOptions = options?.pluginsOptions 
            ? options.pluginsOptions
            : {};

        if (options?.plugins) {
            options.plugins.forEach(plugin => {
                this.#registerPlugin(plugin);
            });
        }

        /** Проверяем, нужны ли приложения дополнительные плагины.
         * Если есть опция дополнительных плагинов - регистрируем дополнительные плагины, как плагины приложения.
         * Если нет опции дополнительных плагинов - ничего не делаем
         */
        if (options?.additionalsPlugins) {
            this.#registerAdditionalsPlugins(options.additionalsPlugins);
        }
    }
}