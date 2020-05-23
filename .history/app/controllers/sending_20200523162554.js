const JWT = require("../helpers/jwt");
const LOG = require("../../system/log");
const RESPONSE_STATUS = require("../../config/response_status");
const ACCOUNT_STATUS = require("../common/enums").AccountStatus;
const LOGIN_SESSIONS = require("../models/login_sessions");
const CALLBACK = require("../helpers/mongoose_callback").callback;

module.exports = (req, res, fields, files) => {
	const TOKEN = req.headers["token"];
	if (TOKEN) {
		const DECODED = JWT.decode(TOKEN);
		if (DECODED) {
			if (DECODED.accountStatus === ACCOUNT_STATUS.ACTIVATED) {
				LOGIN_SESSIONS.model.findById(
					DECODED.sessionId,
					CALLBACK(res, session => {
						if (session) {
							if (session.is_active) {
								res.end(RESPONSE_STATUS.SUCCESSFUL, DECODED);
							} else {
								res.end(RESPONSE_STATUS.SESSION_EXPIRED);
							}
						} else {
							LOG.writeRequest(req, fields, files, {
								message: "Session not found",
								token: TOKEN
							});
							res.end(
								RESPONSE_STATUS.FAILED,
								null,
								"Session not found"
							);
						}
					})
				);
			} else if (DECODED.accountStatus === ACCOUNT_STATUS.BANNED) {
				res.end(RESPONSE_STATUS.IS_BANNED_ACCOUNT);
			} else if (DECODED.accountStatus === ACCOUNT_STATUS.UNACTIVATED) {
				res.end(RESPONSE_STATUS.IS_UNACTIVATED_ACCOUNT);
			} else {
				LOG.writeRequest(req, fields, files, {
					message: "Account statuses error.",
					status: DECODED.accountStatus
				});
				res.end(
					RESPONSE_STATUS.FAILED,
					null,
					"Account statuses error."
				);
			}
		} else {
			LOG.writeRequest(req, fields, files, {
				message: "Wrong token.",
				token: TOKEN
			});
			res.end(RESPONSE_STATUS.FAILED, null, "Wrong token.");
		}
	} else {
		LOG.writeRequest(req, fields, files, "Missing the token.");
		res.end(RESPONSE_STATUS.FAILED, null, "Missing the token.");
	}
};
