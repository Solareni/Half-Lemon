import { Box, Flex, Text } from "@radix-ui/themes";
import {
  LuAudioLines,
  LuCirclePlus,
  LuImage,
  LuMessageCircleMore,
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
    <Flex direction="row" justify="start" align="center" gap="2">
      <LuItemIcons className="w-4 h-4 text-blue-500 flex-shrink-0 block" />
      <Text className="text-gray-500 dark:text-gray-400" truncate>
        {item.title}
      </Text>
    </Flex>
  );
});
const ChatPage = () => {
  return (
    <Flex direction="column" className="p-2 m-2 h-full w-1/5">
      <Box className="rounded-xl hover:bg-amber-200 hover:dark:bg-amber-800 p-2 -m-2">
        <Flex direction="row" justify="start" align="center" gap="1">
          <LuCirclePlus className="w-4 h-4" />
          <Text>new chat</Text>
        </Flex>
      </Box>
      <Virtuoso
        className="flex-1"
        data={items}
        itemContent={(_, item) => <TitleRow item={item} />}
      />
    </Flex>
  );
};

export default ChatPage;
