import { Navigate, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import CataloguePage from './CataloguePage';
import CartPage from './CartPage';
import AdminPanel from './AdminPanel';
import ItemCardPage from './ItemCardPage';
import React from 'react';

const AllRoutes: React.FC = () => {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/catalogue" />} />
			<Route path="/" element={<MainPage />}>
				<Route path="/catalogue" element={<CataloguePage />} />
				<Route path="/cart" element={<CartPage />} />
				<Route path="/admin" element={<AdminPanel />} />
				<Route path="/catalogue/:barcode" element={<ItemCardPage />} />
			</Route>
		</Routes>
	);
};
export default AllRoutes;
