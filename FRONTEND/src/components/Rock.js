import React, { useContext } from "react";
import rockIcon from "../images/icon-rock.svg";
import { GameContext } from "../App";
import useFunctions from "../hooks/useFunctions";

const Rock = () => {
	const { setPlayerMove, setComputerMove } = useContext(GameContext);

	const { generateComputerMove } = useFunctions();
	return (
		<div
			className="gameOpt"
			onClick={() => {
				setPlayerMove("r");
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
