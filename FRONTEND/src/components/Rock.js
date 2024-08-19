import React from "react";
import rockIcon from "../images/icon-rock.svg";
import useFunctions from "../hooks/useFunctions";
import useCheckContext from "../hooks/useCheckContext";

const Rock = () => {
	const { moveOnclick } = useCheckContext();

	return (
		<div
			className="gameOpt"
			onClick={() => {
				moveOnclick("r");
			}}
		>
			<img
				src={rockIcon}
				alt="rock"
			/>
		</div>
	);
};

export default Rock;
