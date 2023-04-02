import { useState } from 'react';

interface ButtonProps {
	text?: string;
	icon?: string;
	secondIcon?: string;
	useInnerState?: boolean;
	additionalClass?: string;
	type?: 'button' | 'reset' | 'submit' | undefined;
	handleClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
	text,
	icon,
	secondIcon,
	additionalClass,
	type = 'button',
	handleClick = () => {},
	useInnerState = false,
}) => {
	const [toggleState, setToggleState] = useState(false);
	const classNameString = `button ${additionalClass}`;
	return (
		<button
			className={classNameString}
			type={type}
			onClick={() => {
				handleClick();
				useInnerState && setToggleState(!toggleState);
			}}
		>
			<span className="button__text">{text}</span>
			<div className="button__icon-container">
				<img
					className="button__icon"
					src={toggleState && useInnerState ? secondIcon : icon}
					alt="Иконка"
				/>
			</div>
		</button>
	);
};
export default Button;
