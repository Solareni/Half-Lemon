import {
	Flex,
	ScrollArea,
	Separator,
	TextArea,
	Button,
} from "@radix-ui/themes";
import { LuGlobe, LuLibrary, LuPaperclip } from "react-icons/lu";
import { useParams } from "react-router-dom";
import { FaTools } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";

const chatInputItems = [
	{
		icon: FiEdit,
		label: null,
	},
	{
		icon: HiOutlineLightBulb,
		label: "沉思",
	},
	{
		icon: LuGlobe,
		label: "搜索",
	},
	{
		icon: LuPaperclip,
		label: "附件",
	},
	{
		icon: FaTools,
		label: "工具",
	},
	{
		icon: LuLibrary,
		label: "文档",
	},
];

const ChatInput = () => {
	return (
		<Flex direction="column" gap="2" className="p-2">
			<TextArea
				size="3"
				placeholder="描述你的问题，使用Shift+Enter执行"
				className="rounded-lg border border-gray-200"
				radius="large"
			/>
			<Flex direction="row" gap="2">
				{chatInputItems.map((item, index) => (
					<Button variant="soft" radius="full" key={index}>
						<item.icon className="w-4 h-4" />
						{item.label}
					</Button>
				))}
			</Flex>
		</Flex>
	);
};

const ChatDetailPage = () => {
	const { id } = useParams();
	return (
		<Flex direction="column" className="h-full">
			<ScrollArea scrollbars="vertical"></ScrollArea>
			<Separator my="2" size="4" />
			<ChatInput />
		</Flex>
	);
};

export default ChatDetailPage;
