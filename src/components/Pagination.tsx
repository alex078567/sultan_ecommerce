import iconArrowRight from '../assets/images/icons_arrow_right.svg';
import iconArrowLeft from '../assets/images/icons_arrow_left.svg';

interface PaginationProps {
	itemsPerPage: number;
	totalItems: number;
	currentPage: number;
	paginate: (pageNumber: number) => void;
	nextPage: () => void;
	previousPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
	itemsPerPage,
	totalItems,
	paginate,
	previousPage,
	nextPage,
	currentPage,
}) => {
	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
		pageNumbers.push(i);
	}
	return (
		<div className="pagination">
			<button
				className="pagination__button"
				onClick={() => {
					previousPage();
				}}
			>
				<img src={iconArrowLeft} alt="Стрелка влево" />
			</button>
			<div className="pagination__numbers-container">
				{pageNumbers.map((number) => {
					return (
						<button
							className={
								number === currentPage
									? 'pagination__button pagination__button--active'
									: 'pagination__button'
							}
							key={number}
							onClick={() => {
								paginate(number);
							}}
						>
							{number}
						</button>
					);
				})}
			</div>
			<button
				className="pagination__button"
				onClick={() => {
					nextPage();
				}}
			>
				<img src={iconArrowRight} alt="Стрелка вправо" />
			</button>
		</div>
	);
};
export default Pagination;
