const RESPONSE_STATUS = require("../../config/response_status");
const LOG = require("../../system/log");

exports.callback = (res, callback) => {
	return (error, docs) => {
		if (error) {
			LOG.write(error, true);
			res.end(RESPONSE_STATUS.FAILED, null, error.message);
		} else {
			callback(docs);
		}
	};
};

exports.successCallback = (res, callback, notFoundCallback = null) => {
	return (error, docs) => {
		if (error) {
			LOG.write(error, true);
			res.end(RESPONSE_STATUS.FAILED, null, error.message);
		} else {
			if (
				docs &&
				(!("length" in docs) || ("length" in docs && docs.length > 0))
			) {
				if (callback) {
					callback(docs);
				}
			} else {
				if (notFoundCallback) {
					notFoundCallback();
				} else {
					res.end(RESPONSE_STATUS.FAILED, null, error.message);
				}
			}
		}
	};
};
