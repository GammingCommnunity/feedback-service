const FS = require("fs");
const LOCALE = require("../config/app").LOCALE;
const CONSOLE_COLOR = require("./consolelog_color");
const JSON_HELPER = require("./json_helper");

const LOG_ERROR_HANDLE = notErrorCallback => {
	return error => {
		if (error) {
			CONSOLE_COLOR.red("Log writing error:");
			console.log(error);
		} else {
			notErrorCallback();
		}
	};
};

exports.writeRequest = (
	req,
	formData = {},
	files = {},
	error = null,
	displayOnConsole = false
) => {
	const DATE_NOW = new Date().toLocaleString(LOCALE ? LOCALE : "vi-VN");
	const CONTENT =
		JSON_HELPER.encode(
			{
				head: {
					date: DATE_NOW,
					method: req.method,
					url: req.url.split("?")[0],
					type: "writeRequest"
				},
				body: {
					header: req.headers,
					fields: formData,
					files: files,
					error: error
				}
			},
			4
		) + ",\n\n";

	FS.appendFile(
		".log",
		CONTENT,
		LOG_ERROR_HANDLE(() => {
			if (displayOnConsole) {
				// Display a little bit of request info
				CONSOLE_COLOR.green(
					`[${DATE_NOW}] ${req.method} - ${req.url.split("?")[0]}`
				);
			}
		})
	);
};

exports.write = (content, displayOnConsole = false) => {
	if (content) {
		const DATE_NOW = new Date().toLocaleString(LOCALE ? LOCALE : "vi-VN");
		const CONTENT =
			JSON_HELPER.encode(
				{
					head: {
						date: DATE_NOW,
						type: "write"
					},
					body: content
				},
				4
			) + ",\n\n";

		FS.appendFile(
			".log",
			CONTENT,
			LOG_ERROR_HANDLE(() => {
				if (displayOnConsole) {
					CONSOLE_COLOR.green(`[${DATE_NOW}] message:`);
					console.log(content);
				}
			})
		);
	}
};
