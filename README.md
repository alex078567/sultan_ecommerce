## Проект "Интернет магазин"

##### Демо-версия (netlify): [Интернет магазин](https://alex078567.github.io/sultan_ecommerce/)

### ! Header и Footer страницы не работают (активна только корзина в header)

### !! Панель администратора находится по адресу /admin

#### !!!! Для того, чтобы обновить список товаров в каталоге, после того как его изменил администратор, необходимо обновить страницу.

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
