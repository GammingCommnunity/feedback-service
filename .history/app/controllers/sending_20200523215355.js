const FeedBacks = require("../models/feedbacks");
const RESPONSE_STATUS = require("../../config/response_status");

module.exports = (req, res, fields, files) => {
	if (fields.content) {
		const accountId = fields.accountId ? fields.accountId : -1;
		FeedBacks.create(accountId, fields.content, '', () => {
			res.end(
				RESPONSE_STATUS.SUCCESSFUL,
				null,
				""
			)
		});
	}
};
