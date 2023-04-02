import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import iconTriangleDown from '../assets/images/icons_triangle_down.svg';
import iconTriangleUp from '../assets/images/icons_triangle_up.svg';
import { useAppDispatch } from '../hooks';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { addItemsToCart } from '../features/cart/cartSlice';
import ItemCardPriceCartShare from '../components/ItemCardPriceCartShare';
import ItemCardPriceCartShareMobile from '../components/ItemCardPriceCartShareMobile';
const ItemCardPage = () => {
	const navigate = useNavigate();
	const [showDescription, setShowDescription] = useState(false);
	const [showFeatures, setShowFeatures] = useState(false);
	const { state } = useLocation();
	const {
		imgUrl,
		sizeType,
		size,
		name,
		barcode,
		manufacturer,
		brand,
		price,
		vendorcode,
		description,
	} = state;
	const [quantity, setQuantity] = useState(0);
	const dispatch = useAppDispatch();
	const addItemsAndNavigateToCard = () => {
		if (quantity > 0) {
			dispatch(addItemsToCart({ ...state, quantity: quantity }));
			navigate('/cart');
		}
	};

	const quantityIncrement = () => {
		setQuantity(quantity + 1);
	};

	const quantityDecrement = () => {
		if (quantity < 1) {
			return;
		}
		setQuantity(quantity - 1);
	};

	return (
		<section className="product-card">
			<img
				className="product-card__img"
				src={imgUrl}
				alt="Изображение товара"
			/>
			<div>
				<p className="product-card__is-available">В наличии</p>
				<h2 className="product-card__header">
					<span className="product-card__header-bold">{brand}</span> {name}
				</h2>
				<p className="product-card__size">
					{size} {sizeType}
				</p>

				<ItemCardPriceCartShare
					price={price}
					quantityDecrement={quantityDecrement}
					quantity={quantity}
					quantityIncrement={quantityIncrement}
					addItemsAndNavigateToCard={addItemsAndNavigateToCard}
				/>
				<ItemCardPriceCartShareMobile
					price={price}
					quantityDecrement={quantityDecrement}
					quantity={quantity}
					quantityIncrement={quantityIncrement}
					addItemsAndNavigateToCard={addItemsAndNavigateToCard}
				/>

				<div className="product-data">
					<p className="product-data__elem">
						Производитель:{' '}
						<span className="product-data__elem-bold">{manufacturer}</span>
					</p>
					<p className="product-data__elem">
						Бренд: <span className="product-data__elem-bold">{brand}</span>
					</p>
					<p className="product-data__elem">
						Артикул:{' '}
						<span className="product-data__elem-bold">{vendorcode}</span>
					</p>
					<p className="product-data__elem">
						Штрихкод: <span className="product-data__elem-bold">{barcode}</span>
					</p>
				</div>

				<div className="product-card__description-container">
					<Button
						icon={iconTriangleDown}
						secondIcon={iconTriangleUp}
						useInnerState={true}
						text="Описание"
						additionalClass="button--card-description"
						handleClick={() => {
							setShowDescription(!showDescription);
						}}
					/>
					{showDescription && (
						<p className="product-card__description-text">{description}</p>
					)}
				</div>
				<Button
					icon={iconTriangleDown}
					secondIcon={iconTriangleUp}
					useInnerState={true}
					text="Характеристики"
					additionalClass="button--card-description button--card-description-mt"
					handleClick={() => {
						setShowFeatures(!showFeatures);
					}}
				/>

				{showFeatures && (
					<div className="product-data product-data__second">
						<p className="product-data__elem">
							Название: <span className="product-data__elem-bold">{name}</span>
						</p>
						<p className="product-data__elem">
							Бренд:{' '}
							<span className="product-data__elem-bold">{manufacturer}</span>
						</p>
						<p className="product-data__elem">
							Бренд: <span className="product-data__elem-bold">{brand}</span>
						</p>
						<p className="product-data__elem">
							Артикул:{' '}
							<span className="product-data__elem-bold">{vendorcode}</span>
						</p>
						<p className="product-data__elem">
							Штрихкод:{' '}
							<span className="product-data__elem-bold">{barcode}</span>
						</p>
					</div>
				)}
			</div>
		</section>
	);
};
export default ItemCardPage;
