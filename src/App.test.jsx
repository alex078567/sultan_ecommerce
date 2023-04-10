import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Provider } from 'react-redux';
import { store } from './store';
import Dexie from 'dexie';
import indexedDB from 'fake-indexeddb';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import AllRoutes from './pages/AllRoutes';

Dexie.dependencies.indexedDB = indexedDB;

describe('Тестирование React Router', () => {
	it('Проверка рендеринга страницы по умолчанию', () => {
		render(
			<Provider store={store}>
				<AllRoutes />
			</Provider>,
			{ wrapper: BrowserRouter }
		);
		const list = within(screen.getByRole('main')).getByRole('list');
		expect(within(list).getByText('Косметика и гигиена')).toBeInTheDocument();
	});

	it('Проверка рендеринга корзины', () => {
		render(
			<MemoryRouter initialEntries={['/cart']}>
				<Provider store={store}>
					<AllRoutes />
				</Provider>
			</MemoryRouter>
		);
		const list = within(screen.getByRole('main')).getByRole('list');
		expect(within(list).getByText('Корзина')).toBeInTheDocument();
	});
});
