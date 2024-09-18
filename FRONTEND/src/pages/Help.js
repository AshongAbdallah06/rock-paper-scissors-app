import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DocsContent from "../components/DocsContent";
import HelpSidebar from "../components/HelpSidebar";

const Help = () => {
	const [page, setPage] = useState("introduction");
	const [feature, setFeature] = useState("introduction");

	const docsContentRef = useRef(null);
	const featureRef = useRef(null);

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

	const [renderRoutes, setRenderRoutes] = useState(false);
	useEffect(() => {
		setRenderRoutes(false);
		const timer = setTimeout(() => {
			setRenderRoutes(true);
		}, 100);
	}, []);
	return (
		<div className="help-section">
			{renderRoutes && (
				<div className="help">
					<HelpSidebar
						page={page}
						setPage={setPage}
						setFeature={setFeature}
						feature={feature}
					/>

					<DocsContent
						docsContentRef={docsContentRef}
						page={page}
						setPage={setPage}
						feature={feature}
						setFeature={setFeature}
						featureRef={featureRef}
						setSearchParams={setSearchParams}
					/>
				</div>
			)}
		</div>
	);
};

export default Help;
