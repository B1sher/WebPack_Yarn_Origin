const path = require('path'); // Для путей
const webpack = require('webpack'); // Необходима для CommonsChunkPlugin - выносящий общий код в отдельный файл
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Собирает в build
const merge = require('webpack-merge'); // Склеивает объекты - отдельные конфиги хранятся в папке webpack (Позволяет делить задачи по отдельным файлам и склеивать всё в один при необходимости)
const pug = require('./webpack/pug'); // Переменная, вносящая в вебпак конфик плагина pug, склеиваемая с помощью webpack-merge.
const devserver = require('./webpack/devserver'); // То же самое, но для devserver ^. Встроен в webpack - запускает сервер разработки, работающий в памяти. (Не используют для продакшена)
const sass = require('./webpack/sass'); // Вносит в проект sass ^
const css = require('./webpack/css'); // Вносит конфигурационный файл css в проект ^
const extractCSS = require('./webpack/css.extract'); // Вности ExtractTextPlugin, объединящий разные css файлы из одной папки в один, для продакшна.
const uglifyJS = require('./webpack/js.uglify'); // Минифицирует js код.
const images = require('./webpack/images'); // File-loader, трансформирующий картинки в понятные вебпаку js модули.

const PATHS = { // Пути к папкам (Применяется в плагинах)
    source: path.join(__dirname, 'source'),
    build: path.join(__dirname, 'build')
};

const common = merge([ // Общие модули/плагины Common - для продакшена и разработки. Merge - склеивает.
    {
        entry: { // Точки входа страниц
          'index': PATHS.source + '/pages/index/index.js',
          'blog': PATHS.source + '/pages/blog/blog.js'
        },

        output: { // Куда положить и как назвать исходники приложения
          "path": PATHS.build,
          filename: 'js/[name].js'
        },

        plugins: [ // Настройки плагинов
          new HtmlWebpackPlugin({
              filename: 'index.html', // 2. Создает файл из взятой страницы с таким именем
              chunks: ['index', 'common'],  // 3. Элементы/куски файла. Подключает в шаблон index и common.js
              template: PATHS.source + '/pages/index/index.pug' // 1. Путь до шаблона.
          }),
          new HtmlWebpackPlugin({ // То же, что и выше, но для страницы blog
              filename: 'blog.html',
              chunks: ['blog', 'common'],
              template: PATHS.source + '/pages/blog/blog.pug'
          }),
          new webpack.optimize.CommonsChunkPlugin({ // Плагин, выносящий общий код (Встроен в вебпак)
              name: 'common' // Имя файла, который будет выносить общий код для всех страниц
          }),
          new webpack.ProvidePlugin({
            $: 'jquery',

            jQuery: 'jquery'
          })
      ],

    },
    pug(), // Подключается плагин из webpack/pug.js
    images() // Подключается плагин из webpack/images.js
]);

module.exports = function(env) { // Модули, разделенные на только продакшн и только разработка. Включают в себя common + уникальные для той или иной области.

    if (env === 'production') { // Модули для продакшена
      return merge([ // Передаёт массив объектов для склейки. merge - подключает склейку с помощью плагина merge, а не Object.assign
        common,
        extractCSS(),
        uglifyJS()
    ]);

    }

    if (env === 'development') { // Модули для разработки
        return merge([ // Передаёт массив объектов для склейки
          common,
          devserver(),
          sass(),
          css()
        ]);

    }
};
