const useFunctions = () => {
	// Generate the computer's move
	const generateComputerMove = (setComputerMove) => {
		const randomNumber = Math.floor(Math.random() * 3);

		if (randomNumber === 0) {
			setComputerMove("r");
		} else if (randomNumber === 1) {
			setComputerMove("p");
		} else {
			setComputerMove("s");
		}
	};

	return { generateComputerMove };
};

export default useFunctions;
