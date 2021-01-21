const _ = require("lodash");
const highland = require("highland");
const Promise = require("bluebird");
const pokemonMapper = require("./pokemonMapper");
const { getStream, getFromUrl } = require("./pokeApi");
const writeCsv = require("./csvWriter");
require("highland-concurrent-flatmap");
const { pageSize } = require("./config");

getStream()
	.concurrentFlatMap(25, ({ url }) => highland(getFromUrl(url)))
	.concurrentFlatMap(25, (pokemon) => [pokemonMapper(pokemon)])
	.tap(console.log)
	.batch(4)
	// .flatMap((pokemon) => highland(writeCsv(pokemon)))
	.reduce(0, _.noop)
    .toPromise(Promise)
    .then(() => console.log("Done"));
