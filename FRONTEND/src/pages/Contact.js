import React from "react";
import arrowBack from "../images/arrow-back-outline.svg";
import Logo from "../components/Logo";

const Contact = ({ setPage, setFeature }) => {
	return (
		<div className="contact">
			<Logo />

			<form className="feedback-form">
				<h1 className="contact-header">Leave a message</h1>
				<div>
					<label htmlFor="title">Title</label>
					<input type="text" />
				</div>
				<div>
					<label htmlFor="title">Message</label>
					<textarea className="feedback" />
				</div>

				<button>Submit</button>
			</form>

			<div className="buttons">
				<button
					className="next-btn"
					onClick={() => {
						setPage("features");
						setFeature("leaderboard");
					}}
				>
					<img src={arrowBack} />
					Go Back
				</button>
			</div>
		</div>
	);
};

export default Contact;
