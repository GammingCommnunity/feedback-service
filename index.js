const DB_CONNECTION_STRING = require("./config/app").DB_CONNECTION_STRING;
const LOG = require("./system/log");
const HTTP = require("http");
const MONGOOSE = require("mongoose");
const ROUTE = require("./app/route");
const REQUEST_LISTENER = require("./system/core").getRequestListener(ROUTE());

MONGOOSE.connect(
	DB_CONNECTION_STRING,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	error => LOG.write(error, true)
);

HTTP.createServer(REQUEST_LISTENER).listen(3000);
