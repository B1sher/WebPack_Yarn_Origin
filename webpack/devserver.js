module.exports = function() {
    return {
        devServer: {
            stats: 'errors-only', // Отображает лишь ошибки в терминале
            port: 9000 // Порт
        }
    };
};
