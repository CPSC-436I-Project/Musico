import {TextButtonTest} from "./TextButtonTest";
import {EmptyPage} from "./EmptyPage";
import {ImageButtonTest} from "./ImageButtonTest";
import PopupTest from "./PopupTest";
import {HeaderTest} from "./HeaderTest";
import {TextInputTest} from "./TextInputTest";
import {SidebarTest} from "./SidebarTest";
import { VoteButtonTest } from "./VoteButtonTest";
import {ExpandableButtonTest} from "./ExpandableButtonTest";

export enum testScreen {
	EmptyPage,
	TextButtonTest,
	ExpandableButtonTest,
	ImageButtonTest,
	PopupTest,
	HeaderTest,
	TextInputTest,
	SidebarTest,
	VoteButtonTest,
}

export const testScreenMap: { [key: string]: { pointer: any, name: string } } = {
	[testScreen.EmptyPage]: {pointer: EmptyPage, name: "Empty Page"},
	[testScreen.TextButtonTest]: {pointer: TextButtonTest, name: "Text Button Page"},
	[testScreen.ExpandableButtonTest]: {pointer: ExpandableButtonTest, name: "Expandable Button Page"},
	[testScreen.ImageButtonTest]: {pointer: ImageButtonTest, name: "Image Button Page"},
	[testScreen.PopupTest]: {pointer: PopupTest, name: "Popup Page"},
	[testScreen.HeaderTest]: {pointer: HeaderTest, name: "Header Test Page"},
	[testScreen.TextInputTest]: {pointer: TextInputTest, name: "Text Input Page"},
	[testScreen.SidebarTest]: {pointer: SidebarTest, name: "Sidebar Test Page"},
	[testScreen.VoteButtonTest]: {pointer: VoteButtonTest, name: "Vote Button Test Page"}
}
