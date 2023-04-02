import telIcon from '../assets/images/icons_telephone.svg';
import telIconStroke from '../assets/images/icons_telephone_stroke.svg';
interface TelNumberProps {
	telNumberData: string;
	workingHours: string;
	callBackText: string;
	callBackHref: string;
	additionalClass: string;
}

const TelNumberMobileBurger: React.FC<TelNumberProps> = ({
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
			<div className="telephone__number-container">
				<img
					className="telephome__tel-img-stroke"
					src={telIconStroke}
					alt="Телефон"
				/>
				<div className="telephone__department-container">
					<p className="telephone__department">Отдел продаж</p>
					<a className="telephone__number" href={telNumberHref}>
						{telNumberData}
					</a>
				</div>
			</div>
			<p className="telephone__working-hours">{workingHours}</p>

			<div className="telephone__callback-container">
				<div className="telephone__tel-img-white-container">
					<img
						className="telephone__tel-img-white"
						src={telIcon}
						alt="Телефон"
					/>
				</div>
				<a className="telephone__link" href={callBackHref}>
					{callBackText}
				</a>
			</div>
		</address>
	);
};

export default TelNumberMobileBurger;
