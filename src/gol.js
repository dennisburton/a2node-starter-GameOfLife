(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.gol = {};

  gol.Cell = (function() {

    function Cell() {
      this.processCell = __bind(this.processCell, this);
      this.processDeadCell = __bind(this.processDeadCell, this);
      this.processLiveCell = __bind(this.processLiveCell, this);
      this.liveNeighborCount = __bind(this.liveNeighborCount, this);
      this.isAliveNextGeneration = __bind(this.isAliveNextGeneration, this);      this.neighbors = [];
      this.isAlive = false;
    }

    Cell.prototype.isAliveNextGeneration = function() {
      if (this.isAlive) return this.processLiveCell();
      if (!this.isAlive) return this.processDeadCell();
    };

    Cell.prototype.liveNeighborCount = function() {
      var liveNeighbors;
      liveNeighbors = _(this.neighbors).filter(function(neighbor) {
        return neighbor.isAlive;
      });
      return liveNeighbors.length;
    };

    Cell.prototype.processLiveCell = function() {
      var liveNeighborCount;
      liveNeighborCount = this.liveNeighborCount();
      if (liveNeighborCount === 2 || liveNeighborCount === 3) return true;
      return false;
    };

    Cell.prototype.processDeadCell = function() {
      var liveNeighborCount;
      liveNeighborCount = this.liveNeighborCount();
      if (liveNeighborCount === 3) return true;
      return false;
    };

    Cell.prototype.processCell = function() {
      if (this.isAlive) return this.processLiveCell();
      if (!this.isAlive) return this.processDeadCell();
    };

    return Cell;

  })();

  gol.Board = (function() {

    function Board(boardSize) {
      this.processGeneration = __bind(this.processGeneration, this);
      this.liveCellCount = __bind(this.liveCellCount, this);
      this.setupNeighbors = __bind(this.setupNeighbors, this);
      this.populateCells = __bind(this.populateCells, this);
      this.createCells = __bind(this.createCells, this);
      this.cellAt = __bind(this.cellAt, this);
      var columnNumber, rowNumber, _ref, _ref2;
      this.boardSize = boardSize;
      this.rows = [];
      for (rowNumber = 0, _ref = this.boardSize - 1; 0 <= _ref ? rowNumber <= _ref : rowNumber >= _ref; 0 <= _ref ? rowNumber++ : rowNumber--) {
        this.rows.push({
          cells: []
        });
        for (columnNumber = 0, _ref2 = this.boardSize - 1; 0 <= _ref2 ? columnNumber <= _ref2 : columnNumber >= _ref2; 0 <= _ref2 ? columnNumber++ : columnNumber--) {
          this.rows[rowNumber].cells.push(new gol.Cell());
        }
      }
    }

    Board.prototype.cellAt = function(row, column) {
      return this.rows[row].cells[column];
    };

    Board.prototype.createCells = function() {
      this.populateCells();
      return this.setupNeighbors();
    };

    Board.prototype.populateCells = function() {
      var cell, row, _i, _len, _ref, _results;
      _ref = this.rows;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        row = _ref[_i];
        _results.push((function() {
          var _j, _len2, _ref2, _results2;
          _ref2 = row.cells;
          _results2 = [];
          for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
            cell = _ref2[_j];
            _results2.push(cell.isAlive = Math.random() > (1 - this.weight));
          }
          return _results2;
        }).call(this));
      }
      return _results;
    };

    Board.prototype.setupNeighbors = function() {
      var columnNumber, currentCell, leftColumn, lowerRow, rightColumn, rowNumber, upperRow, _ref, _results;
      _results = [];
      for (rowNumber = 0, _ref = this.boardSize - 1; 0 <= _ref ? rowNumber <= _ref : rowNumber >= _ref; 0 <= _ref ? rowNumber++ : rowNumber--) {
        _results.push((function() {
          var _ref2, _results2;
          _results2 = [];
          for (columnNumber = 0, _ref2 = this.boardSize - 1; 0 <= _ref2 ? columnNumber <= _ref2 : columnNumber >= _ref2; 0 <= _ref2 ? columnNumber++ : columnNumber--) {
            currentCell = this.rows[rowNumber].cells[columnNumber];
            upperRow = rowNumber - 1;
            lowerRow = rowNumber + 1;
            leftColumn = columnNumber - 1;
            rightColumn = columnNumber + 1;
            if (upperRow >= 0) {
              if (leftColumn >= 0) {
                currentCell.neighbors.push(this.rows[upperRow].cells[leftColumn]);
              }
              currentCell.neighbors.push(this.rows[upperRow].cells[columnNumber]);
              if (rightColumn < this.boardSize) {
                currentCell.neighbors.push(this.rows[upperRow].cells[rightColumn]);
              }
            }
            if (leftColumn >= 0) {
              currentCell.neighbors.push(this.rows[rowNumber].cells[leftColumn]);
            }
            if (rightColumn < this.boardSize) {
              currentCell.neighbors.push(this.rows[rowNumber].cells[rightColumn]);
            }
            if (lowerRow < this.boardSize) {
              if (leftColumn >= 0) {
                currentCell.neighbors.push(this.rows[lowerRow].cells[leftColumn]);
              }
              currentCell.neighbors.push(this.rows[lowerRow].cells[columnNumber]);
              if (rightColumn < this.boardSize) {
                _results2.push(currentCell.neighbors.push(this.rows[lowerRow].cells[rightColumn]));
              } else {
                _results2.push(void 0);
              }
            } else {
              _results2.push(void 0);
            }
          }
          return _results2;
        }).call(this));
      }
      return _results;
    };

    Board.prototype.liveCellCount = function() {
      var cell, row, tally, _i, _j, _len, _len2, _ref, _ref2;
      tally = 0;
      _ref = this.rows;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        row = _ref[_i];
        _ref2 = row.cells;
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          cell = _ref2[_j];
          if (cell.isAlive) tally = tally + 1;
        }
      }
      return tally;
    };

    Board.prototype.processGeneration = function() {
      var columnNumber, currentCell, nextBoard, nextGenCell, rowNumber, _ref, _ref2;
      nextBoard = new gol.Board(this.boardSize);
      for (rowNumber = 0, _ref = this.boardSize - 1; 0 <= _ref ? rowNumber <= _ref : rowNumber >= _ref; 0 <= _ref ? rowNumber++ : rowNumber--) {
        for (columnNumber = 0, _ref2 = this.boardSize - 1; 0 <= _ref2 ? columnNumber <= _ref2 : columnNumber >= _ref2; 0 <= _ref2 ? columnNumber++ : columnNumber--) {
          nextGenCell = nextBoard.cellAt(rowNumber, columnNumber);
          currentCell = this.rows[rowNumber].cells[columnNumber];
          nextGenCell.isAlive = currentCell.processCell();
        }
      }
      return nextBoard;
    };

    return Board;

  })();

}).call(this);
