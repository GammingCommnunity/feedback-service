const WRITE_LOG = require("../config/app").WRITE_LOG;
const RESPONSE_CLASS = require("./response");
const FORMIDABLE = require("formidable");
const LOG = require("./log");
const URL_PARSE = require("url").parse;

exports.getRequestListener = (
	urlMapper,
	requestCallback = null,
	responseCallback = null
) => {
	return (req, res) => {
		if (requestCallback) {
			requestCallback(req, res);
		}

		const RESPONSE = new RESPONSE_CLASS(res);
		const URL = req.url.split("?")[0];
		const METHOD = req.method.toUpperCase();
		const MAPPED_NODE = urlMapper.getANode(METHOD, URL);

		if (MAPPED_NODE) {
			FORMIDABLE.IncomingForm().parse(req, (error, fields, files) => {
				if (req.url.includes("?")) {
					fields = Object.assign(
						URL_PARSE(req.url, true).query,
						fields
					);
				}

				if (WRITE_LOG === undefined || WRITE_LOG) {
					LOG.writeRequest(req, fields, files, error, true);
				}

				if (error) {
					RESPONSE.end(RESPONSE_STATUS.FAILED, null, error);
				} else {
					if (MAPPED_NODE.middleware) {
						MAPPED_NODE.middleware(
							middlewareData => {
								MAPPED_NODE.controller(
									req,
									RESPONSE,
									fields,
									files,
									middlewareData,
									responseCallback
								);
							},
							req,
							RESPONSE,
							fields,
							files
						);
					} else {
						MAPPED_NODE.controller(
							req,
							RESPONSE,
							fields,
							files,
							null,
							responseCallback
						);
					}
				}
			});
		} else {
			if (WRITE_LOG === undefined || WRITE_LOG) {
				LOG.writeRequest(req, {}, {}, "404 Not Found.", true);
			}
			RESPONSE.notFoundResponse();
		}
	};
};
