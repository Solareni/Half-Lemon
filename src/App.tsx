import { Avatar, Box, Button, Flex, Separator, Theme,Text } from "@radix-ui/themes";
import { openSettingsWindow } from "./router";
import {
	LuSettings,
	LuSun,
	LuMoon,
	LuLibrary,
	LuMessageCircleMore,
	LuMusic,
	LuAudioLines,
	LuStar,
	LuMoonStar,
	LuStarHalf,
	LuStarOff,
} from "react-icons/lu";
import { useTranslation } from "react-i18next";
import useAppStore from "./appStore";

const Sidebar = () => {
	const { theme, toggleTheme } = useAppStore();
	const LuTheme = theme === "light" ? LuSun : LuMoon;
	return (
		<Flex direction="column" align="start">
			<Flex
				direction="column"
				gap="3"
				className="items-center h-screen px-1 py-2"
			>
				<Avatar fallback="A" size="3" variant="solid" radius="full" />
				<Flex direction="column" justify="between" className="flex-1">
					<Flex direction="column" gap="5">
						<LuMessageCircleMore className="w-5 h-5 hover:rounded-xl hover:bg-amber-200 hover:dark:bg-amber-800" />
						<LuLibrary className="w-5 h-5 hover:rounded-xl hover:bg-amber-200 hover:dark:bg-amber-800" />
						<LuAudioLines className="w-5 h-5 hover:rounded-xl hover:bg-amber-200 hover:dark:bg-amber-800" />
					</Flex>

					<Flex direction="column" gap="5">
						<LuTheme className="w-5 h-5 hover:rounded-xl hover:bg-amber-200 hover:dark:bg-amber-800" onClick={toggleTheme} />
						<LuSettings className="w-5 h-5 hover:rounded-xl hover:bg-amber-200 hover:dark:bg-amber-800" onClick={openSettingsWindow}/>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	)
};
function App() {
	const { t } = useTranslation();
	return (
		<Flex direction="row">
			<Sidebar />
			<Box className="flex-1 rounded-tl-lg border border-gray-200 dark:border-gray-700">

			</Box>
		</Flex>
	);
}

export default App;
