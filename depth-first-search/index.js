'use strict'



module.exports = function(graph, start, end) {
	var toCheck = [start];
	var visitedList = [];

	var nodesChecked=0;

	while (true) {
		// Grab oldest candidate
		var node = toCheck.pop();
		visitedList.push(node);
		nodesChecked++;

		if (node == end)
			return nodesChecked;

		toCheck = toCheck.concat(graph.adjacent(node).filter(function(elem) { return visitedList.indexOf(elem) === -1; }));
		
		if (toCheck.length===0)
			return -1;
	}
}