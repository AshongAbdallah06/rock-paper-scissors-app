import React from "react";
import Introduction from "./Docs/Introduction";
import Other from "./Docs/Other";

const DocsContent = ({ page, setPage, docsContentRef }) => {
	return (
		<div className="content">
			{page === "introduction" && (
				<Introduction
					setPage={setPage}
					docsContentRef={docsContentRef}
				/>
			)}
			{page === "features" && (
				<Other
					docsContentRef={docsContentRef}
					page={page}
					setPage={setPage}
				/>
			)}
		</div>
	);
};

export default DocsContent;
