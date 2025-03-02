import {
	LuGlobe,
	LuGem,
	LuInfo,
	LuImage,
	LuCloud,
	LuMic,
} from "react-icons/lu";
import { FaTools } from "react-icons/fa";
import { Flex, Text, Box } from "@radix-ui/themes";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
const navItems = [
	{
		to: "/settings/llm",
		icon: LuCloud,
		label: "settings.sidebar.llmservice",
	},
	{
		to: "/settings/tools",
		icon: FaTools,
		label: "settings.sidebar.tools",
	},
	{
		to: "/settings/default",
		icon: LuGem,
		label: "settings.sidebar.defaultservice",
	},
	{
		to: "/settings/about",
		icon: LuInfo,
		label: "settings.sidebar.aboutme",
	},
];

const SettingsPage = () => {
	const { t } = useTranslation();
	return (
		<Flex direction="row">
			<Flex
				direction="column"
				align="start"
				className="items-center h-screen p-2"
			>
				<Flex direction="column" gap="5">
					{navItems.map((item) => (
						<NavLink to={item.to} key={item.to}>
							<Flex
								direction="row"
								justify="start"
								align="center"
								gap="1"
								className="hover:rounded-xl hover:bg-amber-200 hover:dark:bg-amber-800"
							>
								<item.icon className="w-5 h-5" />
								<Text>{t(item.label)}</Text>
							</Flex>
						</NavLink>
					))}
				</Flex>
			</Flex>
			<Box className="flex-1 rounded-tl-lg border border-gray-200 dark:border-gray-700">
				<Outlet />
			</Box>
		</Flex>
	);
};

export default SettingsPage;
