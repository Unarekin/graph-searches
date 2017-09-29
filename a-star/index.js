'use strict'
var fs = require('fs');
var heap = require('heap');
var greatcircle = require('great-circle');

/**
 * Searches for the shortest path from start to end.
 * @param {graph} The graph to be searched
 * @param {string} Label of the start node.
 * @param {string} Label of the end node.
 * @returns {Array} Nodes traversed, in order.
 */

module.exports = function(graph, start, end, options) {

	var results = {
		nodesChecked: 0,
		path: [],
		found: false
	}


	var greatCircleHeuristic = function(source, target) {
		var sourceNode = source;
		if (typeof sourceNode === 'string')
			sourceNode = graph.node(source);
		var targetNode = target;
		if (typeof targetNode === 'string')
			targetNode = graph.node(target);

		var dist = greatcircle.distance(sourceNode.lat, sourceNode.lon, targetNode.lat, targetNode.lon);
		//console.log("GC Dist: " + dist);
		return dist;
	}


	var distances = {};
	var parents = {};


	var weightVar = 'distance';

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

	var openList =new heap(function(a, b) {
		return distances[a] - distances[b];
	});
	openList.push(start);

	var closedList = [];

	do {

		// Get minimum distance item.
		var node = openList.pop();
		results.nodesChecked++;
		closedList.push(node);

		//console.log("Checking node: " + node);

		// Found our target.
		if (node === end) {
			results.found = true;
			break;
		}

		//var neighbors = graph.adjacent(node);
		var neighbors = graph.outEdges(node).map(function(edge) { return edge.w; });

		for (var i=0;i<neighbors.length;i++) {
			var neighbor = neighbors[i];
			//console.log("   Neighbor: " + neighbor);

			// Already visited
			if (closedList.indexOf(neighbor) !== - 1)
				continue;

			var dist = distances[node] + graph.edge(node, neighbor)[weightVar]  + greatCircleHeuristic(neighbor, end);
			//console.log("   Distance: ", dist);

			if (dist < distances[neighbor]) {
				distances[neighbor] = dist;
				parents[neighbor] = node;
			}


			if (openList.toArray().indexOf(neighbor) === -1) {
				openList.push(neighbor);
			}
		}



	} while (openList.peek() !== null);


	if (!results.found)
		return results;


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