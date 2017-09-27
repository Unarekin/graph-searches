'use strict'

/**
 * Searches for the shortest path from start to end.
 * @param {graph} The graph to be searched
 * @param {string} Label of the start node.
 * @param {string} Label of the end node.
 * @returns {Array} Nodes traversed, in order.
 */

module.exports = function(graph, start, end) {
	var distances = {};
	var parents = {};

	// The graph structure we're using does not provide a mechanism to retrieve all edges
	var serialized = graph.serialize();

	var nodes = serialized.nodes;
	var edges = serialized.links;

	// The serialization function of this graph structure doesn't include the weights
	// of edges, for some reason.  Decorate it on our list of edges, for ease of lookup later.
	edges.forEach(function(edge) { edge.weight = graph.getEdgeWeight(edge.source, edge.target); });

	// Initialize our distances to infinity, and our parents to null.
	nodes.forEach(function(node) {
		distances[node.id] = Infinity;
		parents[node.id] = null;
	});

	// It is 0 unitless distance units from our origin to our origin.
	distances[start] = 0;

	// If only it were this easy in real life to relax.
	for (let i=0; i<nodes.length-1;i++) {
		for (let j=0;j<edges.length;j++) {
			let edge = edges[j];
			// Relax, man.  Relax.
			if (distances[edge.source] + edge.weight < distances[edge.target]) {
				distances[edge.target] = distances[edge.source] + edge.weight;
				parents[edge.target] = edge.source;
			}
		}
	}

	// CHeck for negative weight cycle
	for (let i=0;i<edges.length;i++) {
		let edge = edges[i];
		if (distances[edge.source] + edge.weight < distances[edge.target])
			throw new Error("Graph contains negative weight cycle.");
	}

	var path = [];
	// Build our actual path.
	var currentNode = end;
	while (true) {
		path.push(currentNode);
		if (parents[currentNode]) {
			currentNode = parents[currentNode];
		} else {
			break;
		}
	}

	return path;
};