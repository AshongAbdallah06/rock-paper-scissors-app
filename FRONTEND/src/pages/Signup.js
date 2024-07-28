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
		console.log("sIGNUP");
	};

	return (
		<form onSubmit={handleSubmit(onsubmit)}>
			<Link
				to="/login"
				className="links"
			>
				Login
			</Link>
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
