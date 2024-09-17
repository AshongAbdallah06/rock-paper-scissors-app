import React from "react";
import Introduction from "./Docs/Introduction";
import Other from "./Docs/Other";
import Contact from "../pages/Contact";

const DocsContent = ({ page, setPage, docsContentRef, feature, setFeature, setSearchParams }) => {
	return (
		<div className="content">
			{page === "introduction" && (
				<Introduction
					setPage={setPage}
					docsContentRef={docsContentRef}
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
			{page === "contact" && <Contact />}
		</div>
	);
};

export default DocsContent;
