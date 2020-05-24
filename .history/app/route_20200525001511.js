const URL_MAPPER = require("../system/url_mapper");
const MAPPER = new URL_MAPPER();

module.exports = () => {
	MAPPER.map(
		"ALL",
		"/send",
		require("./controllers/sending")
	);

	return MAPPER;
};
