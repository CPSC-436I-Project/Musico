import {TextButtonTest} from "./TextButtonTest";
import {EmptyPage} from "./EmptyPage";

export enum testScreen {
	EmptyPage,
	TextButtonTest,
}

export const testScreenMap: { [key: string]: { pointer: any, name: string } } = {
	[testScreen.EmptyPage]: {pointer: EmptyPage, name: "Empty Page"},
	[testScreen.TextButtonTest]: {pointer: TextButtonTest, name: "Text Button Page"},
}
