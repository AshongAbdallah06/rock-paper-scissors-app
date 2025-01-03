/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState } from "react";
import useContextProvider from "../hooks/useContextProvider";
import closeIcon from "../images/icon-close-chat.svg";
import trashCan from "../images/trash-outline.svg";

const Chat = ({ setChatIsShowing, messages, setShowMessageAlert, setMessages }) => {
	const { socket, roomID, user, p1Username, p2Username, userExists } = useContextProvider();

	const [textMessage, setTextMessage] = useState("");
	const [chatIsFetched, setChatIsFetched] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setChatIsFetched(true);
		}, 2000);
	}, []);
	useEffect(() => {
		userExists &&
			localStorage.setItem(
				`room-${roomID}-${user.username}-messages`,
				JSON.stringify(messages)
			);
	}, [messages]);

	// ! find this
	const sendMessage = () => {
		socket.emit("message", { username: user.username, textMessage });

		setTextMessage("");
	};

	// ! find this
	const deleteChat = () => {
		localStorage.removeItem(`room-${roomID}-${user.username}-messages`);
		setMessages([]);

		messages.length > 0 &&
			socket.emit("message", { username: user.username, textMessage: " deleted the chat." });
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
							setShowMessageAlert(false);
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
						onClick={
							userExists
								? deleteChat
								: alert("You need to login to perform this action")
						}
					>
						<img
							src={trashCan}
							alt="Delete Chat"
							className="trash"
						/>
					</button>
				</div>

				{chatIsFetched && (
					<>
						<div className="chat-container">
							{p1Username && p2Username ? (
								<>
									<div className="messages">
										{messages.map(({ textMessage, username }, index) => (
											<>
												<div
													className={`${
														userExists &&
														(textMessage.includes("deleted")
															? "deleted"
															: username === user?.username
															? "person you"
															: "person other")
													}`}
													key={index}
												>
													<p className="username">
														{userExists &&
															(username === user.username
																? "You"
																: username)}
													</p>
													<p className="message">{textMessage}</p>
												</div>
											</>
										))}
									</div>

									<div className="input-container">
										<input
											value={textMessage}
											placeholder="Enter text message"
											onChange={(e) => {
												setTextMessage(e.target.value);
											}}
											onKeyDown={(e) => {
												if (e.key === "Enter" && textMessage !== "") {
													userExists
														? sendMessage()
														: alert(
																"You need to login to perform this action."
														  );
												}
											}}
										></input>
										<button
											onClick={() => {
												userExists && textMessage !== "" && sendMessage();
											}}
										>
											Send
										</button>
									</div>
								</>
							) : (
								<div className="messages left">Your Opponent left</div>
							)}
						</div>
					</>
				)}
				{!chatIsFetched && (
					<div className="lds-spinner">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				)}
			</div>
		</aside>
	);
};

export default Chat;
