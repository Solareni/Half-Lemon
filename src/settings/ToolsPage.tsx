import { TextField, Text, Button, RadioGroup, Flex } from "@radix-ui/themes";
import { LuUpload, LuPlus } from "react-icons/lu";
import { Card } from "@radix-ui/themes";
import { useState } from "react";

// Tool configuration components
const WhisperConfig = () => (
	<Card className="p-4 space-y-4 rounded-lg">
		<div className="flex flex-col gap-2">
			<Text size="5" weight="bold">
				Whisper模型配置
			</Text>
			<Text size="2" color="gray">
				Whisper是一个开源的语音识别引擎
			</Text>
		</div>

		<div className="space-y-4">
			{/* Whisper Model Path */}
			<div>
				<Text as="label" size="2" mb="1" weight="medium" className="block">
					Whisper模型路径
				</Text>
				<div className="flex gap-2">
					<Button
						variant="surface"
						className="flex-1 justify-start truncate"
					>
						选择Whisper模型文件fdasgda
					</Button>
					<Button variant="soft">
						<LuUpload className="w-4 h-4" />
					</Button>
				</div>
			</div>

			{/* FFmpeg Path */}
			<div>
				<Text as="label" size="2" mb="1" weight="medium" className="block">
					FFmpeg执行文件路径
				</Text>
				<div className="flex gap-2">
					<Button
						variant="surface"
						className="flex-1 justify-start truncate"
					>
						选择FFmpeg执行文件
					</Button>
					<Button variant="soft">
						<LuUpload className="w-4 h-4" />
					</Button>
				</div>
			</div>

			{/* Inference Device Selection */}
			<div>
				<Text as="label" size="2" mb="1" weight="medium" className="block">
					推理设备
				</Text>
				<RadioGroup.Root defaultValue="cpu" variant="surface">
					<div className="grid grid-cols-2 gap-4">
						<RadioGroup.Item value="cpu">
							<Flex direction="column" width="100%">
								<Text as="div" size="2" weight="bold">
									CPU
								</Text>
								<Text as="div" color="gray" size="1">
									使用CPU进行推理
								</Text>
							</Flex>
						</RadioGroup.Item>
						<RadioGroup.Item value="gpu">
							<Flex direction="column" width="100%">
								<Text as="div" size="2" weight="bold">
									GPU
								</Text>
								<Text as="div" color="gray" size="1">
									使用GPU加速推理
								</Text>
							</Flex>
						</RadioGroup.Item>
					</div>
				</RadioGroup.Root>
			</div>

			{/* Whisper Prompt */}
			<div>
				<Text as="label" size="2" mb="1" weight="medium" className="block">
					Whisper提示词
				</Text>
				<textarea
					className="w-full h-24 p-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
					placeholder="输入Whisper提示词..."
				/>
			</div>
		</div>
	</Card>
);

const TavilyConfig = () => (
	<Card className="p-4 space-y-4 rounded-lg">
		<div className="flex flex-col gap-2">
			<Text size="5" weight="bold">
				Tavily
			</Text>
			<Text size="2" color="gray">
				Tavily是一个搜索引擎
			</Text>
		</div>
		<TextField.Root size="2" placeholder="Enter your Tavily API key" />
	</Card>
);

const KolorsConfig = () => (
	<Card className="p-4 space-y-4 rounded-lg">
		<div className="flex flex-col gap-2">
			<Text size="5" weight="bold">
				Kolors (SiliconFlow)
			</Text>
			<Text size="2" color="gray">
				Kolors是一个文生图模型，由SiliconFlow提供
			</Text>
		</div>
		<TextField.Root size="2" placeholder="Enter your SiliconFlow API key" />
	</Card>
);

const ToolsPage = () => {
	const [selectedTool, setSelectedTool] = useState("whisper");

	const tools = [
		{ id: "whisper", name: "Whisper模型配置" },
		{ id: "tavily", name: "Tavily" },
		{ id: "kolors", name: "Kolors (SiliconFlow)" }
	];

	const renderToolConfig = () => {
		switch (selectedTool) {
			case "whisper":
				return <WhisperConfig />;
			case "tavily":
				return <TavilyConfig />;
			case "kolors":
				return <KolorsConfig />;
			default:
				return <div>请选择一个工具进行配置</div>;
		}
	};

	return (
		<div className="flex h-full w-full">
			{/* Tools Sidebar */}
			<div className="w-56 h-full border-r border-gray-300 dark:border-gray-700 flex flex-col">
				
				
				{/* Tool List */}
				<div className="flex-1 overflow-y-auto">
					<ul className="p-2">
						{tools.map((tool) => (
							<li key={tool.id}>
								<button
									onClick={() => setSelectedTool(tool.id)}
									className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
										selectedTool === tool.id
											? "bg-gray-100 dark:bg-gray-700"
											: "hover:bg-gray-50 dark:hover:bg-gray-800"
									}`}
								>
									{tool.name}
								</button>
							</li>
						))}
					</ul>
				</div>
				
				{/* Add Button - Fixed at bottom */}
				<div className="p-3 border-t border-gray-300 dark:border-gray-700 mt-auto">
					<Button variant="soft" className="w-full flex items-center justify-center gap-1">
						<LuPlus className="w-4 h-4" />
						<span>添加工具</span>
					</Button>
				</div>
			</div>
			
			{/* Tool Configuration Area - Takes up all remaining space */}
			<div className="flex-1 h-full overflow-y-auto p-4">
				{renderToolConfig()}
			</div>
		</div>
	);
};

export default ToolsPage;
