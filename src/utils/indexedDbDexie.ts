import Dexie, { Table } from 'dexie';

export class ImageDatabase extends Dexie {
	// Declare implicit table properties.
	// (just to inform Typescript. Instanciated by Dexie in stores() method)
	images!: Table<ImageStorage, string>; // number = type of the primkey
	//...other tables goes here...

	constructor() {
		super('ImageDb');
		this.version(1).stores({
			images: 'barcode, img',
		});
	}
}

interface ImageStorage {
	barcode: string;
	img: string;
}
