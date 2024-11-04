import { Link } from "react-router-dom";

const ReadDocsAlert = ({ setReadDocsAlert }) => {
	return (
		<>
			<div className="rules-overlay">
				<div className="rules-modal change-mode-modal">
					<h2>Welcome💖🤝🏼</h2>

					<p>
						Would you like to read the docs to learn more about the features of this
						game?
					</p>
					<div className="buttons">
						<Link
							to="/"
							className="btn cancel"
							onClick={() => {
								localStorage.setItem("readDocsAlertCounter", JSON.stringify(1));
								setReadDocsAlert(1);
							}}
						>
							No
						</Link>

						<Link
							to="/help"
							className="btn yes"
							onClick={() => {
								localStorage.setItem("readDocsAlertCounter", JSON.stringify(1));
							}}
						>
							Yes
						</Link>
					</div>
					<p>
						<Link
							className="fast-links"
							to="/login"
						>
							Login
						</Link>{" "}
						or{" "}
						<Link
							className="fast-links"
							to="signup"
						>
							create an account
						</Link>{" "}
						to unlock more features in this games. By
					</p>
				</div>
			</div>
		</>
	);
};

export default ReadDocsAlert;
