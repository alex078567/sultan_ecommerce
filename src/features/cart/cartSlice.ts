import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JsonProps } from '../../interfaces/globalInterfaces';
import { ImageDatabase } from '../../utils/indexedDbDexie';
import {
	addDataToLocalStorage,
	getDataFromLocalStorage,
} from '../../utils/localStorage';

interface CardItem extends JsonProps {
	quantity: number;
}

interface ImageStorage {
	barcode: string;
	img: string;
}

interface CardItemsArray extends Array<CardItem> {}

interface CardState {
	listOfItems: CardItemsArray | [];
	images: ImageStorage[];
	isLoading: boolean;
	showModal: boolean;
}

const initialState: CardState = {
	listOfItems: getDataFromLocalStorage('productsInCart'),
	images: [],
	isLoading: true,
	showModal: false,
};

const db = new ImageDatabase();
export const loadImagesFromDb = createAsyncThunk(
	'images/loadImagesFromDb',
	async (_, thunkAPI) => {
		try {
			const allImages = await db.images.toArray();
			return allImages;
		} catch (error) {
			if (error instanceof Error) {
				return thunkAPI.rejectWithValue(error.message);
			} else {
				return thunkAPI.rejectWithValue('Unexpected error');
			}
		}
	}
);

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setShowModal: (state) => {
			state.showModal = true;
		},
		setHideModal: (state) => {
			state.showModal = false;
		},
		addItemToCart: (state, action: PayloadAction<JsonProps>) => {
			const { payload } = action;
			const itemIndex = state.listOfItems.findIndex((item) => {
				return item.barcode === payload.barcode;
			});
			if (itemIndex > -1) {
				return;
			} else {
				const item = { ...payload, quantity: 1 };
				state.listOfItems = [...state.listOfItems, item];
			}
		},
		addItemsToCart: (state, action: PayloadAction<CardItem>) => {
			const { payload } = action;
			const itemIndex = state.listOfItems.findIndex((item) => {
				return item.barcode === payload.barcode;
			});
			if (itemIndex > -1) {
				state.listOfItems[itemIndex].quantity += payload.quantity;
			} else {
				const item = { ...payload, quantity: payload.quantity };
				state.listOfItems = [...state.listOfItems, item];
			}
		},
		incrementItemQuantity: (state, action: PayloadAction<string>) => {
			const { payload } = action;
			const itemIndex = state.listOfItems.findIndex((item) => {
				return item.barcode === payload;
			});
			state.listOfItems[itemIndex].quantity += 1;
		},
		decrementItemQuantity: (state, action: PayloadAction<string>) => {
			const { payload } = action;
			const itemIndex = state.listOfItems.findIndex((item) => {
				return item.barcode === payload;
			});
			if (state.listOfItems[itemIndex].quantity > 1) {
				state.listOfItems[itemIndex].quantity -= 1;
			} else {
				state.listOfItems = state.listOfItems.filter(
					(item) => item.barcode !== payload
				);
			}
		},
		deleteItem: (state, action: PayloadAction<string>) => {
			const { payload } = action;
			state.listOfItems = state.listOfItems.filter(
				(item) => item.barcode !== payload
			);
		},
		addToStore: (state) => {
			addDataToLocalStorage('productsInCart', state.listOfItems);
		},
	},
	extraReducers(builder) {
		builder.addCase(loadImagesFromDb.fulfilled, (state, action) => {
			state.images = action.payload;
			state.isLoading = false;
		});
		builder.addCase(loadImagesFromDb.rejected, (state, action) => {
			const { payload } = action;
			state.isLoading = true;
			console.error(payload);
		});
	},
});

export const {
	addItemToCart,
	addItemsToCart,
	incrementItemQuantity,
	decrementItemQuantity,
	deleteItem,
	addToStore,
	setShowModal,
	setHideModal,
} = cartSlice.actions;
export default cartSlice.reducer;
