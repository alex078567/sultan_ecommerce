import ItemCard from './ItemCard';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import Pagination from './Pagination';
import { loadImagesFromDb } from '../features/catalogue/catalogueSlice';

const ItemList = () => {
	const { listOfItems, images } = useAppSelector((store) => store.catalogue);
	const { listOfItems: cartList } = useAppSelector((store) => store.cart);
	const itemsInCartBarcodes = cartList.map((item) => item.barcode);
	const imagesMap = new Map(
		images.map((image) => {
			return [image.barcode, image.img];
		})
	);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(6);
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstPost = indexOfLastItem - itemsPerPage;
	const currentItems = listOfItems.slice(indexOfFirstPost, indexOfLastItem);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(loadImagesFromDb());
	}, [dispatch]);
	useEffect(() => {
		setCurrentPage(1);
	}, [listOfItems.length]);

	const paginate = (pageNumber: number): void => {
		setCurrentPage(pageNumber);
	};

	const previousPage = () => {
		if (currentPage !== 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const nextPage = () => {
		if (currentPage !== Math.ceil(listOfItems.length / itemsPerPage)) {
			setCurrentPage(currentPage + 1);
		}
	};

	return (
		<div className="item-card-container">
			<div className="item-card-container__cards">
				{currentItems.map((item, index) => {
					return (
						<ItemCard
							key={index}
							imgUrl={imagesMap.get(item.barcode) || ''}
							sizeType={item.sizeType}
							size={item.size}
							name={item.name}
							barcode={item.barcode}
							manufacturer={item.manufacturer}
							vendorcode={item.vendorcode}
							description={item.description}
							brand={item.brand}
							price={item.price}
							careType={item.careType}
							isInCart={
								itemsInCartBarcodes.indexOf(item.barcode) === -1 ? false : true
							}
						/>
					);
				})}
			</div>
			<Pagination
				itemsPerPage={itemsPerPage}
				totalItems={listOfItems.length}
				paginate={paginate}
				nextPage={nextPage}
				previousPage={previousPage}
				currentPage={currentPage}
			/>
		</div>
	);
};
export default ItemList;
