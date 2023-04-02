import logo from '../assets/images/footer_logo.png';
import InputWithButton from './InputWithButton';
import iconArrowRight from '../assets/images/icons_arrow-right.svg';
import iconDownload from '../assets/images/icons_download_white.png';
import Button from './Button';

const FooterLogoColumn = () => {
	return (
		<div className="footer-logo-column">
			<div className="footer-logo-column__logo-button-container">
				<a href="#">
					<img
						className="footer-logo-column__logo"
						src={logo}
						alt="Логотип сайта"
					/>
				</a>
				<Button
					additionalClass=" button--footer-logo-column"
					text="Прайс-лист"
					icon={iconDownload}
				/>
			</div>
			<p className="footer-logo-column__text">
				Компания «Султан» — снабжаем <br /> розничные магазины товарами <br />{' '}
				"под ключ" в Кокчетаве и Акмолинской области
			</p>
			<p className="footer-logo-column__input-description">
				Подпишись на скидки и акции
			</p>
			<InputWithButton
				placeholder="Введите ваш E-mail"
				icon={iconArrowRight}
				additionalClass="input-with-button--footer"
			/>
		</div>
	);
};
export default FooterLogoColumn;
