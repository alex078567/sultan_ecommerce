import Address from './Address';
import TelNumber from './TelNumber';
import mailIcon from '../assets/images/icons_mail.svg';
import visaIcon from '../assets/images/icons_visa.png';
import mastercardIcon from '../assets/images/icons_mastercard.png';

const ContactsColumn = () => {
	return (
		<div className="contacts-column">
			<p className="contacts-column__header">Контакты:</p>
			<TelNumber
				additionalClass="telephone--footer"
				telNumberData="+7 (777) 490-00-91"
				workingHours="время работы: 9:00-20:00"
				callBackText="Заказать звонок"
				callBackHref="#"
			/>
			<Address
				additionalClass="address--footer"
				anchorText="opt.sultan@mail.ru"
				anchorHref="mailto:opt.sultan@mail.ru"
				additionalText="На связи в любое время"
				icon={mailIcon}
			/>
			<ul className="contacts-column__icons-list">
				<li>
					<a className="contacts-column__icon-link" href="#">
						<img
							className="contacts-column__icon-img"
							src={visaIcon}
							alt="Иконка"
						/>
					</a>
				</li>
				<li>
					<a className="contacts-column__icon-link" href="#">
						<img
							className="contacts-column__icon-img"
							src={mastercardIcon}
							alt="Иконка"
						/>
					</a>
				</li>
			</ul>
		</div>
	);
};
export default ContactsColumn;
