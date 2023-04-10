import ItemList from '../components/ItemList';
import SidebarFilters from '../components/SidebarFilters';
import SortCareTypeTop from '../components/SortCareTypeTop';
import SortPriceName from '../components/SortPriceName';
import { useAppDispatch, useAppSelector } from '../hooks';
import FiltersMobile from '../components/FiltersMobile';
import SortCareTypeTopMobile from '../components/SortCareTypeTopMobile';
import { useCallback, useEffect, useState } from 'react';
import { loadImagesFromDb } from '../features/catalogue/catalogueSlice';

const CataloguePage = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(loadImagesFromDb());
	}, [dispatch]);

	const { careTypesFilter, listOfItems, isLoading } = useAppSelector(
		(store) => store.catalogue
	);
	const [listOfItemsForCareTypes, setListOfItemsForCareTypes] =
		useState(listOfItems);
	const [isFiltersSubmitted, setIsFiltersSubmitted] = useState(false);

	const changeCareTypesData = useCallback(() => {
		setListOfItemsForCareTypes(listOfItems);
	}, [listOfItems]);

	const setIsFiltersSubmittedTrue = () => {
		setIsFiltersSubmitted(true);
	};

	useEffect(() => {
		if (isFiltersSubmitted) {
			changeCareTypesData();
			setIsFiltersSubmitted(false);
		}
	}, [changeCareTypesData, isFiltersSubmitted, listOfItems]);

	const arr = listOfItemsForCareTypes;
	const careTypesArray = arr.map((item) => item.careType);
	const careTypesArrayFlat = careTypesArray.flat();

	const uniqueCareTypes = Array.from(
		new Set(careTypesArrayFlat.map((item) => item.type))
	);

	const dataForSidebarCaretypes = uniqueCareTypes.map((careType) => {
		const selectByCareType = careTypesArrayFlat.filter(
			(item) => item.type === careType
		);
		const onlySubtypes = selectByCareType.map((item) => item.subtypes);
		return {
			type: careType,
			subtypes: Array.from(new Set(onlySubtypes.flat())),
		};
	});

	const dataForTopCaretypes = Array.from(
		new Set(
			dataForSidebarCaretypes
				.map((item) => {
					return [item.type, ...item.subtypes];
				})
				.flat(2)
		)
	);

	return (
		<section className="section-catalogue">
			<div className="catalogue-page__header-container">
				<h1 className="catalogue-page__header">Косметика и гигиена</h1>
				<FiltersMobile
					changeCareTypesData={setIsFiltersSubmittedTrue}
					dataForSidebarCaretypes={dataForSidebarCaretypes}
					careTypesFilter={careTypesFilter}
				/>
				<SortCareTypeTopMobile
					careTypes={dataForTopCaretypes}
					careTypesFilter={careTypesFilter}
				/>
				<SortPriceName />
			</div>
			<SortCareTypeTop
				careTypes={dataForTopCaretypes}
				careTypesFilter={careTypesFilter}
			/>
			<div className="items-filters-container">
				<SidebarFilters
					changeCareTypesData={setIsFiltersSubmittedTrue}
					dataForSidebarCaretypes={dataForSidebarCaretypes}
					careTypesFilter={careTypesFilter}
				/>
				{isLoading || <ItemList />}
			</div>
		</section>
	);
};
export default CataloguePage;
