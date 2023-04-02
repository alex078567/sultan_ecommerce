import Button from './Button';
import iconTrashcan from '../assets/images/icons_trashcan.svg';
import {
	incrementItemQuantity,
	decrementItemQuantity,
	deleteItem,
} from '../features/cart/cartSlice';
import { useAppDispatch } from '../hooks';

interface ItemInCartCardProp {
	imgUrl: string;
	sizeType: string;
	size: number;
	price: number;
	barcode: string;
	name: string;
	quantity: number;
	description: string;
}

const ItemInCartCard: React.FC<ItemInCartCardProp> = ({
	imgUrl,
	sizeType,
	size,
	price,
	barcode,
	name,
	description,
	quantity,
}) => {
	const dispatch = useAppDispatch();
	return (
		<div className="item-in-cart">
			<div className="item-in-cart__img-description-container">
				<img
					className="item-in-cart__img"
					src={imgUrl}
					alt="Изображение товара"
				/>
				<div className="item-in-cart__description">
					<p className="item-in-cart__size">
						{size} {sizeType}
					</p>
					<h2 className="item-in-cart__header">{name}</h2>
					<p className="item-in-cart__description">{description}</p>
				</div>
			</div>
			<div className="item-in-cart__price-quantity-delete-container">
				<div className="item-in-cart__price-quantity-container">
					<div className="quantity-container">
						<Button
							text="-"
							additionalClass="button--quantity-container"
							handleClick={() => dispatch(decrementItemQuantity(barcode))}
						/>
						{quantity}
						<Button
							text="+"
							additionalClass="button--quantity-container"
							handleClick={() => dispatch(incrementItemQuantity(barcode))}
						/>
					</div>
					<div className="item-in-cart__price-container">
						<p className="product-card__price">{price} &#8376;</p>
					</div>
				</div>
				<div>
					<Button
						additionalClass="button--trash"
						handleClick={() => dispatch(deleteItem(barcode))}
						icon={iconTrashcan}
					/>
				</div>
			</div>
		</div>
	);
};
export default ItemInCartCard;
