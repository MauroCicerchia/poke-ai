const Promise = require("bluebird");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const { outputPath } = require("./config");

const csvWriter = createCsvWriter({
	path: outputPath,
	header: [
		{ id: "id", title: "Id" },
		{ id: "name", title: "Name" },
		{ id: "type1", title: "Type1" },
		{ id: "type2", title: "Type2" },
		{ id: "hp", title: "Hp" },
		{ id: "attack", title: "Attack" },
		{ id: "defense", title: "Defense" },
		{ id: "special-attack", title: "Special-Attack" },
		{ id: "special-defense", title: "Special-Defense" },
		{ id: "speed", title: "Speed" },
	],
});

module.exports = (pokemon) => {
	return Promise.resolve(csvWriter.writeRecords(pokemon));
};
