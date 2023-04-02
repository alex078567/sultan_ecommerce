import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AdminPanel from './pages/AdminPanel';

import CartPage from './pages/CartPage';
import CataloguePage from './pages/CataloguePage';
import ItemCardPage from './pages/ItemCardPage';

import MainPage from './pages/MainPage';
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Navigate to="/catalogue" />} />
				<Route path="/" element={<MainPage />}>
					<Route path="/catalogue" element={<CataloguePage />} />
					<Route path="/cart" element={<CartPage />} />
					<Route path="/admin" element={<AdminPanel />} />
					<Route path="/catalogue/:barcode" element={<ItemCardPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
