'use strict'



module.exports = function(graph, start, end) {
	var toCheck = [start];
	var visitedList = [];

	var nodesChecked=0;


	while (true) {
		// Grab oldest candidate
		var node = toCheck.shift();
		visitedList.push(node);
		nodesChecked++;

		if (node == end) {
			return nodesChecked;
		}

		//toCheck = toCheck.concat(graph.adjacent(node).filter(function(elem) { return visitedList.indexOf(elem) === -1; }));

		var adjacent = removeDuplicates(graph.adjacent(node).filter(function(elem) { return visitedList.indexOf(elem) === -1; }));
		toCheck = removeDuplicates(toCheck.concat(adjacent));

		
		if (toCheck.length===0) {
			return -1;
		}
	}
}


function removeDuplicates(list) {
	var seen = {};
	return list.filter(function(item) {
		return seen.hasOwnProperty(item) ? false : (seen[item] = true);
	});
}