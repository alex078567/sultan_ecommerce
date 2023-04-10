import { useLocation, Link } from 'react-router-dom';
const breadCrumbsNames = new Map([
	['/', 'Главная'],
	['catalogue', 'Косметика и гигиена'],
	['cart', 'Корзина'],
	['admin', 'Панель администратора'],
]);
export default function Breadcrumbs() {
	const location = useLocation();
	let currentLink = '';

	const crumbs = location.pathname.split('/').filter((crumb) => crumb !== '');

	crumbs.unshift('/');

	const arrayOfLinks = crumbs.map((crumb, index) => {
		if (index < 2) {
			currentLink += `${crumb}`;
		} else {
			currentLink += `/${crumb}`;
		}

		const isDynamicRoute = parseInt(crumb);
		const linkName = isDynamicRoute
			? location.state.name
			: breadCrumbsNames.get(crumb);
		currentLink = isDynamicRoute ? '#' : currentLink;

		return (
			<li className="breadcrumbs__list-item" key={crumb}>
				{isDynamicRoute ? (
					<Link
						to={`/catalogue/${location.state.barcode}`}
						className="breadcrumbs__link"
						state={location.state}
					>
						{linkName}
					</Link>
				) : (
					<Link to={currentLink} className="breadcrumbs__link">
						{linkName}
					</Link>
				)}
			</li>
		);
	});
	return (
		<div className="breadcrumbs">
			<ul className="breadcrumbs__list">{arrayOfLinks}</ul>
		</div>
	);
}
