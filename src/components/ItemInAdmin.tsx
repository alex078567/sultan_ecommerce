import Button from './Button';
import iconTrashcan from '../assets/images/icons_trashcan.svg';
import { useAppDispatch } from '../hooks';

import {
	deleteFromList,
	removeImageFromDb,
	showModal,
} from '../features/admin/adminSlice';

interface ItemInAdminProp {
	imgUrl: string;
	sizeType: string;
	size: number;
	price: number;
	barcode: string;
	name: string;
	description: string;
}

const ItemInAdmin: React.FC<ItemInAdminProp> = ({
	imgUrl,
	sizeType,
	size,
	price,
	barcode,
	name,
	description,
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
			<div className="item-in-admin__price-quantity-container">
				<Button
					type="submit"
					additionalClass="button--no-icon"
					text="Редактировать"
					icon=""
					handleClick={() => {
						document.body.style.overflow = 'hidden';
						dispatch(showModal(barcode));
					}}
				/>
				<Button
					additionalClass="button--trash"
					handleClick={() => {
						dispatch(deleteFromList(barcode));
						dispatch(removeImageFromDb(barcode));
					}}
					icon={iconTrashcan}
				/>
			</div>
		</div>
	);
};
export default ItemInAdmin;
