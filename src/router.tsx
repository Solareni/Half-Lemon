import { Navigate } from "react-router-dom";

import SettingsPage from "./Settings";
import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import useAppStore from "./appStore";
import { Theme } from "@radix-ui/themes";
import ChatPage from "./app/ChatPage";
import LibraryPage from "./app/LibraryPage";
import LLModelApiPage from "./settings/LLModelApiPage";
import ToolsPage from "./settings/ToolsPage";
import DefaultServicePage from "./settings/DefaultServicePage";
import AboutMePage from "./settings/AboutMePage";
import { useTranslation } from "react-i18next";
const ThemeApp = () => {
	const { theme } = useAppStore();
	return <Theme appearance={theme}> <App /> </Theme>;
};

const ThemeSettings = () => {
	const { theme } = useAppStore();
	return <Theme appearance={theme}> <SettingsPage /> </Theme>;
}

export const router = createBrowserRouter([
	{
		path: "/settings",
		element: <ThemeSettings />,
		children: [
			{ index: true, element: <LLModelApiPage /> },
			{
				path: "llm",
				element: <LLModelApiPage />,
			},
			{
				path: "tools",
				element: <ToolsPage />,
			},
			{
				path: "default",
				element: <DefaultServicePage />,
			},
			{
				path: "about",
				element: <AboutMePage />,
			},
		],
	},
	{
		path: "/",
		element: <ThemeApp />,
		children:[
			{index: true, element: <ChatPage />},
			{
				path: "chat",
				element: <ChatPage />,
			},
			{
				path: "library",
				element: <LibraryPage />,
			}
		]
	},
	{
		path: "*",
		element: (
			<Navigate
				to={
					window.location.search.includes("window=settings") ? "/settings" : "/"
				}
				replace
			/>
		),
	},
]);

export const openSettingsWindow = async (title:string) => {
	// 检查窗口是否已存在
	const webview = await WebviewWindow.getByLabel("settings");

	if (webview) {
		// 如果窗口已存在，可以调用focus方法使其获得焦点
		webview.setFocus();
	} else {
		// 创建新窗口
		const secondWindow = new WebviewWindow("settings", {
			url: "index.html?window=settings",
			title,
			x: 100,
			y: 100,
			width: 800,
			height: 600,
		});

		// 等待窗口加载完成
		secondWindow.once("tauri://created", () => {
			console.log("窗口已创建");
		});

		secondWindow.once("tauri://error", (e) => {
			console.error("窗口创建错误:", e);
		});
	}
};
