import React from "react";
import Contact from "../pages/Contact";
import Introduction from "./Docs/Introduction";
import Other from "./Docs/Other";

const DocsContent = ({ page, setPage, docsContentRef, feature, setFeature, setSearchParams }) => {
	return (
		<div className="content">
			{page === "introduction" && (
				<Introduction
					setPage={setPage}
					feature={feature}
					setSearchParams={setSearchParams}
				/>
			)}
			{page === "features" && (
				<Other
					setPage={setPage}
					feature={feature}
					setFeature={setFeature}
					docsContentRef={docsContentRef}
					setSearchParams={setSearchParams}
				/>
			)}
			{page === "contact" && (
				<Contact
					setFeature={setFeature}
					setPage={setPage}
				/>
			)}
		</div>
	);
};

export default DocsContent;
