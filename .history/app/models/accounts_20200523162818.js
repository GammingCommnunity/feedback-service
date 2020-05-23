const MONGOOSE = require("mongoose");
const RESPONSE_STATUS = require("../../config/response_status");
const BCRYPT = require("bcryptjs");
const SUCCESS_CALLBACK = require("../helpers/mongoose_callback")
	.successCallback;

const SCHEMA = MONGOOSE.Schema({
	_id: Number,
	accountId: Number,
	message: String,
	createdAt: Date,
	info: String
});
const ACCOUNT = MONGOOSE.model("Accounts", SCHEMA);

const CREATE = (res, username, pwd, id, role, status, successCallback) => {
	if (username && pwd && id && role && status) {
		ACCOUNT.findById(
			id,
			SUCCESS_CALLBACK(
				res,
				() => res.end(RESPONSE_STATUS.FAILED, null, "Duplicate id."),
				() => {
					ACCOUNT.find(
						{ username: username },
						SUCCESS_CALLBACK(
							res,
							() =>
								res.end(
									RESPONSE_STATUS.FAILED,
									null,
									"Duplicate username."
								),
							() => {
								ACCOUNT.create(
									{
										_id: id,
										username: username,
										pwd: BCRYPT.hashSync(pwd, 10),
										role: role,
										status: status
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
							}
						)
					);
				}
			)
		);
	} else {
		res.end(RESPONSE_STATUS.FAILED, null, "Missing some account info.");
	}
};

exports.schema = SCHEMA;
exports.model = ACCOUNT;
exports.create = CREATE;
