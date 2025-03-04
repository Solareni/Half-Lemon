import { useParams } from "react-router-dom";

const ChatDetailPage = () => {
	const { id } = useParams();
	return <div>ChatDetailPage {id}</div>;
};

export default ChatDetailPage;
