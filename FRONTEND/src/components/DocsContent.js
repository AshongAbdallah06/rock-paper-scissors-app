import React from "react";
import Introduction from "./Docs/Introduction";
import Other from "./Docs/Other";

const DocsContent = ({ page, setPage }) => {
	return (
		<div className="content">
			{page === "introduction" && <Introduction setPage={setPage} />}
			{page === "features" && (
				<Other
					page={page}
					setPage={setPage}
				/>
			)}
		</div>
	);
};

export default DocsContent;
