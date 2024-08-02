const jwt = require("jsonwebtoken");

const requireAuth = async (req, res, next) => {
	const authorization = req.headers.authorization;

	if (!authorization) {
		console.log("Authorization token required");
		res.status(400).json({ error: "Authorization token required" });
	}

	const token = authorization.split(" ")[1];

	try {
		if (token) {
			jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
				if (!err) {
					next();
				} else {
					console.log({ msg: "InvalidToken. Access Unauthorized" });
					res.status(401).json({ msg: "Invalid Token. Access Unauthorized" });
				}
			});
		}
	} catch (error) {
		console.log({ msg: "Error occured validating token" });
		res.status(401).json({ msg: "Error occured validating token" });
	}
};

module.exports = { requireAuth };
