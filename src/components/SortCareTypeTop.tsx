import {
	allFiltersOnState,
	careTypeFilter,
} from '../features/catalogue/catalogueSlice';
import { useAppDispatch } from '../hooks';

interface SortCareTypeTopProps {
	careTypes: string[];
	careTypesFilter: string[];
}

const SortCareTypeTop: React.FC<SortCareTypeTopProps> = ({
	careTypes,
	careTypesFilter,
}) => {
	const dispatch = useAppDispatch();
	const handleClick = (item: string) => {
		dispatch(careTypeFilter(item));
		dispatch(allFiltersOnState());
	};
	return (
		<div className="top-caretypes">
			<ul className="top-caretypes__list">
				{careTypes.map((item, index) => {
					return (
						<li key={index} className="top-caretypes__list-item">
							<button
								className={
									careTypesFilter.includes(item)
										? 'top-caretypes__button top-caretypes__button-active'
										: 'top-caretypes__button'
								}
								onClick={() => handleClick(item)}
							>
								{item}
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
export default SortCareTypeTop;
