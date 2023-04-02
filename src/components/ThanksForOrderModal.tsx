import { MouseEvent } from 'react';
import iconDoubleCheck from '../assets/images/icons_double-check.svg';
import iconCross from '../assets/images/icons_cross-yellow.svg';
import Button from './Button';
import { useAppDispatch } from '../hooks';
import { setHideModal } from '../features/cart/cartSlice';
import { useState } from 'react';

const ThanksForOrderModal = () => {
	const [mouseDownOnModal, setMouseDownOnModal] = useState(false);
	const dispatch = useAppDispatch();

	const handleClickOutside = () => {
		if (mouseDownOnModal) {
			setMouseDownOnModal(false);
			return;
		}
		dispatch(setHideModal());
	};

	const handleClickOnModal = (e: MouseEvent<HTMLElement>) => {
		setMouseDownOnModal(false);
		e.stopPropagation();
	};

	const handleMouseDownOnModal = (e: MouseEvent<HTMLElement>) => {
		setMouseDownOnModal(true);
		e.stopPropagation();
	};
	return (
		<div className="modal-container" onClick={handleClickOutside}>
			<div
				className="thanks-for-order"
				onClick={handleClickOnModal}
				onMouseDown={handleMouseDownOnModal}
			>
				<div className="thanks-for-order__button-container">
					<Button
						icon={iconCross}
						additionalClass="button--thanks-for-order-modal"
						handleClick={() => dispatch(setHideModal())}
					/>
				</div>
				<div className="thanks-for-order__data-container">
					<div className="thanks-for-order__img-container">
						<img
							className="thanks-for-order__img"
							src={iconDoubleCheck}
							alt="Две галочки"
						/>
					</div>
					<h2 className="thanks-for-order__header">Спасибо за заказ</h2>
					<p className="thanks-for-order__description">
						Наш менеджер свяжется с вами в ближайшее время
					</p>
				</div>
			</div>
		</div>
	);
};
export default ThanksForOrderModal;
