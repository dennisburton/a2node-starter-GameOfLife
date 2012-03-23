var io = require('socket.io').listen(8080);

io.sockets.on('connection', function (socket) {
  socket.emit('processBoard', { id: {foo:"bar"}, neighbors: [1,1,1,1,1,1,1,1], isAlive: 1});

  socket.on('boardProcessed', function(data) {
	  console.log("Woot board processed!");
	  console.log(data);
	 });

});

