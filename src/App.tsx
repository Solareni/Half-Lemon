import { Avatar, Box, Flex } from "@radix-ui/themes";
import { openSettingsWindow } from "./router";
import {
	LuSettings,
	LuSun,
	LuMoon,
	LuLibrary,
	LuMessageCircleMore,
} from "react-icons/lu";
import { useTranslation } from "react-i18next";
import useAppStore from "./appStore";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
	const { theme, toggleTheme } = useAppStore();
	const { t } = useTranslation();
	const LuTheme = theme === "light" ? LuSun : LuMoon;

	const handleOpenSettings = () => {
		openSettingsWindow(t("settings.title"));
	}
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
						<Link to="/chat">
							<LuMessageCircleMore className="w-5 h-5 hover:rounded-xl hover:bg-amber-200 hover:dark:bg-amber-800" />
						</Link>

						<Link to="/library">
							<LuLibrary className="w-5 h-5 hover:rounded-xl hover:bg-amber-200 hover:dark:bg-amber-800" />
						</Link>
					</Flex>

					<Flex direction="column" gap="5">
						<LuTheme
							className="w-5 h-5 hover:rounded-xl hover:bg-amber-200 hover:dark:bg-amber-800"
							onClick={toggleTheme}
						/>
						<LuSettings
							className="w-5 h-5 hover:rounded-xl hover:bg-amber-200 hover:dark:bg-amber-800"
							onClick={handleOpenSettings}
						/>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};
function App() {
	const { t } = useTranslation();
	return (
		<Flex direction="row">
			<Sidebar />
			<Box className="flex-1 rounded-tl-lg border border-gray-200 dark:border-gray-700">
				<Outlet />
			</Box>
		</Flex>
	);
}

export default App;
