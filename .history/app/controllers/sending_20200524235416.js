const FeedBacks = require("../models/feedbacks");
const RESPONSE_STATUS = require("../../config/response_status");

module.exports = (req, res, fields, files) => {
	if (fields.content) {
		const accountId = fields.accountId ? fields.accountId : -1;
		FeedBacks.create(res, accountId, fields.content, '', () => {
			res.setHeader("Access-Control-Allow-Origin", "*");
			res.end(
				RESPONSE_STATUS.SUCCESSFUL,
				null,
				""
			)
		});
	} else {
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.end(
			RESPONSE_STATUS.FAILED,
			null,
			""
		)
	}
};
