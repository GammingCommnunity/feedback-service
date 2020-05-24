const URL_MAPPER = require("../system/url_mapper");
const MAPPER = new URL_MAPPER();

module.exports = () => {
	MAPPER.map(
		"POST",
		"/send",
		require("./controllers/sending")
	);
	MAPPER.map(
		"All",
		"/",
		require("./controllers/cors")
	);

	return MAPPER;
};
