import { Outlet } from 'react-router-dom';
import Breadcrumbs from '../../components/BreadCrumbs';
import { ImageDatabase } from '../../utils/indexedDbDexie';

import { useEffect, useState } from 'react';
import { imgData } from '../../data/dataForDb';

const Main = () => {
	const [isLoading, setIsLoading] = useState(true);
	const db = new ImageDatabase();

	useEffect(() => {
		db.images.count().then((exists) => {
			if (!exists) {
				db.images
					//	@ts-ignore
					.bulkAdd(imgData)
					.then(() => {
						setIsLoading(false);
					})
					.catch((e) => {});
			}
			if (exists) {
				const db = new ImageDatabase();
				db.images.count().then((first) => {});
				setIsLoading(false);
			}
		});
	}, [db.images]);

	return (
		<main className="container main-container">
			<Breadcrumbs />
			{isLoading || <Outlet />}
		</main>
	);
};

export default Main;
