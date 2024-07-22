import { useEffect } from "react";
import useCheckContext from "./useCheckContext";
import Axios from "axios";

const useGetHome = () => {
	const { setUserExist } = useCheckContext();

	const user = JSON.parse(localStorage.getItem("user"));
	const getHome = async () => {
		try {
			await Axios.get("http://localhost:4000/api/user/", {
				headers: { Authorization: `Bearer ${user.token}` },
			});

			setUserExist(true);
		} catch (error) {
			setUserExist(false);
		}
	};

	return { getHome };
};

export default useGetHome;
