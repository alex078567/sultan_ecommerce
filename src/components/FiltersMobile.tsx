import { useState } from 'react';
import iconArrowDown from '../assets/images/icons_arrow_down_black.svg';
import iconArrowUp from '../assets/images/icons_arrow_up_black.svg';
import Button from './Button';
import SidebarFiltersMobile from './SidebarFiltersMobile';

interface FiltersMobileProps {
	dataForSidebarCaretypes: {
		type: string;
		subtypes: string[];
	}[];
	careTypesFilter: string[];
	changeCareTypesData: () => void;
}

const FiltersMobile: React.FC<FiltersMobileProps> = ({
	dataForSidebarCaretypes,
	careTypesFilter,
	changeCareTypesData,
}) => {
	const [showMenu, setShowMenu] = useState(false);
	return (
		<div className="mobile-filters">
			<Button
				additionalClass="button--mobile-filters"
				text="ПОДБОР ПО ПАРАМЕТРАМ"
				icon={iconArrowDown}
				secondIcon={iconArrowUp}
				useInnerState={true}
				handleClick={() => setShowMenu(!showMenu)}
			/>
			{showMenu && (
				<SidebarFiltersMobile
					changeCareTypesData={changeCareTypesData}
					dataForSidebarCaretypes={dataForSidebarCaretypes}
					careTypesFilter={careTypesFilter}
				/>
			)}
		</div>
	);
};
export default FiltersMobile;
