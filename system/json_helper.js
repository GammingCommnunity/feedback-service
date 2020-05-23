exports.encode = (object, space = 0) => {
	const CACHE = [];
	return JSON.stringify(
		object,
		(key, value) => {
			if (value === undefined) {
				return null;
			} else if (typeof value === "object") {
				if (CACHE.indexOf(value) !== -1) {
					// Duplicate reference found, discard key
					return;
				}
				// Store value in our collection
				CACHE.push(value);
			}
			return value;
		},
		space
	);
}