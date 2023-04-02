import Button from '../../components/Button';
import iconClose from '../../assets/images/icons_mobile_menu_open.svg';
import iconOpen from '../../assets/images/icons_mobile_menu_close.svg';
import logo from '../../assets/images/header_logo.png';
import iconSquares from '../../assets/images/icons_squares_black.svg';
import iconSearch from '../../assets/images/icons_search_black.svg';
import { Link } from 'react-router-dom';
import CartMobile from '../../components/CartMobile';
import InputWithButton from '../../components/InputWithButton';
import MobileSiteMenuBurger from '../../components/MobileSiteMenuBurger';
import { useState } from 'react';

const HeaderMobile = () => {
	const [showMenu, setShowMenu] = useState(false);
	return (
		<header className="mobile-header">
			<div className="mobile-header__top-panel">
				<Button
					icon={iconOpen}
					secondIcon={iconClose}
					additionalClass="button--mobile-nav-1"
					useInnerState={true}
					handleClick={() => setShowMenu(!showMenu)}
				/>
				<Link to="/">
					<img className="mobile-header__logo" src={logo} alt="Логотип сайта" />
				</Link>
				<CartMobile />
			</div>
			<div className="mobile-header__bottom-panel">
				<Button
					additionalClass="button--mobile-nav-2"
					text="Каталог"
					icon={iconSquares}
				/>
				<InputWithButton
					icon={iconSearch}
					additionalClass="input-with-button--mobile-nav"
					placeholder="Поиск"
					buttonClass="button--mobile-nav-input"
				/>
			</div>
			{showMenu && <MobileSiteMenuBurger />}
		</header>
	);
};
export default HeaderMobile;
