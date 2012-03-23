var io = require('socket.io').listen(8080);

var getNextCell = function() {
  return {id:{x: 1, y: 2, generation: 1}, isAlive: 1, neighbors: [0,0,1,0,1,1,0,0]};
};

var sendProcessCell = function(socket) {
  socket.emit('processCell', getNextCell());
}

var worker = io.of('/worker')
.on('connection', function (socket) {
  socket.on('cellProcessed', function(processedCellData) {
    //update the board;
    sendProcessCell(socket)
  });
  sendProcessCell(socket);
});
