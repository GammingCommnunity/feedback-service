const METHODS = [
	"GET",
	"HEAD",
	"POST",
	"PUT",
	"DELETE",
	"CONNECT",
	"OPTIONS",
	"TRACE",
	"PATCH"
];
class UrlMapper {
	constructor() {
		this.data = [];
		METHODS.forEach(methodName => {
			this.data[methodName] = [];
		});
	}

	map(method, url, controller, middleware = null) {
		const METHOD = method.toUpperCase();
		if (METHOD === "ALL") {
			METHODS.forEach(methodName => {
				this.data[methodName].push({
					url: url,
					controller: controller,
					middleware: middleware
				});
			});
		} else {
			this.data[METHOD].push({
				url: url,
				controller: controller,
				middleware: middleware
			});
		}
	}

	getANode(method, url) {
		return this.data[method.toUpperCase()].find(
			element => element.url === url
		);
	}
}

module.exports = UrlMapper;
