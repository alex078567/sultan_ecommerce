interface NavbarProps {
	arr: string[];
}

const NavbarMobileBurger: React.FC<NavbarProps> = ({ arr }) => {
	return (
		<div className="navbar-container">
			<p className="navbar-container__header">Меню сайта:</p>
			<nav className="navbar navbar--burger-menu">
				<ul className="navbar__list">
					{arr.map((listItem, item) => {
						return (
							<li key={item} className="navbar__list-item">
								<a className="navbar__list-anchor" href="#">
									{listItem}
								</a>
							</li>
						);
					})}
				</ul>
			</nav>
		</div>
	);
};
export default NavbarMobileBurger;
