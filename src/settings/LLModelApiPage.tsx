import { LuPlus, LuX } from "react-icons/lu";
import { useState } from "react";
import {
	Badge,
	Box,
	Button,
	ContextMenu,
	Select,
	Text,
	TextField,
	Card,
} from "@radix-ui/themes";
import { useTranslation } from "react-i18next";
import { Virtuoso } from "react-virtuoso";

interface LLMConfig {
	id: string;
	name: string;
	type: "OpenAI" | "Anthropic" | "Gemini";
	apiKey: string;
	apiEndpoint: string;
	availableModels: string[];
	normalModels: string[];
}

const llmConfig: LLMConfig[] = [
	{
		id: "deepseek",
		name: "DeepSeek",
		type: "OpenAI",
		apiKey: "",
		apiEndpoint: "https://api.deepseek.com/v1",
		availableModels: ["deepseek-chat", "deepseek-resoner"],
		normalModels: ["deepseek-chat", "deepseek-resoner"],
	},
	{
		id: "openai",
		name: "OpenAI",
		type: "OpenAI",
		apiKey: "",
		apiEndpoint: "https://api.openai.com/v1",
		availableModels: ["gpt-4", "gpt-4o", "gpt-4o-mini"],
		normalModels: ["gpt-4", "gpt-4o", "gpt-4o-mini"],
	},
];

