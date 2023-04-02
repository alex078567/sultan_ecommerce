import iconCart from '../assets/images/icons_cart_white.svg';
import Button from './Button';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import { useNavigate } from 'react-router-dom';
import { addItemToCart } from '../features/cart/cartSlice';

interface ItemCardProps {
	imgUrl: string;
	sizeType: string;
	size: number;
	name: string;
	barcode: string;
	vendorcode: string;
	manufacturer: string;
	brand: string;
	price: number;
	description: string;
	careType: { type: string; subtypes: string[] }[];
	isInCart: boolean;
}

const ItemCard: React.FC<ItemCardProps> = (props) => {
	const dispatch = useAppDispatch();
	const {
		imgUrl,
		sizeType,
		size,
		name,
		barcode,
		manufacturer,
		brand,
		price,
		isInCart,
	} = props;
	const navigate = useNavigate();

	const addItemAndNavigateToCard = () => {
		dispatch(addItemToCart(props));
		navigate('/cart');
	};

	return (
		<div className="item-card">
			<img className="item-card__img" src={imgUrl} alt="Товар" />
			<div>
				<p className="item-card__size">
					{size} {sizeType}
				</p>
			</div>
			<h3 className="item-card__header">
				<span className="item-card__header-brand">{brand}</span>{' '}
				<Link
					className="item-card__header-link"
					to={`/catalogue/${barcode}`}
					state={props}
				>
					{name}
				</Link>
			</h3>
			<p className="item-card__additional-info">
				Штрихкод:
				<span className="item-card__additional-info-bold">{barcode}</span>
			</p>
			<p className="item-card__additional-info">
				Производитель:
				<span className="item-card__additional-info-bold">{manufacturer}</span>
			</p>
			<p className="item-card__additional-info">
				Бренд:
				<span className="item-card__additional-info-bold">{brand}</span>
			</p>
			<div className="item-card__price-container">
				<p className="item-card__price">{price} &#8376;</p>
				{isInCart ? (
					<Button
						text="Перейти к оформлению"
						additionalClass="button--items-list-to-cart button--items-list-to-cart-active"
						handleClick={addItemAndNavigateToCard}
					/>
				) : (
					<Button
						text="В КОРЗИНУ"
						icon={iconCart}
						additionalClass="button--items-list-to-cart"
						handleClick={addItemAndNavigateToCard}
					/>
				)}
			</div>
		</div>
	);
};
export default ItemCard;
