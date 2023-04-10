import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from './Pagination';

const mockState = jest.fn((currentPage) => currentPage);
const mockPaginate = jest.fn((pageNumber) => mockState(pageNumber));

const mockNextPage = () => {
	mockState(mockState.mock.calls[mockState.mock.calls.length - 1][0] + 1);
};

const mockPreviousPage = () => {
	mockState(mockState.mock.calls[mockState.mock.calls.length - 1][0] - 1);
};

describe('Тестирование компонента "Разделение на страницы"', () => {
	it('Проверка корректности рендера компонента', () => {
		render(
			<Pagination
				itemsPerPage={3}
				totalItems={9}
				currentPage={2}
				paginate={mockPaginate}
				previousPage={mockPreviousPage}
				nextPage={mockNextPage}
			/>
		);
		const buttons = screen.getAllByRole('button');
		expect(buttons.length).toBe(5);
	});

	it('Проверка работы перехода на предыдущую страницу', () => {
		mockState(2);
		render(
			<Pagination
				itemsPerPage={3}
				totalItems={9}
				currentPage={mockState.mock.results[0].value}
				paginate={mockPaginate}
				previousPage={mockPreviousPage}
				nextPage={mockNextPage}
			/>
		);
		const buttons = screen.getAllByRole('button');
		fireEvent.click(buttons[0]);
		console.log(mockState.mock);
		expect(mockState.mock.calls[mockState.mock.calls.length - 1][0]).toBe(1);
	});

	it('Проверка работы перехода на следующую страницу', () => {
		mockState(2);
		render(
			<Pagination
				itemsPerPage={3}
				totalItems={9}
				currentPage={mockState.mock.results[0].value}
				paginate={mockPaginate}
				previousPage={mockPreviousPage}
				nextPage={mockNextPage}
			/>
		);
		const buttons = screen.getAllByRole('button');
		fireEvent.click(buttons[buttons.length - 1]);
		console.log(mockState.mock);
		expect(mockState.mock.calls[mockState.mock.calls.length - 1][0]).toBe(3);
	});
});
