import ListForSortCareType from './ListForSortCareType';

interface SortCareTypeSideProps {
	dataForSidebarCaretypes: {
		type: string;
		subtypes: string[];
	}[];
	careTypesFilter: string[];
}

const SortCareTypeSide: React.FC<SortCareTypeSideProps> = ({
	dataForSidebarCaretypes,
	careTypesFilter,
}) => {
	return (
		<div className="side-caretypes">
			{dataForSidebarCaretypes.map((item, index) => {
				return (
					<ListForSortCareType
						key={index}
						{...item}
						careTypesFilter={careTypesFilter}
					/>
				);
			})}
		</div>
	);
};
export default SortCareTypeSide;
