import Button from './Button';
import iconDownload from '../assets/images/icons_download.svg';
import iconCart from '../assets/images/icons_cart_white.svg';
import iconShare from '../assets/images/icons_share.svg';

interface ItemCardPriceCartShareProps {
	price: number;
	quantityDecrement: () => void;
	quantity: number;
	quantityIncrement: () => void;
	addItemsAndNavigateToCard: () => void;
}

const ItemCardPriceCartShare: React.FC<ItemCardPriceCartShareProps> = ({
	price,
	quantityDecrement,
	quantity,
	quantityIncrement,
	addItemsAndNavigateToCard,
}) => {
	return (
		<div className="card-price-share-container">
			<div className="product-card__price-cart-container">
				<p className="product-card__price">{price} &#8376;</p>
				<div className="quantity-container">
					<Button
						text="-"
						additionalClass="button--quantity-container"
						handleClick={quantityDecrement}
					/>
					{quantity}
					<Button
						text="+"
						additionalClass="button--quantity-container"
						handleClick={quantityIncrement}
					/>
				</div>
				<Button
					text="В КОРЗИНУ"
					icon={iconCart}
					additionalClass="button--price-cart-container"
					handleClick={() => addItemsAndNavigateToCard()}
				/>
			</div>
			<div className="product-card__share-container">
				<div className="product-card__share">
					<img
						className="product-card__share-icon"
						src={iconShare}
						alt="Поделиться"
					/>
				</div>
				<div className="product-card__delivery">
					<p>
						При покупке от{' '}
						<span className="product-card__delivery-bold">10 000 &#8376;</span>{' '}
						бесплатная доставка по Кокчетаву и области
					</p>
				</div>
				<div className="product-card__price-list">
					<p className="product-card__price-list-text"> Прайс-лист</p>
					<img
						className="product-card__price-list-icon"
						src={iconDownload}
						alt="Поделиться"
					/>
				</div>
			</div>
		</div>
	);
};
export default ItemCardPriceCartShare;
