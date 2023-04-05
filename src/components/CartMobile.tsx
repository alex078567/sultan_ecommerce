import { Link } from 'react-router-dom';
import iconCart from '../assets/images/icons_cart.svg';
import { useAppSelector } from '../hooks';
const CartMobile: React.FC = () => {
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
		</div>
	);
};

export default CartMobile;
