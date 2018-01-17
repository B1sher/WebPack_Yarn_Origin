import './index.scss'; // импортирует стили
import 'normalize.css'; // Импортирует библиотеку нормалайз

import createMenu from '../../components/menu/menu';
var menu = createMenu(['Главная','Блог'], 'menu');
document.body.appendChild(menu);

console.log('in index.js') // Выводит в лог панель браузера сообщение о том, что .js подключен
