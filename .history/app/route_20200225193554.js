const URL_MAPPER = require("../system/url_mapper");
const MAPPER = new URL_MAPPER();

module.exports = () => {
	MAPPER.map(
		"GET",
		"/auth",
		require("./controllers/auth"),
		require("./middlewares/common_auth")
	);
	MAPPER.map(
		"POST",
		"/login",
		require("./controllers/login"),
		require("./middlewares/common_auth")
	);
	MAPPER.map(
		"POST",
		"/register",
		require("./controllers/register"),
		require("./middlewares/account_management_service_auth")
	);
	MAPPER.map("ALL", "/test", require("./controllers/test"));

	return MAPPER;
};
