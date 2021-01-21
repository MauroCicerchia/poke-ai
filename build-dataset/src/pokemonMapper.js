const _ = require("lodash");

const _getTypes = (types) => {
	const [type1, type2 = null] = _.map(types, "type.name");

	return {
		type1,
		type2,
	};
};

const _getStats = (stats) => {
	return _(stats)
		.map(({ base_stat, stat: { name } }) => [name, base_stat])
        .fromPairs()
        .value();
};

module.exports = (pokemon) => {
	const { types, stats, name, id } = pokemon;

	return {
        id,
		name,
		..._getTypes(types),
		..._getStats(stats),
	};
};
