import { Box, Flex, ScrollArea, Text, TextField } from "@radix-ui/themes";
import {
	LuAudioLines,
	LuCirclePlus,
	LuImage,
	LuMessageCircleMore,
	LuSearch,
} from "react-icons/lu";
import { Virtuoso } from "react-virtuoso";
import items from "../mock";
import { memo } from "react";
import { NavLink } from "react-router-dom";
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
		<Box className="rounded-xl hover:bg-amber-200 hover:dark:bg-amber-800 px-0.5 py-1 my-2 mx-0.5 cursor-pointer">
			<Flex direction="row" justify="start" align="center" gap="2">
				<LuItemIcons className="w-4 h-4 text-blue-500 flex-shrink-0 block" />
				<Text className="text-gray-500 dark:text-gray-400" truncate>
					{item.title}
				</Text>
			</Flex>
		</Box>
	);
});
const ChatPage = () => {
	return (
		<Flex direction="row" className="h-full">
			<Flex
				direction="column"
				className="p-2 m-2 h-full w-1/7 border border-gray-200 dark:border-gray-700"
			>
				<TextField.Root placeholder="Search the docs…">
					<TextField.Slot>
						<LuSearch className="w-4 h-4" />
					</TextField.Slot>
				</TextField.Root>

				<ScrollArea scrollbars="vertical">
					<Virtuoso
						data={items}
						itemContent={(_, item) => <TitleRow item={item} />}
					/>
				</ScrollArea>
			</Flex>
			<Box className="flex-1 rounded-tl-lg border border-gray-200 dark:border-gray-700"></Box>
		</Flex>
	);
};

export default ChatPage;
