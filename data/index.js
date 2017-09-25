'use strict'
var graphLib = require('graph-data-structure');
var fs = require('fs');
var path = require('path');
var q = require('q');
var csv = require("fast-csv");

module.exports = graphData;


function graphData() {
	var data = JSON.parse(fs.readFileSync(path.resolve(path.join(__dirname, "graph.json")), 'utf-8'));
	
	var graph = new graphLib();
	graph.deserialize(data);
	return graph;
}






graphData.prototype.recreateData = function() {
	var graph = new graphLib();
	return createStops()
	         .then(function() { return createEdges(graph); })	
	         .then(function() {
	         	var data = graph.serialize();
	         	fs.writeFileSync(path.resolve("./graph.json", JSON.stringify(data)), 'utf-8');
	         	return graph;
	         });
}






/**
 * Reads a stops.csv from the CapMetro data set, building a list of nodes from each stop found.
 * @returns {promise}
 */
function createStops(graph) {
	var deferred = q.defer();

	readCSV(path.resolve("./data/stops.csv"))
	.progress(function(data) { graph.addNode(data.stop_id); })
	.then(deferred.resolve)
	.catch(deferred.reject)
	;

	return deferred.promise;
}

/**
 * Reads a stop_times.csv from the CapMetro data set, linking stops
 * @returns {promise}
 */

function createEdges(graph) {
	var deferred = q.defer();

	var trips = {};


	readCSV(path.resolve("./data/stop_times.csv"))
	.progress(function(data) {
		if (!trips[data.trip_id])
			trips[data.trip_id] = [];
		trips[data.trip_id][parseInt(data.stop_sequence)-1] = data.stop_id;
	})
	.then(function() {
		for (var trip_id in trips) {
			var data = trips[trip_id];
			for (let i=1;i<data.length;i++) {
				var adjacent = graph.adjacent(data[i-1]);
				if (adjacent.indexOf(data[i]) === -1) {
					graph.addEdge(data[i-1], data[i]);
				}
			}
		}
		deferred.resolve();
	})
	.catch(deferred.reject)
	;

	return deferred.promise;
}


/*
 * Reads a CSV file, emitting a promise progress event when a new item is read.
 * @param {string} file - The path to the file to be read
 * @returns {promise}
 */
function readCSV(file) {
	var deferred = q.defer();

	var fileStream = fs.createReadStream(file, 'utf-8');
	var csvStream = csv({
		objectMode: true,
		headers: true
	})
	.on("data", deferred.notify)
	.on("end", deferred.resolve)
	.on('error', deferred.reject);

	fileStream.pipe(csvStream);

	return deferred.promise;
}