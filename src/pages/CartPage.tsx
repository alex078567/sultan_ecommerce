import { useEffect } from 'react';

import Button from '../components/Button';

import ItemInCartCard from '../components/ItemInCartCard';
import {
	addToStore,
	loadImagesFromDb,
	setShowModal,
} from '../features/cart/cartSlice';
import { useAppSelector, useAppDispatch } from '../hooks';
import ThanksForOrderModal from '../components/ThanksForOrderModal';
const CartPage = () => {
	const dispatch = useAppDispatch();
	const { listOfItems, images, showModal } = useAppSelector(
		(store) => store.cart
	);

	const imagesMap = new Map(
		images.map((image) => {
			return [image.barcode, image.img];
		})
	);

	useEffect(() => {
		dispatch(addToStore());
	}, [dispatch, listOfItems]);

	useEffect(() => {
		dispatch(loadImagesFromDb());
	}, [dispatch]);
	//	@ts-ignore
	const price = listOfItems.reduce<number>(
		//	@ts-ignore
		(acc, item) => {
			return acc + item.price * item.quantity;
		},
		0
	);

	return (
		<section className="products-cart">
			{showModal && <ThanksForOrderModal />}
			<h1 className="products-cart__header">Корзина</h1>
			<ul className="products-cart__items-list">
				{listOfItems.map((item, index) => {
					return (
						<li key={index}>
							<ItemInCartCard
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
					text="Оформить заказ"
					icon=""
					handleClick={() => dispatch(setShowModal())}
				/>
				<p className="product-card__price">{price} &#8376;</p>
			</div>
		</section>
	);
};
export default CartPage;
