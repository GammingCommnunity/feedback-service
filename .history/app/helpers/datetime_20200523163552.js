const JWT = require("jsonwebtoken");
const PRIVATE_KEY = require("../../config/app").PRIVATE_KEY;
const LOGIN_SESSIONS = require("../models/login_sessions");
const RESPONSE_STATUS = require("../../config/response_status");
const LOG = require("../../system/log");
const SUCCESS_CALLBACK = require("../helpers/mongoose_callback")
	.successCallback;

const ENCODE = (sessionId, accountId, accountRole, accountStatus) => {
	return JWT.sign(
		{ ss: sessionId, id: accountId, rl: accountRole, st: accountStatus },
		PRIVATE_KEY,
		{
			algorithm: "HS512",
			noTimestamp: true
		}
	);
};

const DECODE = token => {
	let result = null;

	try {
		const DECODED = JWT.verify(token, PRIVATE_KEY);
		if (DECODED.ss && DECODED.id && DECODED.rl && DECODED.st) {
			result = {
				sessionId: DECODED.ss,
				accountId: DECODED.id,
				accountRole: DECODED.rl,
				accountStatus: DECODED.st
			};
		} else {
			LOG.write(
				{
					describe: "JWT format error.",
					token: token
				},
				true
			);
		}
	} catch (error) {
		LOG.write(error, true);
	}

	return result;
};

const GENERATE = (res, accountId, accountRole, accountStatus) => {
	LOGIN_SESSIONS.model.create(
		{
			account: {
				_id: accountId,
				role: accountRole,
				status: accountStatus
			}
		},
		SUCCESS_CALLBACK(
			res,
			session =>
				res.end(
					RESPONSE_STATUS.SUCCESSFUL,
					ENCODE(session._id, accountId, accountRole, accountStatus)
				),
			() =>
				res.end(
					RESPONSE_STATUS.FAILED,
					null,
					"Failed to create new session."
				)
		)
	);
};

exports.encode = ENCODE;
exports.decode = DECODE;
exports.generate = GENERATE;
