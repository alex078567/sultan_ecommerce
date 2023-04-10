import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SortPriceName from './SortPriceName';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../store';

describe('Тестирование компонента "сортировка по имени и цене', () => {
	it('Проверка правильности установки опции по умолчанию)', () => {
		render(
			<Provider store={store}>
				<SortPriceName />
			</Provider>
		);
		screen.logTestingPlaygroundURL();
		const defaultOption = screen.getByRole('option', {
			name: 'А-Я',
		}) as HTMLOptionElement;
		expect(defaultOption.selected).toBe(true);
	});

	it('Проверка количества опций)', () => {
		render(
			<Provider store={store}>
				<SortPriceName />
			</Provider>
		);
		const defaultOption = screen.getAllByRole('option');
		expect(defaultOption.length).toBe(4);
	});

	it('Проверка возможности выбрать другую опцию)', () => {
		render(
			<Provider store={store}>
				<SortPriceName />
			</Provider>
		);
		userEvent.selectOptions(
			screen.getByRole('combobox'),
			screen.getByRole('option', {
				name: 'Я-А',
			})
		);

		const selectedOption = screen.getByRole('option', {
			name: 'Я-А',
		}) as HTMLOptionElement;
		expect(selectedOption.selected).toBe(true);
	});
});
