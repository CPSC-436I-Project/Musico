import {TextButtonTest} from "./TextButtonTest";
import {EmptyPage} from "./EmptyPage";
import {ImageButtonTest} from "./ImageButtonTest";
import {TextInputTest} from "./TextInputTest";
import {LoginScreen} from "../LoginScreen";

export enum testScreen {
	EmptyPage,
	TextButtonTest,
	ImageButtonTest,
	TextInputTest,
	LoginScreen,
}

export const testScreenMap: { [key: string]: { pointer: any, name: string } } = {
	[testScreen.EmptyPage]: {pointer: EmptyPage, name: "Empty Page"},
	[testScreen.TextButtonTest]: {pointer: TextButtonTest, name: "Text Button Page"},
	[testScreen.ImageButtonTest]: {pointer: ImageButtonTest, name: "Image Button Page"},
	[testScreen.TextInputTest]: {pointer: TextInputTest, name: "Text Input Page"},
	[testScreen.LoginScreen]: {pointer: LoginScreen, name: "Login"},
}
