import Button from './Button';
import PriceFilter from './PriceFilter';
import ProducerFilter from './ProducerFilter';
import iconTrashcan from '../assets/images/icons_trashcan.svg';
import { useAppDispatch } from '../hooks';
import { ChangeEvent, FormEvent, useState, useRef } from 'react';
import {
	allFiltersOnState,
	careTypeFilter,
	priceProducerFilter,
} from '../features/catalogue/catalogueSlice';
import { getDataFromLocalStorage } from '../utils/localStorage';
import { JsonPropsArray } from '../interfaces/globalInterfaces';

interface FormData {
	priceMin: number;
	priceMax: number;
	producers: string[];
}

interface SidebarFiltersMobileProps {
	dataForSidebarCaretypes: {
		type: string;
		subtypes: string[];
	}[];
	careTypesFilter: string[];
	changeCareTypesData: () => void;
}

const SidebarFiltersMobile: React.FC<SidebarFiltersMobileProps> = ({
	changeCareTypesData,
}) => {
	const formRef = useRef<HTMLFormElement>(null);
	const dispatch = useAppDispatch();
	const defaultFormData = {
		priceMin: 0,
		priceMax: 10000,
		producers: [],
	};
	const listOfItems: JsonPropsArray = getDataFromLocalStorage('cardItems');
	const Producers = listOfItems?.map((item) => item.manufacturer);
	const uniqueProducers = Array.from(new Set(Producers));
	const [formData, setFormData] = useState<FormData>(defaultFormData);

	let uniqueProducersAndProducts: {
		producer: string;
		numberOfProducts: number;
	}[] = [];
	for (const producer of uniqueProducers) {
		const numberOfProducts = listOfItems.filter((item) => {
			return item.manufacturer === producer;
		}).length;
		uniqueProducersAndProducts.push({
			producer,
			numberOfProducts,
		});
	}

	const [filteredList, setFilteredList] = useState(uniqueProducersAndProducts);

	const filterBySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const name = e.target.value;
		const updatedList = uniqueProducersAndProducts.filter((producer) => {
			return producer.producer.toLowerCase().indexOf(name.toLowerCase()) !== -1;
		});
		setFilteredList(updatedList);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(priceProducerFilter(formData));
		dispatch(allFiltersOnState());
		changeCareTypesData();
	};

	const handleClick = () => {
		setFormData(defaultFormData);
		if (formRef.current) {
			formRef.current.reset();
			setFilteredList(uniqueProducersAndProducts);
			dispatch(careTypeFilter(''));
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const name = e.target.name;
		const value = e.target.value;
		const isChecked = e.target.checked;

		if (value === 'on') {
			let arrayOfProducers = [...formData.producers];
			if (isChecked) {
				if (arrayOfProducers.indexOf(name) === -1) {
					arrayOfProducers.push(name);
					setFormData({ ...formData, producers: arrayOfProducers });
				}
			}
			if (!isChecked) {
				const index = arrayOfProducers.indexOf(name);
				if (index > -1) {
					arrayOfProducers.splice(index, 1);

					setFormData({ ...formData, producers: arrayOfProducers });
				}
			}
		} else {
			setFormData({ ...formData, [name]: value });
		}
	};

	return (
		<div className="sidebar sidebar-mobile">
			<form onSubmit={handleSubmit} ref={formRef}>
				<PriceFilter handleChange={handleChange} formData={formData} />
				<ProducerFilter
					handleChange={handleChange}
					formData={formData}
					filterBySearch={filterBySearch}
					filteredList={filteredList}
				/>
				<div className="sidebar__button-container">
					<Button
						type="submit"
						additionalClass="button--no-icon"
						text="Показать"
						icon=""
					/>
					<Button
						type="button"
						additionalClass="button--trash"
						text=""
						icon={iconTrashcan}
						handleClick={handleClick}
					/>
				</div>
			</form>
		</div>
	);
};
export default SidebarFiltersMobile;
