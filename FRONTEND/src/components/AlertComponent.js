import { useEffect, useState } from "react";
import useContextProvider from "../hooks/useContextProvider";

const AlertComponent = ({ message, message1, setChatIsShowing, messages }) => {
	const { user } = useContextProvider();
	const [isNotificationAlert, setIsNotificationAlert] = useState(false);
	const [isEqual, setIsEqual] = useState(false);

	useEffect(() => {
		if (user) {
			if (message === "You have a new message") {
				setIsNotificationAlert(true);

				if (messages) {
					messages[messages.length - 1]?.username === user.username
						? setIsEqual(true)
						: setIsEqual(false);
				}
			}
		}
	}, [messages]);

	return (
		<>
			{!isNotificationAlert ? (
				<div className="alert">{message}</div>
			) : (
				!isEqual && (
					<div
						className="message-alert"
						onClick={() => setChatIsShowing(true)}
					>
						{message} <br />
						{message1}
					</div>
				)
			)}
		</>
	);
};

export default AlertComponent;
