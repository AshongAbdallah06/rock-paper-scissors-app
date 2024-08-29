import React from "react";
import useCheckContext from "../hooks/useCheckContext";

const CopiedAlert = () => {
	const { roomID } = useCheckContext();
	return (
		<div className="copied-alert">
			Room ID: <span style={{ fontWeight: "bolder" }}>{roomID} </span>
			copied. <br />
			{/* Share to your friend to play against each other */}
		</div>
	);
};

export default CopiedAlert;
