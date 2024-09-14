import React, { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import DocsContent from "../components/DocsContent";
import Logo from "../components/Logo";
import statsIcon from "../images/stats-chart-outline.svg";

const Help = () => {
	const [page, setPage] = useState("introduction");

	const docsContentRef = useRef(null);

	const [searchParams, setSearchParams] = useSearchParams();
	useEffect(() => {
		setSearchParams((params) => ({ ...params, page }));

		if (docsContentRef.current) {
			docsContentRef.current.scrollIntoView({
				top: 0,
				behavior: "smooth",
			});
		}
	}, [page]);

	return (
		<div className="help-section">
			<div className="help">
				<div className="sidebar">
					<Logo />

					<Link
						className="link"
						onClick={() => setPage("introduction")}
					>
						<img
							src={statsIcon}
							alt="copyIcon"
							className="copy-icon"
							title="copy"
						/>
						Introduction
					</Link>

					<Link
						className="link"
						onClick={() => setPage("features")}
					>
						<img
							src={statsIcon}
							alt="copyIcon"
							className="copy-icon"
							title="copy"
						/>
						Features
					</Link>
				</div>

				<DocsContent
					docsContentRef={docsContentRef}
					page={page}
					setPage={setPage}
				/>
			</div>
		</div>
	);
};

export default Help;
