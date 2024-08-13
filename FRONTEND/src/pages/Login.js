import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Axios from "axios";

const Login = () => {
	const Schema = yup.object().shape({
		email: yup
			.string()
			.required("This field is required")
			.matches(
				/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
				"Please enter a valid email address"
			),
		password: yup
			.string()
			.required("This field is required")
			.min(8, "Password must be at least 8 characters")
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
				"Please enter a strong password"
			),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(Schema),
	});
	const [error, setError] = useState({ email: "", password: "" });

	const onsubmit = async (data) => {
		try {
			const response = await Axios.post(
				"https://rock-paper-scissors-app-iybf.onrender.com/api/user/login",
				{
					email: data?.email,
					password: data?.password,
				}
			);

			const user = await response.data;

			if (user) {
				setError({ email: "", password: "" });
				localStorage.setItem("user", JSON.stringify(user));
			}
			window.location.href = "/";
		} catch (err) {
			const error = err.response?.data?.error;

			if (error) {
				setError({ email: error.email, password: error.password });
			} else {
				setError({ email: null, password: null });
			}
		}
	};

	return (
		<form onSubmit={handleSubmit(onsubmit)}>
			<Link
				to="/signup"
				className="links"
			>
				Signup
			</Link>
			<h1>Login</h1>

			<div>
				<label>Email</label>
				<input
					type="text"
					{...register("email")}
				/>
				<p>
					{errors.email?.message}
					{error.email}
				</p>
			</div>

			<div>
				<label>Password</label>
				<input
					type="password"
					{...register("password")}
				/>
				<p>
					{errors.password?.message}
					{error.password}
				</p>
			</div>

			<button>Login</button>
		</form>
	);
};

export default Login;
