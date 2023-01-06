import API_URLS from './apiUrls';

class Api {
	static UNAUTHORIZED_RESPONSES = [401, 403];

	static NO_CONTENT_RESPONSES = [204, 205];

	constructor() {
		this.apiUrl = `${process.env.HTTP}://${process.env.API_ENDPOINT}`;
	}

	request(uri, body, options = {}) {
		const url = `${this.apiUrl}${uri}`;
		if (this.jwtToken) {
			options.headers = { ...options.headers, Authorization: options.headers?.Authorization || `Bearer ${this.jwtToken}` };
		}

		if (body) {
			options.headers = { ...options.headers, 'Content-Type': 'application/json' };
		}

		return fetch(url, {
			...options,
			body: body ? JSON.stringify(body) : null,
		})
			.then((r) => {
				return r.json()
					.catch(() => r);
			});
	}


	setJwtToken(jwtToken) {
		this.jwtToken = jwtToken;
	}
}

export default new Proxy(new Api(), {
	getDynamicMethodArguments(urlConfig, ...dynamicArgs) {
		let { uri } = urlConfig;
		if (this.isDynamicUri(uri)) {
			[...uri.matchAll(/.*?{(.*?)}/g)].forEach(([, dynamicParam]) => {
				const dynamicValue = typeof dynamicArgs[0] === 'object'
					? dynamicArgs[0][dynamicParam]
					: dynamicArgs.shift();

				uri = uri.replace(new RegExp(`{${dynamicParam}}`), dynamicValue);
			});
		}

		return {
			body: dynamicArgs[0],
			options: { ...dynamicArgs[1], method: urlConfig.method || 'GET' },
			uri,
		};
	},
	setCurrentCall(methodName, uri, target, body, options) {
		this.cache = this.cache || {};
		return this.cache[this.getCallHash(methodName, uri)] = target.request(uri, body, options)
			.finally((r) => {
				this.cache[this.getCallHash(methodName, uri)] = undefined;
				return r;
			});
	},
	getCurrentCall(methodName, uri) {
		this.cache = this.cache || {};
		return this.cache[this.getCallHash(methodName, uri)];
	},
	isDynamicUri(uri) {
		return /.*{.*/.test(uri);
	},
	getCallHash(methodName, uri) {
		return `${methodName}${uri}`;
	},
	processResponse(conf, response) {
		if (conf.domain) {
			return response instanceof Array
				? response.map((domain) => new conf.domain(domain))
				: new conf.domain(response);
		}
		return response;
	},
	get(target, key) {
		const self = this;
		if (!target[key] && API_URLS[key]) {
			// Builds a dynamic method with (body, options) signature, unless a dynamic uri is used.
			// In that case, it will either get the named dynamic values from the body payload object if 2 parameters are provided
			// or from the first N positional parameters that the function was invoked with
			target[key] = async function dynamicCall(...args) {
				const { body, options, uri } = self.getDynamicMethodArguments(API_URLS[key], ...args);
				return self.getCurrentCall(key, uri) ?? self.setCurrentCall(key, uri, target, body, options)
					.then((res) => self.processResponse(API_URLS[key], res));
			};
		}

		return target[key];
	},
});
