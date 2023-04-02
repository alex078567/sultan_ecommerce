import {
	allFiltersOnState,
	careTypeFilter,
} from '../features/catalogue/catalogueSlice';
import { useAppDispatch } from '../hooks';

interface ListForSortCareTypeProps {
	type: string;
	subtypes: string[];
	careTypesFilter: string[];
}

const ListForSortCareType: React.FC<ListForSortCareTypeProps> = ({
	type,
	subtypes,
	careTypesFilter,
}) => {
	const dispatch = useAppDispatch();

	const handleClick = (item: string) => {
		dispatch(careTypeFilter(item));
		dispatch(allFiltersOnState());
	};

	return (
		<div className="side-caretypes-list-component">
			<button
				className={
					careTypesFilter.includes(type)
						? 'side-caretypes-list-component__button-top side-caretypes-list-component__button-active'
						: 'side-caretypes-list-component__button-top'
				}
				onClick={() => handleClick(type)}
			>
				{type}
			</button>
			<ul className="side-caretypes-list-component__list">
				{subtypes.map((item, index) => {
					return (
						<li
							key={index}
							className="side-caretypes-list-component__list-item"
						>
							<button
								className={
									careTypesFilter.includes(item)
										? 'side-caretypes-list-component__button side-caretypes-list-component__button-active'
										: 'side-caretypes-list-component__button'
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
export default ListForSortCareType;
