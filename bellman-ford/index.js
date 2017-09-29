'use strict'

/**
 * Searches for the shortest path from start to end.
 * @param {graph} The graph to be searched
 * @param {string} Label of the start node.
 * @param {string} Label of the end node.
 * @returns {Array} Nodes traversed, in order.
 */

module.exports = function(graph, start, end, options) {
	var distances = {};
	var parents = {};

	var results = {
		nodesChecked: 0,
		path: [],
		found: false
	};

	var weightVar = 'travelTime';
	if (options && options.byDistance)
		weightVar = 'distance';

	// The graph structure we're using does not provide a mechanism to retrieve all edges
	//var serialized = graph.serialize();

	//var nodes = serialized.nodes;
	//var edges = serialized.links;

	var nodes = graph.nodes().map(function(id) { return graph.node(id); });
	var edges = graph.edges().map(function(edge) { return graph.edge(edge.v, edge.w); });


	// Initialize our distances to infinity, and our parents to null.
	nodes.forEach(function(node) {
		distances[node.id] = Infinity;
		parents[node.id] = null;
	});

	// It is 0 unitless distance units from our origin to our origin.
	distances[start] = 0;

	// If only it were this easy in real life to relax.
	for (let i=0; i<nodes.length-1;i++) {
		results.nodesChecked++;

		for (let j=0;j<edges.length;j++) {
			let edge = edges[j];
			// Relax, man.  Relax.
			if (distances[edge.source] + edge[weightVar] < distances[edge.target]) {
				distances[edge.target] = distances[edge.source] + edge[weightVar];
				parents[edge.target] = edge.source;
			}
		}
	}

	// CHeck for negative weight cycle
	for (let i=0;i<edges.length;i++) {
		let edge = edges[i];
		if (distances[edge.source] + edge[weightVar] < distances[edge.target])
			return results;
	}

	results.found = true;

	// Build our actual path.
	var currentNode = end;
	while (true) {
		results.path.push(currentNode);
		if (parents[currentNode]) {
			currentNode = parents[currentNode];
		} else {
			break;
		}
	}

	return results;
};