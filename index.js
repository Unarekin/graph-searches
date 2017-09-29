'use strict'
///////////////////////////////////////////////////////////////////////////
//	Modules
///////////////////////////////////////////////////////////////////////////
var fs 			= require('fs');
var path 		= require('path');
var graphLib 	= require("graphlib");
var q 			= require('q');
var breadth     = require('./breadth-first-search');
var depth       = require('./depth-first-search');
var bellmanford = require('./bellman-ford');
var dijkstra    = require('./dijkstra');
var astar       = require('./a-star');
///////////////////////////////////////////////////////////////////////////



var graph = require("./data");
var results = [];


var nodes = graph.nodes();
var start = nodes[Math.floor(Math.random() * nodes.length)];
var end = nodes[Math.floor(Math.random() * nodes.length)];


console.log("Finding " + end + " from " + start + ":");


// Breadth-first search
var startTime = new Date();
var steps = breadth(graph, start, end);
if (steps !== -1)
	console.log("   Breadth-first: Target found.  Checked " + steps + " nodes.  Process took " + (new Date() - startTime) + "ms.");
else
	console.log("   Breadth-first: Target not found, or graph has a negative cycle.  Process took " + (new Date() - startTime) + "ms.");


// Depth-first search
startTime = new Date();
steps = depth(graph, start, end);
if (steps !== -1)
	console.log("   Depth-first: Target found.  Checked " + steps + " nodes.  Process took " + (new Date() - startTime) + "ms.");
else
	console.log("   Depth-first: Target not found, or graph has a negative cycle.  Process took " + (new Date() - startTime) + "ms.");


// Bellman-Ford
startTime = new Date();
results = bellmanford(graph, start, end);
if (results.found)
	console.log("   Bellman-Ford:  Path is " + results.path.length.toLocaleString() + " nodes long.  Checked " + results.nodesChecked.toLocaleString() + " nodes.  Process took " + (new Date() - startTime) + "ms.");
else
	console.log("   Bellman-Ford: Path not found, or graph has a negative cycle.  Process took " + (new Date() - startTime) + "ms.");


// Dijkstra's
startTime = new Date();
results = dijkstra(graph, start, end);
if (results.found)
	console.log("   Dijkstra:  Path is " + results.path.length.toLocaleString() + " nodes long.  Checked " + results.nodesChecked.toLocaleString() + " nodes.  Process took " + (new Date() - startTime) + "ms.");
else
	console.log("   Dijkstra: Path not found, or graph has a negative cycle.  Process took " + (new Date() - startTime) + "ms.");

// A*
startTime = new Date();
results = astar(graph, start, end);
if (results.found)
	console.log("   A*:  Path is " + results.path.length.toLocaleString() + " nodes long.  Checked " + results.nodesChecked.toLocaleString() + " nodes.  Process took " + (new Date() - startTime) + "ms.");
else
	console.log("   A*: Path not found, or graph has a negative cycle.  Process took " + (new Date() - startTime) + "ms.");