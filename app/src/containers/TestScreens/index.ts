import {TextButtonTest} from "./TextButtonTest";
import {EmptyPage} from "./EmptyPage";
import {ExpandableButtonTest} from "./ExpandableButtonTest";

export enum testScreen {
	EmptyPage,
	TextButtonTest,
	ExpandableButtonTest,
}

export const testScreenMap: { [key: string]: { pointer: any, name: string } } = {
	[testScreen.EmptyPage]: {pointer: EmptyPage, name: "Empty Page"},
	[testScreen.TextButtonTest]: {pointer: TextButtonTest, name: "Text Button Page"},
	[testScreen.ExpandableButtonTest]: {pointer: ExpandableButtonTest, name: "Expandable Button Page"},
}
