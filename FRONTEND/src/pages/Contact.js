import React from "react";
import HelpSidebar from "../components/HelpSidebar";
import Logo from "../components/Logo";

const Contact = () => {
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
		</div>
	);
};

export default Contact;
