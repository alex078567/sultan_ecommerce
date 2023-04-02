interface NavbarProps {
	arr: string[];
}

const Navbar: React.FC<NavbarProps> = ({ arr }) => {
	return (
		<nav className="navbar">
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
	);
};
export default Navbar;
