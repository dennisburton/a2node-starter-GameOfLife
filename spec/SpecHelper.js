(function() {

  gol.setupNeighbors = function(cell, liveCount, deadCount) {
    gol.setupLiveNeighbors(cell, liveCount);
    return gol.setupDeadNeighbors(cell, deadCount);
  };

  gol.setupLiveNeighbors = function(cell, count) {
    var i, liveCell, _results;
    if (count === 0) return;
    _results = [];
    for (i = 1; 1 <= count ? i <= count : i >= count; 1 <= count ? i++ : i--) {
      liveCell = new gol.Cell();
      liveCell.isAlive = true;
      _results.push(cell.neighbors.push(liveCell));
    }
    return _results;
  };

  gol.setupDeadNeighbors = function(cell, count) {
    var deadCell, i, _results;
    if (count === 0) return;
    _results = [];
    for (i = 1; 1 <= count ? i <= count : i >= count; 1 <= count ? i++ : i--) {
      deadCell = new gol.Cell();
      deadCell.isAlive = false;
      _results.push(cell.neighbors.push(deadCell));
    }
    return _results;
  };

  gol.setLiveCell = function(board, row, column) {
    var currentCell;
    currentCell = board.rows[row].cells[column];
    return currentCell.isAlive = true;
  };

  gol.cellAt = function(board, row, column) {
    return board.rows[row].cells[column];
  };

}).call(this);
