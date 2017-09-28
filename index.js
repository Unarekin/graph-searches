'use strict'
///////////////////////////////////////////////////////////////////////////
//	Modules
///////////////////////////////////////////////////////////////////////////
var fs 			= require('fs');
var path 		= require('path');
var graphLib 	= require("graph-data-structure");
var q 			= require('q');
var breadth     = require('./breadth-first-search');
var depth       = require('./depth-first-search');
var bellmanford = require('./bellman-ford');
var dijkstra    = require('./dijkstra');
///////////////////////////////////////////////////////////////////////////



var graph = require("./data")();
var serialized = graph.serialize();
var results = [];

console.log("Built " + serialized.nodes.length.toLocaleString() + " nodes and " + serialized.links.length.toLocaleString() + " edges.");

var start = serialized.nodes[Math.floor(Math.random() * serialized.nodes.length)];
var end = serialized.nodes[Math.floor(Math.random() * serialized.nodes.length)];


console.log("Finding " + end.id + " from " + start.id + ":");


var startTime = new Date();
var steps = breadth(graph, start.id, end.id);
if (steps !== -1)
	console.log("   Breadth-first: Target found.  Checked " + steps + " nodes.  Process took " + (new Date() - startTime) + "ms.");
else
	console.log("   Breadth-first: Target not found, or graph has a negative cycle.  Process took " + (new Date() - startTime) + "ms.");


//console.log("   Breadth-first: " + (steps === -1 ? " Could not locate" : (steps.toLocaleString() + " steps")) + ", in " + (new Date() - startTime) + "ms.");

startTime = new Date();
steps = depth(graph, start.id, end.id);
if (steps !== -1)
	console.log("   Depth-first: Target found.  Checked " + steps + " nodes.  Process took " + (new Date() - startTime) + "ms.");
else
	console.log("   Depth-first: Target not found, or graph has a negative cycle.  Process took " + (new Date() - startTime) + "ms.");

startTime = new Date();
results = bellmanford(graph, start.id, end.id);
if (results.found)
	console.log("   Bellman-Ford:  Path is " + results.path.length.toLocaleString() + " nodes long.  Checked " + results.nodesChecked.toLocaleString() + " nodes.  Process took " + (new Date() - startTime) + "ms.");
else
	console.log("   Bellman-Ford: Path not found, or graph has a negative cycle.  Process took " + (new Date() - startTime) + "ms.");

startTime = new Date();
results = dijkstra(graph, start.id, end.id);
if (results.found)
	console.log("   Dijkstra:  Path is " + results.path.length.toLocaleString() + " nodes long.  Checked " + results.nodesChecked.toLocaleString() + " nodes.  Process took " + (new Date() - startTime) + "ms.");
else
	console.log("   Dijkstra: Path not found, or graph has a negative cycle.  Process took " + (new Date() - startTime) + "ms.");