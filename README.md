## Проект "Интернем магазин"

### !!! Панель администратора находится по адресу /admin
Навигация построена с использованием React Router.
Для управления состоянием используется React Redux Toolkit.
Изображения товаров хранятся в формате base64 в IndexedDB.
данные представляют из себя набор обьектов вида:

```javascript
	{
		barcode:string,
		img:string,
	},
```

barcode здесь выступает ключом.
Для работы с IndexedDB используется обертка вокруг нее : [Dexie.js](https://dexie.org/)
