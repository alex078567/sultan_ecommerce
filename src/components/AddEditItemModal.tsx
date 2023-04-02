import { ChangeEvent, FormEvent, MouseEvent, useEffect, useRef } from 'react';
import { useState } from 'react';
import iconTrashcan from '../assets/images/icons_trashcan.svg';
import { JsonProps } from '../interfaces/globalInterfaces';
import { useAppSelector, useAppDispatch } from '../hooks';
import {
	closeModal,
	putImageToDb,
	saveChanges,
} from '../features/admin/adminSlice';
import Button from './Button';

const AddEditItemModal = () => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const dispatch = useAppDispatch();

	const { listOfItems, barcodeForEdit, images } = useAppSelector(
		(store) => store.admin
	);

	const imagesMap = new Map(
		images.map((image) => {
			return [image.barcode, image.img];
		})
	);

	const emptyItemData: JsonProps = {
		sizeType: '',
		size: 0,
		name: '',
		barcode: '',
		vendorcode: '',
		manufacturer: '',
		brand: '',
		price: 0,
		description: '',
		careType: [{ type: '', subtypes: [''] }],
	};

	const emptyArrayForCareTypes = Array(10).fill('');
	const [mouseDownOnModal, setMouseDownOnModal] = useState(false);

	const [subCareType, setSubCareType] = useState<string[]>(
		emptyArrayForCareTypes
	);

	const [careType, setCareType] = useState('');

	const itemForEdit =
		barcodeForEdit === '00000000'
			? emptyItemData
			: listOfItems.filter((item) => item.barcode === barcodeForEdit)[0];
	const [itemData, setItemData] = useState<JsonProps>(itemForEdit);
	const [imgData, setImgData] = useState(imagesMap.get(itemData.barcode) || '');

	useEffect(() => {
		const toggleFileInput = () => {
			const data = imgData;
			const file = new File([data], 'img');
			const dataTransfer = new DataTransfer();
			dataTransfer.items.add(file);
			if (fileInputRef.current != null) {
				fileInputRef.current.files = dataTransfer.files;
			}
		};
		toggleFileInput();
	}, [imgData]);

	const insertNewCareType = (
		careTypeIndex: number,
		newItemData: string[]
	): void => {
		const newItemDataCareType = itemData.careType.map((item, index) => {
			if (careTypeIndex === index) {
				return { ...item, subtypes: newItemData };
			}
			return item;
		});
		setItemData({ ...itemData, careType: newItemDataCareType });
	};

	const clearFormFields = () => {
		setItemData(emptyItemData);
		setImgData('');
	};

	const setSubCareTypeArray = (
		careTypeIndex: number,
		value: HTMLInputElement['value']
	) => {
		const newData = subCareType;
		newData[careTypeIndex] = value;
		setSubCareType([...newData]);
	};

	const submitCareType = () => {
		const careTypeArray = [
			...itemData.careType,
			{
				type: careType,
				subtypes: [],
			},
		];
		setItemData({ ...itemData, careType: careTypeArray });
		setCareType('');
	};

	const submitSubtype = (careTypeIndex: number) => {
		const subtypeData = subCareType[careTypeIndex];
		const newData = [...itemData.careType[careTypeIndex].subtypes, subtypeData];
		insertNewCareType(careTypeIndex, newData);
		setSubCareType(Array(10).fill(''));
	};

	const closeModalDispatch = () => {
		document.body.style.overflow = 'unset';
		dispatch(closeModal());
		clearFormFields();
	};

	const deleteCareType = (index: number) => {
		const newItemData = [
			...itemData.careType.slice(index + 1),
			...itemData.careType.slice(0, index),
		];
		setItemData({ ...itemData, careType: newItemData });
	};

	const deleteCareSubtype = (careTypeIndex: number, index: number) => {
		const newItemData = [
			...itemData.careType[careTypeIndex].subtypes.slice(index + 1),
			...itemData.careType[careTypeIndex].subtypes.slice(0, index),
		];
		insertNewCareType(careTypeIndex, newItemData);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(putImageToDb({ barcode: itemData.barcode, img: imgData }));
		dispatch(saveChanges(itemData));
		closeModalDispatch();
	};

	const handleChange = (
		e: ChangeEvent<HTMLInputElement> & ChangeEvent<HTMLTextAreaElement>
	) => {
		const name = e.target.name;
		const value = e.target.value;
		const file = e.target?.files ? e.target.files[0] : null;
		if (file) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.addEventListener('load', () => {
				const result = reader.result;
				const formattedData = result ? result : '';
				const stringData = formattedData.toString().trim();
				setImgData(stringData);
			});
		}
		setItemData({ ...itemData, [name]: value });
	};

	const handleClickOutside = () => {
		if (mouseDownOnModal) {
			setMouseDownOnModal(false);
			return;
		}
		closeModalDispatch();
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
		<aside className="modal-container" onClick={handleClickOutside}>
			<form
				className="modal-form"
				onSubmit={handleSubmit}
				onClick={handleClickOnModal}
				onMouseDown={handleMouseDownOnModal}
			>
				<div>
					<label className="modal-form__file-input" htmlFor="bookImg">
						Выберите файл
					</label>
					<input
						ref={fileInputRef}
						id="bookImg"
						type="file"
						accept="image/*"
						name="imgUrl"
						onChange={handleChange}
						required
						hidden
					/>
					<div className="modal-form__image-preview">
						{imgData && <img src={imgData} alt="Изображение товара" />}
						{!imgData && <p className="image-preview-text">Нет изображения</p>}
					</div>
					<label className="modal-form-label" htmlFor="name">
						Название товара
					</label>
					<input
						className="modal-form-input"
						id="name"
						type="text"
						name="name"
						value={itemData.name}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label className="modal-form-label" htmlFor="barcode">
						Штрихкод
					</label>
					<input
						className="modal-form-input"
						id="barcode"
						type="text"
						name="barcode"
						value={itemData.barcode}
						onChange={handleChange}
						required
					/>
					<label className="modal-form-label" htmlFor="vendorcode">
						Артикул
					</label>
					<input
						className="modal-form-input"
						id="vendorcode"
						type="text"
						name="vendorcode"
						value={itemData.vendorcode}
						onChange={handleChange}
						required
					/>
					<label className="modal-form-label" htmlFor="size">
						Размер
					</label>
					<input
						className="modal-form-input"
						id="size"
						type="number"
						name="size"
						value={itemData.size}
						onChange={handleChange}
						required
					/>
					<label className="modal-form-label" htmlFor="">
						Типы ухода
					</label>
					<div className="modal__caretype-container">
						{itemData.careType.map((item, index) => {
							const careTypeIndex = index;
							return (
								<div key={index}>
									<div className="modal__caretype">
										<p className="modal__caretype-header">Тип ухода:</p>
										<p className="modal__caretype-caretype">{item.type}</p>
										<Button
											type="button"
											icon={iconTrashcan}
											handleClick={() => deleteCareType(index)}
											additionalClass="button--modal-caretype"
										/>
									</div>
									<p className="modal__caretype-header modal__caretype-header--subtype">
										Подтипы ухода:
									</p>
									{item.subtypes.map((item, index) => {
										return (
											<div key={index}>
												<div className="modal__caretype modal__caretype--subtype">
													<p className="modal__caretype-caretype" key={index}>
														{item}
													</p>
													<Button
														type="button"
														icon={iconTrashcan}
														handleClick={() =>
															deleteCareSubtype(careTypeIndex, index)
														}
														additionalClass="button--modal-caretype button--modal-subtype"
													/>
												</div>
											</div>
										);
									})}
									<div className="modal-form__subtype-input-label-container">
										<label
											className="modal-form__subtype-input-label"
											htmlFor="subtype-input"
										>
											Добавить подтип ухода:
										</label>
										<div className="modal-form__subtype-input-container">
											<input
												className="modal-form-input modal-form-input--care-sub-type"
												value={subCareType[careTypeIndex]}
												id="subtype-input"
												onChange={(e) => {
													setSubCareTypeArray(careTypeIndex, e.target.value);
												}}
												type="text"
											/>
											<Button
												type="button"
												text="добавить"
												handleClick={() => submitSubtype(careTypeIndex)}
												additionalClass="button--modal-add-subtype"
											/>
										</div>
									</div>
								</div>
							);
						})}
						<div className="modal-form__subtype-input-label-container">
							<label
								className="modal-form__type-input-label"
								htmlFor="type-input"
							>
								Добавить тип ухода:
							</label>
							<input
								className="modal-form-input modal-form__type-input"
								type="text"
								id="type-input"
								value={careType}
								onChange={(e) => setCareType(e.target.value)}
							/>

							<Button
								type="button"
								text="добавить"
								handleClick={submitCareType}
								additionalClass="button--modal-add-subtype"
							/>
						</div>
					</div>
					<label className="modal-form-label" htmlFor="sizeType">
						Тип размера (мл,гр..)
					</label>
					<input
						className="modal-form-input"
						id="sizeType"
						type="text"
						name="sizeType"
						value={itemData.sizeType}
						onChange={handleChange}
						required
					/>
					<label className="modal-form-label" htmlFor="manufacturer">
						Производитель
					</label>
					<input
						className="modal-form-input"
						id="manufacturer"
						type="text"
						name="manufacturer"
						value={itemData.manufacturer}
						onChange={handleChange}
						required
					/>
					<label className="modal-form-label" htmlFor="brand">
						бренд
					</label>
					<input
						className="modal-form-input"
						id="brand"
						type="text"
						name="brand"
						value={itemData.brand}
						onChange={handleChange}
						required
					/>
					<label className="modal-form-label" htmlFor="price">
						Цена
					</label>
					<input
						className="modal-form-input"
						id="price"
						type="number"
						name="price"
						value={itemData.price}
						onChange={handleChange}
						required
					/>
					<label className="modal-form-label" htmlFor="description">
						Описание
					</label>
					<textarea
						className="modal-form-input"
						id="description"
						name="description"
						value={itemData.description}
						onChange={handleChange}
						required
					/>
				</div>
				<Button
					type="submit"
					text="Сохранить изменения"
					additionalClass="button--modal-add-subtype"
				/>
				<Button
					type="button"
					text="Отменить изменения"
					handleClick={() => {
						closeModalDispatch();
					}}
					additionalClass="button--modal-add-subtype"
				/>
			</form>
		</aside>
	);
};

export default AddEditItemModal;
