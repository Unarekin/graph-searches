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
console.log("   Breadth-first: " + (steps === -1 ? " Could not locate" : (steps.toLocaleString() + " steps")) + ", in " + (new Date() - startTime) + "ms.");

startTime = new Date();
steps = depth(graph, start.id, end.id);
console.log("   Depth-first: " + (steps === -1 ? " Could not locate" : (steps.toLocaleString() + " steps")) + ", in " + (new Date() - startTime) + "ms.");

startTime = new Date();
results = bellmanford(graph, start.id, end.id);
console.log("   bellman-ford: " + (results.length === 0 ? " Could not locate" : (results.length.toLocaleString() + " steps")) + ", in " + (new Date() - startTime) + "ms.");