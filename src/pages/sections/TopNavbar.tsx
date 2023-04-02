import Address from '../../components/Address';
import Navbar from '../../components/Navbar';
import locationIcon from '../../assets/images/icons_location.png';
import mailIcon from '../../assets/images/icons_mail.png';

const TopNavbar: React.FC = () => {
	return (
		<div className="top-navbar container">
			<div className="top-navbar__address">
				<Address
					additionalClass=""
					anchorText="г. Кокчетав, ул. Ж. Ташенова 129Б"
					anchorHref="#"
					additionalText="(Рынок Восточный)"
					icon={locationIcon}
				/>
				<Address
					additionalClass=""
					anchorText="opt.sultan@mail.ru"
					anchorHref="mailto:opt.sultan@mail.ru"
					additionalText="На связи в любое время"
					icon={mailIcon}
				/>
			</div>

			<Navbar
				arr={['О компании', 'Доставка и оплата', 'Возврат', 'Контакты']}
			/>
		</div>
	);
};
export default TopNavbar;
