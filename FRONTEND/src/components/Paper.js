import React from "react";
import paperIcon from "../images/icon-paper.svg";
import useFunctions from "../hooks/useFunctions";
import useCheckContext from "../hooks/useCheckContext";

const Paper = () => {
	const { moveOnclick } = useCheckContext();

	return (
		<div
			className="gameOpt"
			onClick={() => {
				moveOnclick("p");
			}}
		>
			<img
				src={paperIcon}
				alt="paper"
			/>
		</div>
	);
};

export default Paper;
