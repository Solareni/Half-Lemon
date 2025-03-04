import {
  Avatar,
  Box,
  Flex,
  ScrollArea,
  Text,
  TextField,
} from "@radix-ui/themes";
import {
  LuAudioLines,
  LuImage,
  LuMessageCircleMore,
  LuMoon,
  LuSearch,
  LuSettings,
  LuSun,
} from "react-icons/lu";
import {
  BsLayoutTextSidebarReverse,
  BsLayoutTextSidebar,
} from "react-icons/bs";
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
  const { theme, toggleTheme, sidebarVisible, setSidebarVisible } =
    useAppStore();
  const { t } = useTranslation();
  const LuTheme = theme === "light" ? LuSun : LuMoon;
  const LuSidebar = sidebarVisible
    ? BsLayoutTextSidebar
    : BsLayoutTextSidebarReverse;
  const handleOpenSettings = () => {
    openSettingsWindow(t("settings.title"));
  };
  return (
    <Flex direction="row" className="h-screen overflow-hidden">
      <Flex
        direction="column"
        className="py-2 m-2 h-full w-1/7"
      >
        <Flex direction="row" justify="between" align="center" gap="2">
          <Avatar fallback="A" size="3" variant="solid" radius="full" />
          <Box className="rounded-xl hover:bg-amber-200 hover:dark:bg-amber-800 p-2 -m-2">
            <BsLayoutTextSidebarReverse
              className="w-5 h-5"
              onClick={() => setSidebarVisible(!sidebarVisible)}
            />
          </Box>
        </Flex>

        <TextField.Root
          placeholder="Search the docs…"
          className="mt-2"
          radius="full"
        >
          <TextField.Slot>
            <LuSearch className="w-4 h-4" />
          </TextField.Slot>
        </TextField.Root>

        <ScrollArea scrollbars="vertical" className="mt-2 mb-2 rounded-lg border border-gray-200 dark:border-gray-700">
          <Virtuoso
            data={items}
            itemContent={(_, item) => <TitleRow item={item} />}
          />
        </ScrollArea>
      </Flex>
      <Flex
        direction="column"
        className="flex-1 rounded-tl-lg border border-gray-200 dark:border-gray-700"
      >
        <Flex direction="row" gap="5" justify="end" className="m-2 p-2">
          <Box className="rounded-xl hover:bg-amber-200 hover:dark:bg-amber-800 p-2 -m-2">
            <LuSettings className="w-5 h-5" onClick={handleOpenSettings} />
          </Box>
          <Box className="rounded-xl hover:bg-amber-200 hover:dark:bg-amber-800 p-2 -m-2">
            <LuTheme className="w-5 h-5" onClick={toggleTheme} />
          </Box>
          <Box className="rounded-xl hover:bg-amber-200 hover:dark:bg-amber-800 p-2 -m-2">
            <BsLayoutTextSidebar
              className="w-5 h-5"
              onClick={() => setSidebarVisible(!sidebarVisible)}
            />
          </Box>
        </Flex>
        <Outlet />
      </Flex>
    </Flex>
  );
};

export default App;
