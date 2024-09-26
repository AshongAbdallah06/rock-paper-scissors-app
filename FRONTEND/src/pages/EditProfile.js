import React from "react";

const EditProfile = ({ setEdit }) => {
	return (
		<div className="edit-profile-container">
			<h1>Edit Profile</h1>
			<form
				// onSubmit={handleSubmit}
				className="edit-profile-form"
			>
				<div className="form-group">
					<label htmlFor="profilePic">Profile Picture URL</label>
					<input
						type="text"
						id="profilePic"
						name="profilePic"
						// value={formData.profilePic}
						// onChange={handleChange}
						placeholder="Enter new profile picture URL"
					/>
				</div>

				<div className="form-group">
					<label htmlFor="name">Username</label>
					<input
						type="text"
						id="name"
						name="name"
						// value={formData.name}
						// onChange={handleChange}
						placeholder="Enter your username"
						required
					/>
				</div>

				<div className="form-group">
					<label htmlFor="location">Location</label>
					<input
						type="text"
						id="location"
						name="location"
						// value={formData.location}
						// onChange={handleChange}
						placeholder="Enter your location"
					/>
				</div>

				<div className="form-group">
					<label htmlFor="bio">Bio</label>
					<textarea
						id="bio"
						name="bio"
						// value={formData.bio}
						// onChange={handleChange}
						placeholder="Tell us something about yourself"
						rows="3"
					/>
				</div>

				<button
					type="submit"
					className="save-btn"
					onClick={() => setEdit(false)}
				>
					Save Changes
				</button>
			</form>
		</div>
	);
};

export default EditProfile;
