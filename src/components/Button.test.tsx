import iconCart from '../assets/images/icons_cart_white.svg';
import iconTriangleDown from '../assets/images/icons_triangle_down.svg';
import iconTriangleUp from '../assets/images/icons_triangle_up.svg';

import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';
describe('Тестирование компонента "кнопка"', () => {
	it('Проверка корректности рендера кнопки', () => {
		render(<Button text="new button" icon={iconCart} additionalClass="true" />);
		const icon = screen.getByRole('img') as HTMLImageElement;
		const text = screen.getByText('new button');
		expect(icon.src).toContain('/icons_cart_white');
		expect(text).toBeInTheDocument();
	});

	it('Проверка смены иконки при нажатии на кнопку', () => {
		render(
			<Button
				icon={iconTriangleUp}
				secondIcon={iconTriangleDown}
				useInnerState={true}
			/>
		);
		const button = screen.getByRole('button');
		const icon = screen.getByRole('img') as HTMLImageElement;
		expect(icon.src).toContain('/icons_triangle_up');
		fireEvent.click(button);
		expect(icon.src).toContain('/icons_triangle_down');
	});
});
