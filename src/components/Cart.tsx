import { Link } from 'react-router-dom';
import iconCart from '../assets/images/icons_cart.svg';
import { useAppSelector } from '../hooks';

const Cart: React.FC = () => {
	const { listOfItems } = useAppSelector((store) => store.cart);
	let numberOfItems;
	//	@ts-ignore
	numberOfItems = listOfItems.reduce<number>(
		//	@ts-ignore
		(acc, item) => {
			return {
				quantity: acc.quantity + item.quantity,
				price: acc.price + item.price * item.quantity,
			};
		},
		{ quantity: 0, price: 0 }
	);

	return (
		<div className="cart">
			<div className="cart__icon-container">
				<Link to="cart">
					<img className="cart__icon" src={iconCart} alt="Корзина" />
				</Link>
				{numberOfItems.quantity > 0 && (
					<span className="cart__icon-quantity">{numberOfItems.quantity}</span>
				)}
			</div>
			<div>
				<p className="cart__text">Корзина</p>
				<p className="cart__price">
					<span>{numberOfItems.price}</span> &#8376;
				</p>
			</div>
		</div>
	);
};

export default Cart;
