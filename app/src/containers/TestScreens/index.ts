import {TextButtonTest} from "./TextButtonTest";
import {EmptyPage} from "./EmptyPage";
import {ImageButtonTest} from "./ImageButtonTest";
import PopupTest from "./PopupTest";
import {HeaderTest} from "./HeaderTest";
import {TextInputTest} from "./TextInputTest";
import {SidebarTest} from "./SidebarTest";
import {VoteButtonTest} from "./VoteButtonTest";
import {MusicPlayerQueueTest} from "./MusicPlayerQueueTest";
import {InnerDashboardTest} from "./InnerDashboardTest";


export enum testScreen {
	EmptyPage,
	TextButtonTest,
	ImageButtonTest,
	PopupTest,
	HeaderTest,
	TextInputTest,
	SidebarTest,
	VoteButtonTest,
	MusicPlayerQueueTest,
	InnerDashboardTest
}

export const testScreenMap: { [key: string]: { pointer: any, name: string } } = {
	[testScreen.EmptyPage]: {pointer: EmptyPage, name: "Empty Page"},
	[testScreen.TextButtonTest]: {pointer: TextButtonTest, name: "Text Button Page"},
	[testScreen.ImageButtonTest]: {pointer: ImageButtonTest, name: "Image Button Page"},
	[testScreen.PopupTest]: {pointer: PopupTest, name: "Popup Page"},
	[testScreen.HeaderTest]: {pointer: HeaderTest, name: "Header Test Page"},
	[testScreen.TextInputTest]: {pointer: TextInputTest, name: "Text Input Page"},
	[testScreen.SidebarTest]: {pointer: SidebarTest, name: "Sidebar Test Page"},
	[testScreen.VoteButtonTest]: {pointer: VoteButtonTest, name: "Vote Button Test Page"},
	[testScreen.MusicPlayerQueueTest]: {pointer: MusicPlayerQueueTest, name: "Music Player Queue Test Page"},
	[testScreen.InnerDashboardTest]: {pointer: InnerDashboardTest, name: "Inner Dashboard Test Page"}
}
