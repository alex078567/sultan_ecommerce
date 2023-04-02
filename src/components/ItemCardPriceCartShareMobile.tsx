import Button from './Button';
import iconDownload from '../assets/images/icons_download.svg';
import iconCart from '../assets/images/icons_cart_white.svg';
import iconShare from '../assets/images/icons_share.svg';

interface ItemCardPriceCartShareMobileProps {
	price: number;
	quantityDecrement: () => void;
	quantity: number;
	quantityIncrement: () => void;
	addItemsAndNavigateToCard: () => void;
}

const ItemCardPriceCartShareMobile: React.FC<
	ItemCardPriceCartShareMobileProps
> = ({
	price,
	quantityDecrement,
	quantity,
	quantityIncrement,
	addItemsAndNavigateToCard,
}) => {
	return (
		<div className="product-card--mobile product-card--mobile-show">
			<div className="product-card__mobile-price-container">
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
			</div>
			<div className="product-card__mobile-cart-share-container">
				<Button
					text="В КОРЗИНУ"
					icon={iconCart}
					additionalClass="button--price-cart-container"
					handleClick={() => addItemsAndNavigateToCard()}
				/>
				<div className="product-card__share">
					<img
						className="product-card__share-icon"
						src={iconShare}
						alt="Поделиться"
					/>
				</div>
			</div>
			<div className="product-card__mobile-delivery-price-list-container">
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
export default ItemCardPriceCartShareMobile;
