import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JsonProps } from '../../interfaces/globalInterfaces';
import json from '../../data/goods.json';
import { JsonPropsArray } from '../../interfaces/globalInterfaces';
import {
	getDataFromLocalStorage,
	addDataToLocalStorage,
	dataFromLocalStorage,
} from '../../utils/localStorage';
import { ImageDatabase } from '../../utils/indexedDbDexie';

interface ImageStorage {
	barcode: string;
	img: string;
}

interface AdminState {
	listOfItems: JsonPropsArray;
	showModal: boolean;
	barcodeForEdit: string;
	images: ImageStorage[];
	isLoading: boolean;
}

const initialState: AdminState = {
	listOfItems: getDataFromLocalStorage('cardItems'),
	showModal: false,
	barcodeForEdit: '00000000',
	images: [],
	isLoading: true,
};

const db = new ImageDatabase();

export const loadImagesFromDb = createAsyncThunk(
	'images/loadImagesToDb',
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

export const putImageToDb = createAsyncThunk(
	'images/putImageToDb',
	async ({ barcode, img }: { barcode: string; img: string }, thunkAPI) => {
		try {
			await db.images.put({ barcode, img }, barcode);
		} catch (error) {
			if (error instanceof Error) {
				return thunkAPI.rejectWithValue(error.message);
			} else {
				return thunkAPI.rejectWithValue('Unexpected error');
			}
		}
	}
);

export const removeImageFromDb = createAsyncThunk(
	'images/removeImageFromDb',
	async (barcode: string, thunkAPI) => {
		try {
			await db.images.delete(barcode);
		} catch (error) {
			if (error instanceof Error) {
				return thunkAPI.rejectWithValue(error.message);
			} else {
				return thunkAPI.rejectWithValue('Unexpected error');
			}
		}
	}
);

const adminSlice = createSlice({
	name: 'admin',
	initialState,
	reducers: {
		loadDataFromJson: (state) => {
			state.listOfItems = dataFromLocalStorage(json);
		},
		deleteFromList: (state, action: PayloadAction<string>) => {
			const { payload } = action;
			state.listOfItems = state.listOfItems.filter(
				(item) => item.barcode !== payload
			);
		},
		addToStore: (state) => {
			addDataToLocalStorage('cardItems', state.listOfItems);
		},
		closeModal: (state) => {
			state.showModal = false;
			state.barcodeForEdit = '00000000';
		},
		showModal: (state, action: PayloadAction<string>) => {
			const { payload } = action;
			state.barcodeForEdit = payload;
			state.showModal = true;
		},
		showModalNewData: (state) => {
			state.showModal = true;
		},
		saveChanges: (state, action: PayloadAction<JsonProps>) => {
			const { payload } = action;
			state.listOfItems = [
				...state.listOfItems.filter(
					(item) => item.barcode !== state.barcodeForEdit
				),
				payload,
			];
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
		builder.addCase(putImageToDb.rejected, (state, action) => {
			const { payload } = action;
			console.error(payload);
		});
		builder.addCase(removeImageFromDb.rejected, (state, action) => {
			const { payload } = action;
			console.error(payload);
		});
	},
});

export const {
	loadDataFromJson,
	deleteFromList,
	addToStore,
	closeModal,
	showModal,
	showModalNewData,
	saveChanges,
} = adminSlice.actions;
export default adminSlice.reducer;
