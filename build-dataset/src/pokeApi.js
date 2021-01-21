const lodash = require("lodash");
const Promise = require("bluebird");
const request = require("request-promise");
const retry = require("bluebird-retry");
const HighlandPagination = require("highland-pagination");
const {
	pokeApi: { url },
	pageSize,
} = require("./config");

const getStream = () => {
	return new HighlandPagination(_getPokemonPage).stream();
};

const getFromUrl = (url, qs = {}) => {
	url = url.replace(/\/$/g, "");
	return request
		.get({
			url,
			qs,
			json: true,
		})
		.promise()
		.tapCatch((error) => console.log("Error", error.message, url, qs));
};

const _getPokemonPage = (offset = null) => {
	return getFromUrl(`${url}/pokemon`, {
		limit: pageSize,
		offset,
	})
		.get("results")
		.then((items) => ({
			items,
			nextToken: items.length == pageSize ? offset + pageSize : null,
		}))
		.delay(1000);
};

exports.getStream = getStream;

exports.getFromUrl = getFromUrl;
