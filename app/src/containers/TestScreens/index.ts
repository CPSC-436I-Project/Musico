import {TextButtonTest} from "./TextButtonTest";
import {EmptyPage} from "./EmptyPage";
import {ImageButtonTest} from "./ImageButtonTest";
import PopupTest from "./PopupTest";
import {HeaderTest} from "./HeaderTest";
import {TextInputTest} from "./TextInputTest";
import {SidebarTest} from "./SidebarTest";
import {ExpandableButtonTest} from "./ExpandableButtonTest";
import {VoteButtonTest} from "./VoteButtonTest";
import {MusicPlayerQueueTest} from "./MusicPlayerQueueTest";
import {InnerDashboardTest} from "./InnerDashboardTest";
import {InnerProfileTest} from "./InnerProfileTest";
import {ChatTest} from "./ChatTest";
import {MusicSidebarTest} from "./MusicSidebarTest";

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
	MusicPlayerQueueTest,
	InnerDashboardTest,
	InnerProfileTest,
	ChatTest,
	MusicSidebarTest,
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
	[testScreen.VoteButtonTest]: {pointer: VoteButtonTest, name: "Vote Button Test Page"},
	[testScreen.MusicPlayerQueueTest]: {pointer: MusicPlayerQueueTest, name: "Music Player Queue Test Page"},
	[testScreen.InnerDashboardTest]: {pointer: InnerDashboardTest, name: "Inner Dashboard Test Page"},
	[testScreen.InnerProfileTest]: {pointer: InnerProfileTest, name: "Inner Profile Test Page"},
	[testScreen.ChatTest]: {pointer: ChatTest, name: "Chat Page"},
	[testScreen.MusicSidebarTest]: {pointer: MusicSidebarTest, name: "Music Sidebar"},
}
