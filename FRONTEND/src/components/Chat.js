import React, { useEffect, useRef, useState } from "react";
import closeIcon from "../images/icon-close-chat.svg";
import useCheckContext from "../hooks/useCheckContext";
import trashCan from "../images/trash-outline.svg";

const Chat = ({ setChatIsShowing }) => {
	const { socket, roomID, user } = useCheckContext();

	const [textMessage, setTextMessage] = useState("");
	const [messages, setMessages] = useState(
		JSON.parse(localStorage.getItem(`room-${roomID}-${user.username}-messages`)) || []
	);

	useEffect(() => {
		socket.on("message", (message) => {
			setMessages((prevMessages) => [...prevMessages, message]);
		});

		// Delete all messages
		socket.on("deleteMessage", () => {
			localStorage.removeItem(`room-${roomID}-${user.username}-messages`);
			setMessages([]);
		});

		return () => {
			socket.off("message");
		};
	}, [socket]);

	const messagesEndRef = useRef(null);
	useEffect(() => {
		localStorage.setItem(`room-${roomID}-${user.username}-messages`, JSON.stringify(messages));

		// Scroll to bottom
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const sendMessage = () => {
		socket.emit("message", { username: user.username, textMessage });

		setTextMessage("");
	};

	const deleteChat = () => {
		socket.emit("deleteMessage");
		localStorage.removeItem(`room-${roomID}-${user.username}-messages`);
		setMessages([]);
	};

	return (
		<aside>
			<div className="content">
				<header>
					<h1>Live Chat</h1>
					<img
						src={closeIcon}
						alt="close-icon"
						className="close-icon"
						onClick={() => {
							setChatIsShowing(false);
						}}
					/>
				</header>

				<div
					className="header2"
					style={{ fontSize: "0.8rem" }}
				>
					<p>Have a conversation with your opponent</p>
					<button
						className="delete"
						title="Delete Chat"
						onClick={deleteChat}
					>
						<img
							src={trashCan}
							alt="Delete Chat"
							className="trash"
						/>
					</button>
				</div>

				<div className="chat-container">
					<div className="messages">
						{messages.map((message, index) => (
							<div
								className="person"
								key={index}
							>
								<p className="username">
									<span
										className="name"
										style={{
											textTransform: "capitalize",
											fontWeight: "normal",
										}}
									>
										{message?.username === user.username
											? "You"
											: message?.username}
									</span>
								</p>
								<p className="message">{message.textMessage}</p>
								<div ref={messagesEndRef} />
							</div>
						))}
					</div>
				</div>
				<div className="input-container">
					<textarea
						type="text"
						value={textMessage}
						placeholder="Enter text message"
						onChange={(e) => {
							setTextMessage(e.target.value);
						}}
					></textarea>
					<button
						onClick={() => {
							textMessage !== "" && sendMessage();
						}}
					>
						Send
					</button>
				</div>
			</div>
		</aside>
	);
};

export default Chat;
