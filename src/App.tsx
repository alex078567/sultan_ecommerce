import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import AdminPanel from './pages/AdminPanel';

import CartPage from './pages/CartPage';
import CataloguePage from './pages/CataloguePage';
import ItemCardPage from './pages/ItemCardPage';
import AllRoutes from './pages/AllRoutes';
import MainPage from './pages/MainPage';
import ScrollToTop from './components/ScrollToTop';
function App() {
	return (
		<HashRouter>
			<ScrollToTop />
			<AllRoutes />
			{/* <Routes>
				<Route path="/" element={<Navigate to="/catalogue" />} />
				<Route path="/" element={<MainPage />}>
					<Route path="/catalogue" element={<CataloguePage />} />
					<Route path="/cart" element={<CartPage />} />
					<Route path="/admin" element={<AdminPanel />} />
					<Route path="/catalogue/:barcode" element={<ItemCardPage />} />
				</Route>
			</Routes> */}
		</HashRouter>
	);
}

export default App;
