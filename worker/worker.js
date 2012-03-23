var io = require('socket.io-client'),
	_ = require('underscore');



var golClient = (function() {
	var socket = io.connect('http://localhost:8080/worker');
	return {
		start: function() {
			socket.on('connect', this.didConnect);
			socket.on('processCell', this.processBoard);
		},

		didConnect: function() {
			console.log('connected!');
		},


		processCell: function(payload) {
			var aliveNeighbors = _.reduce(payload.neighbors, function(memo, num) { return memo + num; }, 0),
				outcomeIsAlive;

			if (payload.isAlive) {
				outcomeIsAlive = (aliveNeighbors === 2 || aliveNeighbors === 3);
			} else {
				outcomeIsAlive = (aliveNeighbors === 3);
			}

			console.log(payload, aliveNeighbors, outcomeIsAlive);

			socket.emit('cellProcessed', { id: payload.id, isAlive: outcomeIsAlive });
		}

	};
})();


golClient.start();
