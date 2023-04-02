import {
	allFiltersOnState,
	careTypeFilter,
} from '../features/catalogue/catalogueSlice';
import { useAppDispatch } from '../hooks';

interface SortCareTypeTopMobileProps {
	careTypes: string[];
	careTypesFilter: string[];
}

const SortCareTypeTopMobile: React.FC<SortCareTypeTopMobileProps> = ({
	careTypes,
	careTypesFilter,
}) => {
	const dispatch = useAppDispatch();
	const handleClick = (item: string) => {
		dispatch(careTypeFilter(item));
		dispatch(allFiltersOnState());
	};
	return (
		<div className="top-caretypes top-caretypes--mobile">
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
export default SortCareTypeTopMobile;
