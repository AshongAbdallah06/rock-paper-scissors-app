import React, { useState } from "react";
import modalImage from "../images/image-rules.svg";
import closeIcon from "../images/icon-close.svg";

const Dialog = () => {
	const [isModalShow, setIsModalShow] = useState(false);

	const showModal = () => {
		setIsModalShow(true);
	};

	const closeModal = () => {
		setIsModalShow(false);
	};

	return (
		<>
			{isModalShow && (
				<div className="rules-modal">
					<div>
						<h1>RULES</h1>
						<button onClick={closeModal}>
							<img
								src={closeIcon}
								alt=""
							/>
						</button>
					</div>
					<img
						src={modalImage}
						alt=""
					/>
				</div>
			)}

			<button
				className="rules"
				onClick={showModal}
			>
				RULES
			</button>
		</>
	);
};

export default Dialog;
