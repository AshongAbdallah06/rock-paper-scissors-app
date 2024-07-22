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
	const [error, setError] = useState({ email: "", password: "", username: "" });

	const onsubmit = async (data) => {
		const body = { email: data?.email, password: data?.password };

		try {
			const res = await Axios.post("http://localhost:4000/api/user/login", body);
			const userData = res.data;

			// Save user details to localStorage
			localStorage.setItem("user", JSON.stringify(userData));

			// Reset Errors
			setError({
				email: "",
				password: "",
			});

			window.location.href = "/";
		} catch (error) {
			setError({
				email: error.response.data.email,
				password: error.response.data.password,
			});
		}
	};
	return (
		<form onSubmit={handleSubmit(onsubmit)}>
			<Link to="/signup">Signup</Link>
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
