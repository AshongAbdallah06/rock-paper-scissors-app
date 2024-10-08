import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Axios from "axios";
import useCheckContext from "../hooks/useCheckContext";


const Login = () => {
	const { setUserExists } = useCheckContext();
	const Schema = yup.object().shape({
		email: yup
			.string()
			.required("This field is required")
			.matches(
				/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
				"Please enter a valid email address"
			),
		username: yup
			.string()
			.required("This field is required")
			.matches(/^\w{3,}$/, "Invalid username format"),
		password: yup
			.string()
			.required("This field is required")
			.min(8, "Password must be at least 8 characters")
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
				"Please enter a strong password"
			),
		confirmPassword: yup
			.string()
			.required("This field is required")
			.oneOf([yup.ref("password"), null], "Password does not match"),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(Schema),
	});
	const [error, setError] = useState({ email: "", password: "", username: "" });

	const onsubmit = async (data) => {
		try {
			const response = await Axios.post(
				"https://rock-paper-scissors-app-iybf.onrender.com/api/user/signup",
				{
					email: data?.email,
					username: data?.username,
					password: data?.password,
				}
			);

			const user = await response.data;

			if (user) {
				setError({ email: "", username: "", password: "" });
				localStorage.setItem("user", JSON.stringify(user));
				localStorage.setItem("token", JSON.stringify(user.token));
				setUserExists(true);
			}
		} catch (err) {
			const error = err.response?.data?.error;

			if (error) {
				setError({ email: error?.email, username: error?.username });
			} else {
				setError({ email: null, username: null });
			}
		}
	};

	return (
		<form
			className="auth-form"
			onSubmit={handleSubmit(onsubmit)}
		>
			<Link
				to="/login"
				className="link-item links"
			>
				Login
			</Link>
			<h1>Signup</h1>

			<div className="form-group">
				<label>Email</label>
				<input
					type="text"
					{...register("email")}
					maxLength={100}
				/>
				<p>{errors?.email?.message || error?.email}</p>
			</div>

			<div className="form-group">
				<label>Username</label>
				<input
					type="text"
					{...register("username")}
					maxLength={30}
				/>
				<p>{errors?.username?.message || error?.username}</p>
			</div>

			<div className="form-group">
				<label>Password</label>
				<input
					type="password"
					{...register("password")}
				/>
				<p>{errors?.password?.message}</p>
			</div>

			<div className="form-group">
				<label>Confirm Password</label>
				<input
					type="password"
					{...register("confirmPassword")}
				/>
				<p>{errors?.confirmPassword?.message}</p>
			</div>

			<button className="signup-btn">Signup</button>
		</form>
	);
};

export default Login;
