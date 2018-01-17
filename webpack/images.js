module.exports = function() {
  return {
    module: { // Модули - файлы, объявленные модулями
      rules: [
        {
          test: /\.(jpg|png|svg)$/, // Если webpack встретит эти файлы, объявленные подулями, то применятся лоадеры сверху вниз, трансформирующие эти файлы в понятные вебпаку.
          loader: 'file-loader', // Loader - трансформируют файлы в модули, понятные webpack'у, т.к он понимает лишь js.
          options: {
              name: 'images/[name].[ext]'
                   },
                },
            ],
        },
    };
};
