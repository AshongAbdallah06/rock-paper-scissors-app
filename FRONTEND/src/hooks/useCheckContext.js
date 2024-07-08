import { useContext } from "react";
import { CheckContext } from "../context/CheckContextProvider";

const useCheckContext = () => {
	const context = useContext(CheckContext);

	if (!context) {
		throw Error("useCheckContext must be used inside a CheckContextProvider");
	}

	return context;
};

export default useCheckContext;
