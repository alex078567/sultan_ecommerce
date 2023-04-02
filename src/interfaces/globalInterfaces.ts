export interface JsonProps {
	sizeType: string;
	size: number;
	name: string;
	barcode: string;
	manufacturer: string;
	vendorcode: string;
	description: string;
	brand: string;
	price: number;
	careType: { type: string; subtypes: string[] }[];
}
export interface JsonPropsArray extends Array<JsonProps> {}
