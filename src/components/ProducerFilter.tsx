import InputWithButton from './InputWithButton';
import iconSearch from '../assets/images/icon_search.png';
import { ChangeEvent, useEffect, useState } from 'react';
import iconTriangleDown from '../assets/images/icons_triangle_down.svg';
import Button from './Button';
interface ProducerFilterProps {
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
	formData: FormData;
	filteredList: {
		producer: string;
		numberOfProducts: number;
	}[];
	filterBySearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface FormData {
	priceMin: number;
	priceMax: number;
	producers: string[];
}

const ProducerFilter: React.FC<ProducerFilterProps> = ({
	handleChange,
	filterBySearch,
	filteredList,
}) => {
	const [currentList, setCurrentList] = useState(filteredList);
	const [showButton, setShowButton] = useState(false);

	useEffect(() => {
		if (filteredList.length > 4) {
			setCurrentList(filteredList.slice(0, 3));
			setShowButton(true);
		} else {
			setCurrentList(filteredList);
			setShowButton(false);
		}
	}, [filteredList]);

	const showItems = () => {
		setCurrentList(filteredList);
		setShowButton(false);
	};

	return (
		<div className="producer-filter">
			<p className="producer-filter__header">Производитель</p>
			<InputWithButton
				icon={iconSearch}
				additionalClass="input-with-button--sidebar"
				placeholder="Поиск..."
				onChangeFunction={filterBySearch}
			/>
			<ul className="producer-filter__producer-list">
				{currentList.map(({ producer, numberOfProducts }, index) => {
					return (
						<li key={index} className="producer-filter__producer-list-item">
							<input
								type="checkbox"
								id={producer}
								name={producer}
								onChange={(e) => handleChange(e)}
							/>
							<label htmlFor={producer}>
								{producer} <span>({numberOfProducts})</span>
							</label>
						</li>
					);
				})}
			</ul>
			{showButton && (
				<Button
					icon={iconTriangleDown}
					text="Показать все"
					additionalClass="button--card-description button--card-description-producers"
					handleClick={() => {
						showItems();
					}}
				/>
			)}
		</div>
	);
};
export default ProducerFilter;
