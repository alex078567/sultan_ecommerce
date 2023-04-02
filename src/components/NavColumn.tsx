interface NavColumnProps {
	header: string;
	listOfLinks: Array<{ linkName: string; linkHref: string }>;
}

const NavColumn: React.FC<NavColumnProps> = ({ header, listOfLinks }) => {
	return (
		<nav className="nav-column">
			<p className="nav-column__header">{header}</p>
			<ul className="nav-column__list">
				{listOfLinks.map(({ linkName, linkHref }, index) => {
					return (
						<li key={index}>
							<a className="nav-column__link" href={linkHref}>
								{linkName}
							</a>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};
export default NavColumn;
