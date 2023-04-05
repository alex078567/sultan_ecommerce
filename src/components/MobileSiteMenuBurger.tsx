import locationIcon from '../assets/images/icons_location.svg';
import mailIcon from '../assets/images/icons_mail.svg';
import iconDownload from '../assets/images/icons_download_white.svg';
import Address from './Address';
import Button from './Button';
import NavbarMobileBurger from './NavbarMobileBurger';
import TelNumberMobileBurger from './TelNumberMobileBurger';

const MobileSiteMenuBurger = () => {
	return (
		<div className="mobile-burger-background">
			<div className="mobile-burger">
				<div className="mobile-burger__address-phone">
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
					<TelNumberMobileBurger
						additionalClass="telephone--mobile-burger"
						telNumberData="+7 (777) 490-00-91"
						workingHours="время работы: 9:00-20:00"
						callBackText="Заказать звонок"
						callBackHref="#"
					/>
				</div>
				<NavbarMobileBurger
					arr={['О компании', 'Доставка и оплата', 'Возврат', 'Контакты']}
				/>
				<Button
					additionalClass="button--price button--price-burger-menu"
					text="Прайс-лист"
					icon={iconDownload}
				/>
			</div>
		</div>
	);
};
export default MobileSiteMenuBurger;
