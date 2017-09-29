'use strict'
var graphLib = require('graphlib');
var fs = require('fs');
var path = require('path');
var q = require('q');
var csv = require("fast-csv");


var graph = new graphLib.Graph();
var serialized = JSON.parse(fs.readFileSync(path.resolve(path.join(__dirname, "graph.json")), 'utf-8'));

serialized.nodes.forEach(function(node) { graph.setNode(node.id, node); });
serialized.edges.forEach(function(edge) { graph.setEdge(edge.source, edge.target, edge); });

module.exports = graph;