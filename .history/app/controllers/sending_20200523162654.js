const JWT = require("../helpers/jwt");
const LOG = require("../../system/log");
const RESPONSE_STATUS = require("../../config/response_status");
const ACCOUNT_STATUS = require("../common/enums").AccountStatus;
const LOGIN_SESSIONS = require("../models/login_sessions");
const CALLBACK = require("../helpers/mongoose_callback").callback;

module.exports = (req, res, fields, files) => {
	console.log(fields);
};
