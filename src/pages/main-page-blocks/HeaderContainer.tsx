import Header from '../sections/Header';
import HeaderMobile from '../sections/HeaderMobile';
import TopNavbar from '../sections/TopNavbar';
const HeaderContainer = () => {
	return (
		<>
			<TopNavbar />
			<Header />
			<HeaderMobile />
		</>
	);
};

export default HeaderContainer;
