import { Navigate } from "react-router-dom";

import Settings from "./Settings";
import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import useAppStore from "./appStore";
import { Theme } from "@radix-ui/themes";

const ThemeApp = () => {
	const { theme } = useAppStore();
	return <Theme appearance={theme}> <App /> </Theme>;
};

const ThemeSettings = () => {
	const { theme } = useAppStore();
	return <Theme appearance={theme}> <Settings /> </Theme>;
}

export const router = createBrowserRouter([
	{
		path: "/settings",
		element: <ThemeSettings />,
	},
	{
		path: "/",
		element: <ThemeApp />,
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

export const openSettingsWindow = async () => {
	// 检查窗口是否已存在
	const webview = await WebviewWindow.getByLabel("settings");

	if (webview) {
		// 如果窗口已存在，可以调用focus方法使其获得焦点
		webview.setFocus();
	} else {
		// 创建新窗口
		const secondWindow = new WebviewWindow("settings", {
			url: "index.html?window=settings",
			title: "第二个窗口",
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
