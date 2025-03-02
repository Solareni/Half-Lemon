import { listen } from "@tauri-apps/api/event";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AppStore {
	theme: "light" | "dark";
	setTheme: (theme: "light" | "dark") => void;
	toggleTheme: () => void;

	searchSeleted: boolean;
	setSearchSeleted: (seleted: boolean) => void;

	thinkingSeleted: boolean;
	setThinkingSeleted: (seleted: boolean) => void;

	sidebarVisible: boolean;
	setSidebarVisible: (visible: boolean) => void;

	initialize: () => () => void;

	settingsVisible: boolean;
	setSettingsVisible: (visible: boolean) => void;

	beforeSettingsLocation: string;
	setBeforeSettingsLocation: (location: string) => void;

	tavilyApiKey: string,
	setTavilyApiKey: (location: string) => void;
}

const useAppStore = create<AppStore>(
	(set) => ({
		beforeSettingsLocation: "/",
		setBeforeSettingsLocation: (location) =>
			set({ beforeSettingsLocation: location }),

		theme: "light",
		setTheme: (theme) => set({ theme }),
		toggleTheme: () =>
			set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
		searchSeleted: false,
		setSearchSeleted: (seleted) => set({ searchSeleted: seleted }),
		thinkingSeleted: false,
		setThinkingSeleted: (seleted) => set({ thinkingSeleted: seleted }),

		sidebarVisible: true,
		setSidebarVisible: (visible) => set({ sidebarVisible: visible }),

		settingsVisible: false,
		setSettingsVisible: (visible) => set({ settingsVisible: visible }),

		tavilyApiKey: "",
		setTavilyApiKey: (key) => set({ tavilyApiKey: key }),

		initialize: () => {
			const unsubscribe = listen<string>("emit_event", (event) => {
				const payload = JSON.parse(event.payload);
				switch (payload.type) {
					case "sidebar_control":
						set((state) => ({ sidebarVisible: !state.sidebarVisible }));
						break;
					default:
						break;
				}
			});

			return () => {
				unsubscribe.then((unlisten) => unlisten());
			};
		},
	}),
);

export default useAppStore;
