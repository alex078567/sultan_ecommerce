import Button from './Button';
import iconDownload from '../assets/images/icons_download_white.png';
import iconWhatsApp from '../assets/images/icons_whatsapp.png';
import iconTelegram from '../assets/images/icons_telegram.png';

const PriceColumn = () => {
	return (
		<div className="price-column">
			<p className="price-column__header">Скачать прайс-лист:</p>
			<Button
				additionalClass=" button--footer"
				text="Прайс-лист"
				icon={iconDownload}
			/>
			<p className="price-column__icons-header">Связь в мессенджерах:</p>
			<ul className="price-column__icons-list">
				<li>
					<a className="price-column__icon-link" href="#">
						<img
							className="price-column__icon-img"
							src={iconWhatsApp}
							alt="Иконка"
						/>
					</a>
				</li>
				<li>
					<a className="price-column__icon-link" href="#">
						<img
							className="price-column__icon-img"
							src={iconTelegram}
							alt="Иконка"
						/>
					</a>
				</li>
			</ul>
		</div>
	);
};
export default PriceColumn;
