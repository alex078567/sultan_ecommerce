import { ChangeEvent } from 'react';
import { useAppDispatch } from '../hooks';
import {
	allFiltersOnState,
	orderFilter,
} from '../features/catalogue/catalogueSlice';
const SortPriceName = () => {
	const dispatch = useAppDispatch();
	const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
		dispatch(orderFilter(e.target.value));
		dispatch(allFiltersOnState());
	};
	return (
		<form className="form-lowest-highest">
			<label className="form-lowest-highest__label" htmlFor="priceNameSort">
				Сортировка:
			</label>
			<select
				className="form-lowest-highest__select"
				name="priceNameSort"
				id="priceNameSort"
				onChange={handleChange}
			>
				<option value="a-z">А-Я</option>
				<option value="z-a">Я-А</option>
				<option value="lowestToHighest">Сначала дешевые</option>
				<option value="highestToLowest">Сначала дорогие</option>
			</select>
		</form>
	);
};
export default SortPriceName;
