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
		username: yup
			.string()
			.required("This field is required")
			.matches(/^\w{3,20}$/, "Invalid username format"),
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
		const body = { email: data?.email, password: data?.password, username: data?.username };

		try {
			const res = await Axios.post("http://localhost:4000/api/user/signup", body);
			const userData = res.data;

			// Save user details to localStorage
			localStorage.setItem("user", JSON.stringify(userData));

			// Reset Errors
			setError({
				email: "",
				username: "",
				password: "",
			});

			window.location.href = "/";
		} catch (error) {
			setError({
				email: error.response.data.email,
				username: error.response.data.username,
				password: error.response.data.password,
			});
		}
	};

	return (
		<form onSubmit={handleSubmit(onsubmit)}>
			<Link to="/login">Login</Link>
			<h1>Signup</h1>

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
				<label>Username</label>
				<input
					type="text"
					{...register("username")}
				/>
				<p>
					{errors.username?.message}
					{error.username}
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

			<div>
				<label>Confirm Password</label>
				<input
					type="password"
					{...register("confirmPassword")}
				/>
				<p>{errors.confirmPassword?.message}</p>
			</div>

			<button>Signup</button>
		</form>
	);
};

export default Login;
