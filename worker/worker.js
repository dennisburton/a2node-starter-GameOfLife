var io = require('socket.io-client');



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

		processBoard: function(payload) {
			console.log('Cell is alive, returning status');
			socket.emit('cellProcessed', { id: payload.id, isAlive: 1 });
		}

	};
})();


golClient.start();
