import React, { useEffect, useState } from "react";
import useCheckContext from "../hooks/useCheckContext";

const AvailableRooms = () => {
	const { socket } = useCheckContext();

	const [activeRooms, setActiveRooms] = useState(null);

	useEffect(() => {
		socket.on("active-rooms", (active) => {
			if (active) {
				setActiveRooms(Object.keys(active));
			} else {
				setActiveRooms(null);
			}
		});
	}, [socket]);

	return (
		<div className="room-container">
			<h1>Active Rooms</h1>
			{activeRooms ? (
				activeRooms?.map((room) => (
					<div>
						<p className="name">{room}</p>

						<button>Join</button>
					</div>
				))
			) : (
				<p>No room available</p>
			)}
		</div>
	);
};

export default AvailableRooms;
