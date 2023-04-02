import { useEffect } from 'react';
import Button from '../components/Button';
import ItemInAdmin from '../components/ItemInAdmin';
import AddEditItemModal from '../components/AddEditItemModal';
import {
	addToStore,
	loadDataFromJson,
	loadImagesFromDb,
	showModalNewData,
} from '../features/admin/adminSlice';
import { useAppSelector, useAppDispatch } from '../hooks';
const AdminPanel = () => {
	const { listOfItems, showModal, images } = useAppSelector(
		(store) => store.admin
	);
	const imagesMap = new Map(
		images.map((image) => {
			return [image.barcode, image.img];
		})
	);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(loadDataFromJson());
	}, [dispatch]);
	useEffect(() => {
		dispatch(loadImagesFromDb());
	}, [dispatch, listOfItems]);
	useEffect(() => {
		dispatch(addToStore());
	}, [dispatch, listOfItems]);

	return (
		<section className="products-cart">
			{showModal && <AddEditItemModal />}
			<h1 className="product-cart__header">Панель администратора</h1>
			<ul className="products-cart__items-list">
				{listOfItems.map((item, index) => {
					return (
						<li key={index}>
							<ItemInAdmin
								{...item}
								imgUrl={imagesMap.get(item.barcode) || ''}
							/>
						</li>
					);
				})}
			</ul>
			<div className="products-cart__checkout">
				<Button
					type="submit"
					additionalClass="button--no-icon"
					text="Добавить товар"
					icon=""
					handleClick={() => dispatch(showModalNewData())}
				/>
			</div>
		</section>
	);
};
export default AdminPanel;
