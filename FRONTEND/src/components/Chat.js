import React, { useEffect, useRef, useState } from "react";
import closeIcon from "../images/icon-close-chat.svg";
import useCheckContext from "../hooks/useCheckContext";

const Chat = ({ setChatIsShowing }) => {
	const { playerMove, socket } = useCheckContext();
	const [textMessage, setTextMessage] = useState("");
	const [messages, setMessages] = useState(JSON.parse(localStorage.getItem("messages")) || []);

	useEffect(() => {
		socket.on("message", (message) => {
			setMessages((prevMessages) => [...prevMessages, message]);
		});

		return () => {
			socket.off("message");
		};
	}, []);

	const messagesEndRef = useRef(null);
	useEffect(() => {
		localStorage.setItem("messages", JSON.stringify(messages));

		// Scroll to bottom
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const sendMessage = () => {
		socket.emit("message", textMessage);

		setTextMessage("");
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

				<div className="chat-container">
					<div className="messages">
						{messages.map((message, index) => (
							<div
								className="person"
								key={index}
							>
								<p className="name">Ashong</p>
								<p className="message">{message}</p>
								<div ref={messagesEndRef} />
							</div>
						))}
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
			</div>
		</aside>
	);
};

export default Chat;
