const FeedBacks = require("../models/feedbacks");

module.exports = (req, res, fields, files) => {
	if (fields.content) {
		const accountId = fields.accountId ? fields.accountId : -1;
		FeedBacks.create()
	}
};
