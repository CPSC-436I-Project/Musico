import {TextButtonTest} from "./TextButtonTest";
import {EmptyPage} from "./EmptyPage";
import {ImageButtonTest} from "./ImageButtonTest";
import {PopupTest} from "./PopupTest";


export enum testScreen {
	EmptyPage,
	TextButtonTest,
	ImageButtonTest,
	PopupTest,
}

export const testScreenMap: { [key: string]: { pointer: any, name: string } } = {
	[testScreen.EmptyPage]: {pointer: EmptyPage, name: "Empty Page"},
	[testScreen.TextButtonTest]: {pointer: TextButtonTest, name: "Text Button Page"},
	[testScreen.ImageButtonTest]: {pointer: ImageButtonTest, name: "Image Button Page"},
	[testScreen.PopupTest]: {pointer: PopupTest, name: "Popup Page"},
}
