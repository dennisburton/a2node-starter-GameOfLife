var io = require('socket.io').listen(8080);

function getPayload() {
    return { id: {foo:"bar"}, neighbors: [(Math.random() > 0.5),(Math.random() > 0.5),(Math.random() > 0.5),(Math.random() > 0.5),(Math.random() > 0.5),(Math.random() > 0.5),(Math.random() > 0.5),(Math.random() > 0.5)], isAlive: 1};
}

io.sockets.on('connection', function (socket) {

  socket.emit('processCell', getPayload());


  socket.on('cellProcessed', function(data) {
    console.log('processed!', data);
    socket.emit('processCell', getPayload());
  });

});

