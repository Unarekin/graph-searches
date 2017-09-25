'use strict'
///////////////////////////////////////////////////////////////////////////
//	Modules
///////////////////////////////////////////////////////////////////////////
var fs 			= require('fs');
var path 		= require('path');
var graphLib 	= require("graph-data-structure");
var q 			= require('q');
var breadth     = require('./breadth-first-search');
///////////////////////////////////////////////////////////////////////////



var graph = require("./data")();
var serialized = graph.serialize();

console.log("Built " + serialized.nodes.length.toLocaleString() + " nodes and " + serialized.links.length.toLocaleString() + " edges.");

var start = serialized.nodes[Math.floor(Math.random() * serialized.nodes.length)];
var end = serialized.nodes[Math.floor(Math.random() * serialized.nodes.length)];


console.log("Finding " + end.id + " from " + start.id + ":");


var startTime = new Date();
var steps = breadth(graph, start.id, end.id);
console.log("   Breadth-first: " + (steps === -1 ? " Could not locate" : steps.toLocaleString()) + " steps, in " + (new Date() - startTime) + "ms.");
