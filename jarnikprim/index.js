'use strict'

var heap = require('heap');

module.exports = function(graph) {

	/*
	var openList =new heap(function(a, b) {
		return distances[a] - distances[b];
	});
	/**/

	var distances = {};
	var parents = {};

	var queue = new heap(function(a, b) {
		return distances[a] - distances[b];
	});

	var nodes = graph.nodes();
	var edges = graph.edges();

	// Initialize our distances to infinity, and our parents to null.
	nodes.forEach(function(node) {
		distances[node] = Infinity;
		parents[node] = null;
		queue.push(node);
	});

	while (queue.peek()) {
		var node_id = queue.pop();
		var node = graph.node(node_id);

		var descendants = graph.nodeEdges(node_id);
		for (var i=0;i<descendants.length;i++) {
			var edge = graph.edge(descendants[i].v, descendants[i].w);
			var descendant = graph.node(edge.target);
			if (queue.toArray().indexOf(descendant.id) !== -1 && edge.distance < distances[descendant.id]) {
				parents[descendant.id] = node_id;
				distances[descendant.id] = edge.weight;
			}
		}
	}
	return parents;
}
