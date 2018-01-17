module.exports = function(paths) {
    return {
        module: { // Модули - файлы, объявленные модулями
            rules: [
                {
                    test: /\.scss$/, // Если webpack встретит scss файлы, объявленные подулями, то применятся лоадеры сверху вниз, трансформирующие эти файлы в понятные вебпаку.
                    include: paths,
                    use: [
                        'style-loader', // Добавляет стили в dom дерево, при помощи тега <style>. Loader - трансформируют файлы в модули, понятные webpack'у, т.к он понимает лишь js.
                        'css-loader', // Loader, добавляющий css модули в граф.зависимостей
                        'sass-loader' // Loader, компилирующий scss в css
                    ]
                }
            ]
        }
    };
};
