'use strict'
var fs = require('fs');
var path = require('path');
var q = require('q');
var csv = require('fast-csv');

var stopData = [];
var edgeData = [];

createStops()
.then(function() {
	fs.writeFileSync("./stops.json", JSON.stringify(stopData));
	return createEdges();
})
.then(function() {
	console.log("Edges: ", edgeData[0]);
	fs.writeFileSync("./routes.json", JSON.stringify(edgeData));
})
.catch(function(err) {
	console.error(err.message);
	console.error(err.stack);
});



function createStops() {
	var deferred = q.defer();

	readCSV(path.resolve("./stops.csv"))
	.progress(function(data) {

		stopData.push({
			id: data.stop_id,
			name: data.stop_name,
			desc: data.stop_desc,
			lat: data.stop_lat,
			lon: data.stop_lon
		})
	})
	.then(deferred.resolve)
	.catch(deferred.reject)
	;

	return deferred.promise;
}


/**
 * Reads a stop_times.csv from the CapMetro data set, linking stops
 * @returns {promise}
 */

function createEdges() {
	var deferred = q.defer();

	var trips = {};


	readCSV(path.resolve("./stop_times.csv"))
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
					//graph.addEdge(data[i-1], data[i]);
					edgeData.push({source: data[i-1], target: data[i]});
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