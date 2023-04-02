import { configureStore } from '@reduxjs/toolkit';
import catalogueSlice from './features/catalogue/catalogueSlice';
import cartSlice from './features/cart/cartSlice';
import adminSlice from './features/admin/adminSlice';
export const store = configureStore({
	reducer: {
		catalogue: catalogueSlice,
		cart: cartSlice,
		admin: adminSlice,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
