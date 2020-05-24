const FeedBacks = require("../models/feedbacks");
const RESPONSE_STATUS = require("../../config/response_status");

module.exports = (req, res, fields, files) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "*");
	res.setHeader("Access-Control-Allow-Headers", "*");
	res.end(
		RESPONSE_STATUS.SUCCESSFUL,
		null,
		""
	);
};
