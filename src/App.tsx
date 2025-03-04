import { Avatar, Box, Flex, ScrollArea, Text, TextField } from "@radix-ui/themes";
import {
	LuAudioLines,
	LuCirclePlus,
	LuImage,
	LuMessageCircleMore,
	LuMoon,
	LuSearch,
	LuSettings,
	LuSun,
} from "react-icons/lu";
import { Virtuoso } from "react-virtuoso";
import items from "./mock";
import { memo } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAppStore from "./appStore";
import { openSettingsWindow } from "./router";
// 定义聊天项的类型
interface ChatItem {
	title: string;
	date: string;
	id: string;
	type: "chat" | "audio" | "image";
}
const TitleRow = memo(({ item }: { item: ChatItem }) => {
	const LuItemIcons =
		item.type === "image"
			? LuImage
			: item.type === "audio"
			? LuAudioLines
			: LuMessageCircleMore;
	return (
		<NavLink to={`/chat/${item.id}`} key={item.id}>
			<Box className="rounded-xl hover:bg-amber-200 hover:dark:bg-amber-800 px-0.5 py-1 my-2 mx-0.5 cursor-pointer">
				<Flex direction="row" justify="start" align="center" gap="2">
					<LuItemIcons className="w-4 h-4 text-blue-500 flex-shrink-0 block" />
					<Text className="text-gray-500 dark:text-gray-400" truncate>
						{item.title}
					</Text>
				</Flex>
			</Box>
		</NavLink>
	);
});
const App = () => {
	const { theme, toggleTheme } = useAppStore();
	const { t } = useTranslation();
	const LuTheme = theme === "light" ? LuSun : LuMoon;

	const handleOpenSettings = () => {
		openSettingsWindow(t("settings.title"));
	};
	return (
		<Flex direction="row" className="h-screen overflow-hidden">
			<Flex
				direction="column"
				className="p-2 m-2 h-full w-1/7 border border-gray-200 dark:border-gray-700"
			>
				<Avatar fallback="A" size="3" variant="solid" radius="full" />

				<TextField.Root placeholder="Search the docs…" className="mt-2">
					<TextField.Slot>
						<LuSearch className="w-4 h-4" />
					</TextField.Slot>
				</TextField.Root>

				<ScrollArea scrollbars="vertical" className="mt-2">
					<Virtuoso
						data={items}
						itemContent={(_, item) => <TitleRow item={item} />}
					/>
				</ScrollArea>

				<Flex direction="row" gap="5" justify="center" className="m-2 p-2">
					<Box className="rounded-xl hover:bg-amber-200 hover:dark:bg-amber-800 p-2 -m-2">
						<LuTheme className="w-5 h-5" onClick={toggleTheme} />
					</Box>
					<Box className="rounded-xl hover:bg-amber-200 hover:dark:bg-amber-800 p-2 -m-2">
						<LuSettings className="w-5 h-5" onClick={handleOpenSettings} />
					</Box>
				</Flex>
			</Flex>
			<Box className="flex-1 rounded-tl-lg border border-gray-200 dark:border-gray-700">
				<Outlet />
			</Box>
		</Flex>
	);
};

export default App;
