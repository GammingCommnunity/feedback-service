const MONGOOSE = require("mongoose");
const RESPONSE_STATUS = require("../../config/response_status");
const SUCCESS_CALLBACK = require("../helpers/mongoose_callback").successCallback;
const DateTime = require("../helpers/datetime");

const SCHEMA = MONGOOSE.Schema({
	_id: Number,
	accountId: Number,
	message: String,
	createdAt: Date,
	info: String
});
const FEEDBACK = MONGOOSE.model("Feedbacks", SCHEMA);

const CREATE = (accountId, message, info, successCallback) => {
	ACCOUNT.create(
		{
			accountId: accountId,
			message: message,
			createdAt: DateTime.now(),
			info: info
		},
		SUCCESS_CALLBACK(
			res,
			account => successCallback(account),
			() =>
				res.end(
					RESPONSE_STATUS.FAILED,
					null,
					"Failed to create new account."
				)
		)
	);
};

exports.schema = SCHEMA;
exports.model = FEEDBACK;
exports.create = CREATE;
