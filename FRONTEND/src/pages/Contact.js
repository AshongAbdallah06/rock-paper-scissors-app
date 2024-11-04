import React from "react";
import Logo from "../components/Logo";

const Contact = ({ setPage, setFeature }) => {
	return (
		<div className="contact">
			<Logo />

			<form>
				<h1>Leave a message</h1>
				<div className="form-group">
					<label htmlFor="title">Email</label>
					<input
						type="text"
						placeholder="Enter email address here"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="title">Message</label>
					<textarea
						className="feedback"
						placeholder="Enter feedback here"
					/>
				</div>

				<div className="buttons">
					<button
						type="submit"
						className="btn back-btn"
						onClick={() => {
							setPage("features");
							setFeature("leaderboard");
						}}
					>
						Back
					</button>

					<button
						type="submit"
						className="btn submit"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default Contact;
