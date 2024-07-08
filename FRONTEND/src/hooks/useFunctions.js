const useFunctions = () => {
	// Generate the computer's move
	const generateComputerMove = (setComputerMove) => {
		const randomNumber = Math.floor(Math.random() * 3);

		if (randomNumber === 0) {
			setComputerMove("rock");
		} else if (randomNumber === 1) {
			setComputerMove("paper");
		} else {
			setComputerMove("scissors");
		}
	};

	return { generateComputerMove };
};

export default useFunctions;
