import React from "react";

const FilterDropdown = ({ setShowFilterDropdown, setOptChanges }) => {
	return (
		<ul className="filter-dropdown">
			<li
				onClick={() => {
					setOptChanges("wins");
					setShowFilterDropdown(false);
				}}
			>
				Wins
			</li>
			<li
				onClick={() => {
					setOptChanges("losses");
					setShowFilterDropdown(false);
				}}
			>
				Losses
			</li>
			<li
				onClick={() => {
					setOptChanges("ties");
					setShowFilterDropdown(false);
				}}
			>
				Ties
			</li>
			<li
				onClick={() => {
					setOptChanges("games_played");
					setShowFilterDropdown(false);
				}}
			>
				Games Played
			</li>
		</ul>
	);
};

export default FilterDropdown;
