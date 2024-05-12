var RegisteredFixes = {
	"set-cookie": [
		function RemovePartitioned(value) { // Remove experimental feature https://developer.mozilla.org/en-US/docs/Web/Privacy/Privacy_sandbox/Partitioned_cookies
			var didModify = false;
			value = value.replace(/(?<=;)\s*Partitioned;?/, () => { didModify = true; return ""; });
			return didModify ? value : null;
		}
	]
};

chrome.webRequest.onHeadersReceived.addListener(function ({ responseHeaders }) {
	var wasModified = false;
	for (var i = 0; i < responseHeaders.length; i++) {
		var header = responseHeaders[i];

		if (!header.value)
			continue;

		var headerFixes = RegisteredFixes[header.name.toLowerCase()];
		if (headerFixes) {
			for (var j = 0; j < headerFixes.length; j++) {
				var fix = headerFixes[j](header.value);
				if (fix === null) continue;
				header.value = fix;
				wasModified = true;
			}
		}
	}
	return wasModified ? { responseHeaders } : {};
}, { urls: ["<all_urls>"] }, ["responseHeaders", "blocking", "extraHeaders"]);