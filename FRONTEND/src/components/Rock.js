import React from "react";
import rockIcon from "../images/icon-rock.svg";
import useFunctions from "../hooks/useFunctions";
import useCheckContext from "../hooks/useCheckContext";

const Rock = () => {
	const { setPlayerMove, setComputerMove } = useCheckContext();

	const { generateComputerMove } = useFunctions();
	return (
		<div
			className="gameOpt"
			onClick={() => {
				setPlayerMove("rock");
				generateComputerMove(setComputerMove);
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
