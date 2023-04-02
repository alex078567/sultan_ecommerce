import { ChangeEventHandler } from 'react';
import Button from './Button';

interface inputWithButtonProps {
	placeholder: string;
	icon: string;
	additionalClass: string;
	buttonClass?: string;
	onChangeFunction?: ChangeEventHandler<HTMLInputElement>;
	onReset?: ChangeEventHandler<HTMLInputElement>;
}

const InputWithButton: React.FC<inputWithButtonProps> = ({
	placeholder,
	icon,
	additionalClass,
	onChangeFunction,
	buttonClass = 'button--search',
}) => {
	const classNameString = `input-with-button ${additionalClass}`;
	return (
		<div className={classNameString}>
			<input
				className="input-with-button__input"
				type="text"
				name="search"
				placeholder={placeholder}
				onChange={onChangeFunction}
			/>
			<Button additionalClass={buttonClass} text="иконка" icon={icon} />
		</div>
	);
};

export default InputWithButton;
