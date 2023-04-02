import { useState } from 'react';

interface ButtonMobileProps {
	text?: string;
	icon?: string;
	secondIcon?: string;
	useInnerState?: boolean;
	additionalClass?: string;
	type?: 'button' | 'reset' | 'submit' | undefined;
	handleClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonMobile: React.FC<ButtonMobileProps> = ({
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

			<img
				className="button__icon"
				src={toggleState && useInnerState ? secondIcon : icon}
				alt="Иконка"
			/>
		</button>
	);
};
export default ButtonMobile;
