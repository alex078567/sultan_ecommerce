interface TelNumberProps {
	telNumberData: string;
	workingHours: string;
	callBackText: string;
	callBackHref: string;
	additionalClass: string;
}

const TelNumber: React.FC<TelNumberProps> = ({
	telNumberData,
	workingHours,
	callBackText,
	callBackHref,
	additionalClass,
}) => {
	const telNumberHref = `tel:${telNumberData}`;
	const classNameString = `telephone ${additionalClass}`;
	return (
		<address className={classNameString}>
			<a className="telephone__number" href={telNumberHref}>
				{telNumberData}
			</a>
			<p className="telephone__working-hours">{workingHours}</p>

			<a className="telephone__link" href={callBackHref}>
				{callBackText}
			</a>
		</address>
	);
};

export default TelNumber;
