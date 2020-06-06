import {TextButtonTest} from "./TextButtonTest";
import {EmptyPage} from "./EmptyPage";
import {ImageButtonTest} from "./ImageButtonTest";
import {PopupTest} from "./PopupTest";
import {HeaderTest} from "./HeaderTest";
import {TextInputTest} from "./TextInputTest";
import {SidebarTest} from "./SidebarTest";

// TODO remove this later
import {LoginScreen} from "../LoginScreen";

export enum testScreen {
	EmptyPage,
	TextButtonTest,
	ImageButtonTest,
	PopupTest,
	HeaderTest,
	TextInputTest,
	SidebarTest,
	// TODO remove
	LoginScreen,
}

export const testScreenMap: { [key: string]: { pointer: any, name: string } } = {
	[testScreen.EmptyPage]: {pointer: EmptyPage, name: "Empty Page"},
	[testScreen.TextButtonTest]: {pointer: TextButtonTest, name: "Text Button Page"},
	[testScreen.ImageButtonTest]: {pointer: ImageButtonTest, name: "Image Button Page"},
	[testScreen.PopupTest]: {pointer: PopupTest, name: "Popup Page"},
	[testScreen.HeaderTest]: {pointer: HeaderTest, name: "Header Test Page"},
	[testScreen.TextInputTest]: {pointer: TextInputTest, name: "Text Input Page"},
	[testScreen.SidebarTest]: {pointer: SidebarTest, name: "Sidebar Test Page"},
	// TODO remove
	[testScreen.LoginScreen]: {pointer: LoginScreen, name: "Login"},
}
