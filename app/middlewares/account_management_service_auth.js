const ACCOUNT_MANAGEMENT_SERVICE_KEY = require("../../config/app")
	.ACCOUNT_MANAGEMENT_SERVICE_KEY;
const LOG = require("../../system/log");

module.exports = (next, req, res, fields, files) => {
	if (
		req.headers.secret_key &&
		req.headers.secret_key === ACCOUNT_MANAGEMENT_SERVICE_KEY
	) {
		next();
	} else {
		LOG.writeRequest(req, fields, files, {
			message: "Access denied.",
			secret_key: req.headers.secret_key ? req.headers.secret_key : null
		});
		res.forbiddenResponse();
	}
};
