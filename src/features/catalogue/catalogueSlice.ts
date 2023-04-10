import { dataFromLocalStorage } from '../../utils/localStorage';
import { ImageDatabase } from '../../utils/indexedDbDexie';
import { JsonPropsArray } from '../../interfaces/globalInterfaces';
import json from '../../data/goods.json';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
const db = new ImageDatabase();

interface FormData {
	priceMin: number;
	priceMax: number;
	producers: string[];
}

interface ImageStorage {
	barcode: string;
	img: string;
}

interface CatalogueState {
	listOfItems: JsonPropsArray;
	filter: string;
	careTypesFilter: string[];
	images: ImageStorage[];
	isLoading: boolean;
	priceMin: number;
	priceMax: number;
	producers: string[];
}

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

const initialState: CatalogueState = {
	listOfItems: dataFromLocalStorage(json),
	filter: 'a-z',
	careTypesFilter: [],
	images: [],
	isLoading: true,
	priceMin: 0,
	priceMax: 10000,
	producers: [],
};

const catalogueSlice = createSlice({
	name: 'catalogue',
	initialState,
	reducers: {
		orderFilter: (state, action: PayloadAction<string>) => {
			const { payload } = action;
			state.filter = payload;
		},
		priceProducerFilter: (state, action: PayloadAction<FormData>) => {
			const {
				payload: { priceMax, priceMin, producers },
			} = action;
			state.priceMax = priceMax;
			state.priceMin = priceMin;
			state.producers = producers;
		},
		careTypeFilter: (state, action: PayloadAction<string>) => {
			const { payload } = action;
			if (payload.length === 0) {
				state.careTypesFilter = [];
				return;
			}
			const indexOfElement = state.careTypesFilter.indexOf(payload);
			const careTypeFilterArray = [...state.careTypesFilter];
			state.careTypesFilter =
				indexOfElement > -1
					? careTypeFilterArray.filter((_, index) => index !== indexOfElement)
					: [...careTypeFilterArray, payload];
		},
		allFiltersOnState: (state) => {
			state.listOfItems = initialState.listOfItems.filter(
				(item) => item.price > state.priceMin && item.price < state.priceMax
			);

			if (state.producers.length > 0) {
				state.listOfItems = state.listOfItems.filter((item) => {
					for (const producer of state.producers) {
						if (item.manufacturer === producer) return true;
					}
					return false;
				});
			}

			if (state.careTypesFilter.length > 0) {
				state.listOfItems = state.listOfItems.filter((item) => {
					const careTypesArray = item.careType
						.map((careTypeObject) => {
							return [careTypeObject.type, ...careTypeObject.subtypes];
						})
						.flat(1);
					return state.careTypesFilter.some((caretype) =>
						careTypesArray.includes(caretype)
					);
				});
			}

			switch (state.filter) {
				case 'a-z':
					state.listOfItems = state.listOfItems.sort(
						(a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0)
					);

					break;
				case 'z-a':
					state.listOfItems = state.listOfItems.sort(
						(a, b) => b.name.charCodeAt(0) - a.name.charCodeAt(0)
					);
					break;
				case 'lowestToHighest':
					state.listOfItems = state.listOfItems.sort(
						(a, b) => a.price - b.price
					);
					break;
				case 'highestToLowest':
					state.listOfItems = state.listOfItems.sort(
						(a, b) => b.price - a.price
					);
			}
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
	orderFilter,
	priceProducerFilter,
	careTypeFilter,
	allFiltersOnState,
} = catalogueSlice.actions;
export default catalogueSlice.reducer;