const LLModelApiPage = () => {
	const [selectedConfig, setSelectedConfig] = useState<LLMConfig | null>(llmConfig[0]);
	const [configs, setConfigs] = useState<LLMConfig[]>(llmConfig);
	const [modelInput, setModelInput] = useState("");
	const { t } = useTranslation();

	// 通用的配置更新函数
	const updateConfig = (field: keyof LLMConfig, value: any) => {
		if (!selectedConfig) return;

		const newConfigs = configs.map((c) =>
			c.id === selectedConfig.id ? { ...c, [field]: value } : c
		);
		setConfigs(newConfigs);
		setSelectedConfig({ ...selectedConfig, [field]: value });
	};

	// 模型管理相关函数
	const addModel = (model: string) => {
		if (!selectedConfig) return;

		const newModels = [...selectedConfig.availableModels, model];
		updateConfig("availableModels", newModels);
		setModelInput("");
	};

	const removeModel = (index: number) => {
		if (!selectedConfig) return;

		const newModels = selectedConfig.availableModels.filter(
			(_, i) => i !== index
		);
		updateConfig("availableModels", newModels);
	};

	const handleModelInputChange = (value: string) => {
		setModelInput(value);
	};

	// 配置管理相关函数
	const handleEditConfig = (config: LLMConfig) => {
		setSelectedConfig(config);
	};

	const handleDuplicateConfig = (config: LLMConfig) => {
		const newConfig = {
			...config,
			id: Date.now().toString(),
			name: `${config.name} (Copy)`,
		};
		setConfigs([...configs, newConfig]);
	};

	const handleDeleteConfig = (configId: string) => {
		const newConfigs = configs.filter((c) => c.id !== configId);
		setConfigs(newConfigs);
		if (selectedConfig?.id === configId) {
			setSelectedConfig(newConfigs.length > 0 ? newConfigs[0] : null);
		}
	};

	const handleAddConfig = () => {
		const newConfig: LLMConfig = {
			id: Date.now().toString(),
			name: "New API",
			type: "OpenAI",
			apiKey: "",
			apiEndpoint: "",
			availableModels: [],
			normalModels: [],
		};
		setConfigs([...configs, newConfig]);
		setSelectedConfig(newConfig);
	};

	return (
		<div className="flex h-full w-full">
			{/* API Providers Sidebar */}
			<div className="w-56 h-full border-r border-gray-300 dark:border-gray-700 flex flex-col">
				{/* Provider List with Virtuoso - Flex-grow to take all available space */}
				<div className="flex-grow overflow-hidden">
					<Virtuoso
						style={{ height: '100%', width: '100%' }}
						totalCount={configs.length}
						itemContent={(index) => {
							const config = configs[index];
							return (
								<div className="p-2">
									<ContextMenu.Root>
										<ContextMenu.Trigger>
											<button
												onClick={() => setSelectedConfig(config)}
												className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
													selectedConfig?.id === config.id
														? "bg-gray-100 dark:bg-gray-700"
														: "hover:bg-gray-50 dark:hover:bg-gray-800"
												}`}
											>
												{config.name}
											</button>
										</ContextMenu.Trigger>
										<ContextMenu.Content>
											<ContextMenu.Item onClick={() => handleEditConfig(config)}>
												{t("settings.llm.edit")}
											</ContextMenu.Item>
											<ContextMenu.Item onClick={() => handleDuplicateConfig(config)}>
												{t("settings.llm.duplicate")}
											</ContextMenu.Item>
											<ContextMenu.Separator />
											<ContextMenu.Item onClick={() => handleDeleteConfig(config.id)}>
												{t("settings.llm.delete")}
											</ContextMenu.Item>
										</ContextMenu.Content>
									</ContextMenu.Root>
								</div>
							);
						}}
					/>
				</div>
				
				{/* Add Button - Fixed at bottom using flex-shrink-0 */}
				<div className="flex-shrink-0 p-3 border-t border-gray-300 dark:border-gray-700">
					<Button 
						variant="soft" 
						className="w-full flex items-center justify-center gap-1"
						onClick={handleAddConfig}
					>
						<LuPlus className="w-4 h-4" />
						<span>{t("settings.llm.add")}</span>
					</Button>
				</div>
			</div>
			
			{/* Provider Configuration Area - Takes up all remaining space */}
			<div className="flex-1 h-full overflow-y-auto p-4">
				{selectedConfig && (
					<Card className="space-y-4 rounded-lg">
						<div className="flex flex-col gap-2">
							<Text size="5" weight="bold">
								{selectedConfig.name || "New API"}
							</Text>
							<Text size="2" color="gray">
								配置LLM API密钥和设置
							</Text>
						</div>
						<div className="space-y-6">
							<Box>
								<Text as="label" size="2" mb="2" weight="medium">
									{t("settings.llm.name")}
								</Text>
								<TextField.Root
									size="2"
									value={selectedConfig.name}
									onChange={(e) => updateConfig("name", e.target.value)}
									placeholder={t("settings.llm.namePlaceholder")}
								/>
							</Box>

							<Box>
								<div className="flex items-center gap-4">
									<Text as="label" size="2" weight="medium">
										{t("settings.llm.type")}
									</Text>
									<Select.Root
										value={selectedConfig.type}
										onValueChange={(value: "OpenAI" | "Anthropic" | "Gemini") => {
											updateConfig("type", value);
										}}
									>
										<Select.Trigger />
										<Select.Content>
											<Select.Item value="OpenAI">OpenAI</Select.Item>
											<Select.Item value="Anthropic">Anthropic</Select.Item>
											<Select.Item value="Gemini">Gemini</Select.Item>
										</Select.Content>
									</Select.Root>
								</div>
							</Box>

							<Box>
								<Text as="label" size="2" mb="2" weight="medium">
									{t("settings.llm.apiKey")}
								</Text>
								<TextField.Root
									size="2"
									type="password"
									value={selectedConfig.apiKey}
									onChange={(e) => updateConfig("apiKey", e.target.value)}
									placeholder={t("settings.llm.apiKeyPlaceholder")}
								/>
							</Box>

							<Box>
								<Text as="label" size="2" mb="2" weight="medium">
									{t("settings.llm.apiEndpoint")}
								</Text>
								<TextField.Root
									size="2"
									value={selectedConfig.apiEndpoint}
									onChange={(e) => updateConfig("apiEndpoint", e.target.value)}
									placeholder={t("settings.llm.apiEndpointPlaceholder")}
								/>
							</Box>

							<Box>
								<Text as="label" size="2" mb="2" weight="medium">
									{t("settings.llm.availableModels")}
								</Text>
								<TextField.Root
									size="2"
									value={modelInput}
									onChange={(e) => handleModelInputChange(e.target.value)}
									onKeyDown={(e) => {
										if (e.key === "Enter" && e.currentTarget.value.trim()) {
											e.preventDefault();
											addModel(e.currentTarget.value.trim());
										}
									}}
									placeholder={t("settings.llm.availableModelsPlaceholder")}
								/>
							</Box>
							<div className="mt-2 flex flex-wrap gap-2">
								{selectedConfig.availableModels
									.filter((model) => model.trim())
									.map((model, index) => (
										<Badge key={index} size="2">
											{model}
											<Button
												variant="ghost"
												className="ml-1 p-0"
												onClick={() => removeModel(index)}
											>
												<LuX className="w-3 h-3" />
											</Button>
										</Badge>
									))}
							</div>
						</div>
					</Card>
				)}
			</div>
		</div>
	);
};

export default LLModelApiPage;
