import logo from '../../assets/images/header_logo.png';
import iconSquares from '../../assets/images/icons_squares.svg';
import iconDownload from '../../assets/images/icons_download_white.svg';
import iconSearch from '../../assets/images/icons_search.svg';
import telOperatorAvatar from '../../assets/images/header_tel-operator.png';
import Cart from '../../components/Cart';
import Button from '../../components/Button';
import TelNumber from '../../components/TelNumber';
import InputWithButton from '../../components/InputWithButton';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<header className="header container">
			<Link to="/">
				<img className="header__logo" src={logo} alt="Логотип сайта" />
			</Link>
			<div className="header__resize-wrapper header__resize-wrapper--search">
				<Button
					additionalClass="button--catalogue"
					text="Каталог"
					icon={iconSquares}
				/>
				<InputWithButton
					icon={iconSearch}
					additionalClass="input-with-button--header"
					placeholder="Поиск..."
				/>
			</div>
			<TelNumber
				additionalClass="telephone--header"
				telNumberData="+7 (777) 490-00-91"
				workingHours="время работы: 9:00-20:00"
				callBackText="Заказать звонок"
				callBackHref="#"
			/>
			<img
				className="header__tel-operator"
				src={telOperatorAvatar}
				alt="Телефонный оператор"
			/>
			<div className="header__resize-wrapper header__resize-wrapper--cart">
				<Button
					additionalClass="button--price"
					text="Прайс-лист"
					icon={iconDownload}
				/>
				<Cart />
			</div>
		</header>
	);
};
export default Header;
