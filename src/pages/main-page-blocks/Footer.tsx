import ContactsColumn from '../../components/ContactsColumn';
import FooterLogoColumn from '../../components/FooterLogoColumn';
import NavColumn from '../../components/NavColumn';
import PriceColumn from '../../components/PriceColumn';
const Footer = () => {
	return (
		<footer className="footer container">
			<FooterLogoColumn />
			<NavColumn
				header="Меню сайта:"
				listOfLinks={[
					{ linkName: 'О компании', linkHref: '#' },
					{ linkName: 'Доставка и оплата', linkHref: '#' },
					{ linkName: 'Возврат', linkHref: '#' },
					{ linkName: 'Контакты', linkHref: '#' },
				]}
			/>

			<NavColumn
				header="Категории:"
				listOfLinks={[
					{ linkName: 'Бытовая химия', linkHref: '#' },
					{ linkName: 'Косметика и гигиена', linkHref: '#' },
					{ linkName: 'Товары для дома', linkHref: '#' },
					{ linkName: 'Товары для детей и мам', linkHref: '#' },
					{ linkName: 'Посуда', linkHref: '#' },
				]}
			/>
			<PriceColumn />
			<ContactsColumn />
		</footer>
	);
};

export default Footer;
