interface AddressProps {
	anchorText: string;
	anchorHref: string;
	additionalText: string;
	additionalClass: string;
	icon: string;
}
const Address: React.FC<AddressProps> = ({
	anchorText,
	anchorHref,
	additionalText,
	additionalClass,
	icon,
}) => {
	const classNameString = `address ${additionalClass}`;
	return (
		<address className={classNameString}>
			<img className="address__icon" src={icon} alt="Иконка" />
			<div>
				<a className="address__link" href={anchorHref}>
					{anchorText}
				</a>
				<p className="address__additional-text">{additionalText}</p>
			</div>
		</address>
	);
};
export default Address;
