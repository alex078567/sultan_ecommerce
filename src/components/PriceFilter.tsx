import { ChangeEvent } from 'react';

interface PriceFilterProps {
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
	formData: FormData;
}

interface FormData {
	priceMin: number;
	priceMax: number;
	producers: string[];
}

const PriceFilter: React.FC<PriceFilterProps> = ({
	formData,
	handleChange,
}) => {
	return (
		<div className="price-filter price-filter--mobile">
			<p className="price-filter-header">
				Цена <span className="price-filter-header-bold">&#8376;</span>
			</p>
			<div className="price-filter__container">
				<input
					className="price-filter__input"
					type="text"
					name="priceMin"
					placeholder="0"
					onChange={(e) => handleChange(e)}
				/>
				<span className="price-filter__input-dash">-</span>
				<input
					className="price-filter__input"
					type="text"
					name="priceMax"
					placeholder="10000"
					onChange={(e) => handleChange(e)}
				/>
			</div>
		</div>
	);
};
export default PriceFilter;
