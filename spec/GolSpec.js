(function() {

  describe("Board Setup", function() {
    beforeEach(function() {
      var boardSize;
      boardSize = 5;
      return this.board = new gol.Board(boardSize);
    });
    return describe("Initial population", function() {
      it("should create all live cells with weight of 1", function() {
        var liveCellCount;
        this.board.weight = 1;
        this.board.createCells();
        liveCellCount = this.board.liveCellCount();
        return expect(liveCellCount).toEqual(25);
      });
      return it("soulld create no live cells with a wight of 0", function() {
        var liveCellCount;
        this.board.weight = 0;
        this.board.createCells();
        liveCellCount = this.board.liveCellCount();
        return expect(liveCellCount).toEqual(0);
      });
    });
  });

  describe("Board Generations", function() {
    beforeEach(function() {
      var boardSize;
      boardSize = 5;
      this.board = new gol.Board(boardSize);
      this.board.weight = 0;
      this.board.createCells();
      gol.setLiveCell(this.board, 1, 0);
      gol.setLiveCell(this.board, 1, 1);
      gol.setLiveCell(this.board, 1, 2);
      gol.setLiveCell(this.board, 1, 3);
      gol.setLiveCell(this.board, 1, 4);
      gol.setLiveCell(this.board, 2, 0);
      gol.setLiveCell(this.board, 2, 1);
      gol.setLiveCell(this.board, 2, 2);
      gol.setLiveCell(this.board, 2, 3);
      gol.setLiveCell(this.board, 2, 4);
      return this.nextGeneration = this.board.processGeneration();
    });
    return it("should process generation", function() {
      expect(gol.cellAt(this.nextGeneration, 0, 0).isAlive).toBeFalsy();
      expect(gol.cellAt(this.nextGeneration, 0, 1).isAlive).toBeTruthy();
      expect(gol.cellAt(this.nextGeneration, 0, 2).isAlive).toBeTruthy();
      expect(gol.cellAt(this.nextGeneration, 0, 3).isAlive).toBeTruthy();
      expect(gol.cellAt(this.nextGeneration, 0, 4).isAlive).toBeFalsy();
      expect(gol.cellAt(this.nextGeneration, 1, 0).isAlive).toBeTruthy();
      expect(gol.cellAt(this.nextGeneration, 1, 1).isAlive).toBeFalsy();
      expect(gol.cellAt(this.nextGeneration, 1, 2).isAlive).toBeFalsy();
      expect(gol.cellAt(this.nextGeneration, 1, 3).isAlive).toBeFalsy();
      expect(gol.cellAt(this.nextGeneration, 1, 4).isAlive).toBeTruthy();
      expect(gol.cellAt(this.nextGeneration, 2, 0).isAlive).toBeTruthy();
      expect(gol.cellAt(this.nextGeneration, 2, 1).isAlive).toBeFalsy();
      expect(gol.cellAt(this.nextGeneration, 2, 2).isAlive).toBeFalsy();
      expect(gol.cellAt(this.nextGeneration, 2, 3).isAlive).toBeFalsy();
      expect(gol.cellAt(this.nextGeneration, 2, 4).isAlive).toBeTruthy();
      expect(gol.cellAt(this.nextGeneration, 3, 0).isAlive).toBeFalsy();
      expect(gol.cellAt(this.nextGeneration, 3, 1).isAlive).toBeTruthy();
      expect(gol.cellAt(this.nextGeneration, 3, 2).isAlive).toBeTruthy();
      expect(gol.cellAt(this.nextGeneration, 3, 3).isAlive).toBeTruthy();
      expect(gol.cellAt(this.nextGeneration, 3, 4).isAlive).toBeFalsy();
      expect(gol.cellAt(this.nextGeneration, 4, 0).isAlive).toBeFalsy();
      expect(gol.cellAt(this.nextGeneration, 4, 1).isAlive).toBeFalsy();
      expect(gol.cellAt(this.nextGeneration, 4, 2).isAlive).toBeFalsy();
      expect(gol.cellAt(this.nextGeneration, 4, 3).isAlive).toBeFalsy();
      return expect(gol.cellAt(this.nextGeneration, 4, 4).isAlive).toBeFalsy();
    });
  });

  describe("Board Processing", function() {
    beforeEach(function() {
      return this.cell = new gol.Cell();
    });
    return describe("Neighbor processing", function() {
      it("cell without a live neighbor should report 0 live neighbors", function() {
        var result;
        result = this.cell.liveNeighborCount();
        return expect(result).toEqual(0);
      });
      return it("cell with 1 live neighbor should report 1 live neighbors", function() {
        var result;
        gol.setupNeighbors(this.cell, 1, 7);
        result = this.cell.liveNeighborCount();
        return expect(result).toEqual(1);
      });
    });
  });

  describe("Cell Processing", function() {
    beforeEach(function() {
      return this.cell = new gol.Cell();
    });
    describe("live cell", function() {
      beforeEach(function() {
        return this.cell.isAlive = true;
      });
      describe("should die with fewer than 2 live neighbors", function() {
        it("should die with 0 live neighbors", function() {
          var result;
          this.cell.liveNeighborCount = function() {
            return 0;
          };
          result = this.cell.isAliveNextGeneration();
          return expect(result).toBeFalsy();
        });
        return it("should die with 1 live neighbors", function() {
          var result;
          this.cell.liveNeighborCount = function() {
            return 1;
          };
          result = this.cell.isAliveNextGeneration();
          return expect(result).toBeFalsy();
        });
      });
      describe("should live with 2 or 3 neighbors", function() {
        it("should live with 2 neighbors", function() {
          var result;
          this.cell.liveNeighborCount = function() {
            return 2;
          };
          result = this.cell.isAliveNextGeneration();
          return expect(result).toBeTruthy();
        });
        return it("should live with 3 neighbors", function() {
          var result;
          this.cell.liveNeighborCount = function() {
            return 3;
          };
          result = this.cell.isAliveNextGeneration();
          return expect(result).toBeTruthy();
        });
      });
      return describe("should die with more than 3 neighbors", function() {
        it("should die with 4 neighbors", function() {
          var result;
          this.cell.liveNeighborCount = function() {
            return 4;
          };
          result = this.cell.isAliveNextGeneration();
          return expect(result).toBeFalsy();
        });
        it("should die with 5 neighbors", function() {
          var result;
          this.cell.liveNeighborCount = function() {
            return 5;
          };
          result = this.cell.isAliveNextGeneration();
          return expect(result).toBeFalsy();
        });
        it("should die with 6 neighbors", function() {
          var result;
          this.cell.liveNeighborCount = function() {
            return 6;
          };
          result = this.cell.isAliveNextGeneration();
          return expect(result).toBeFalsy();
        });
        it("should die with 7 neighbors", function() {
          var result;
          this.cell.liveNeighborCount = function() {
            return 7;
          };
          result = this.cell.isAliveNextGeneration();
          return expect(result).toBeFalsy();
        });
        it("should die with 8 neighbors", function() {
          var result;
          this.cell.liveNeighborCount = function() {
            return 8;
          };
          result = this.cell.isAliveNextGeneration();
          return expect(result).toBeFalsy();
        });
        return it("should die with more 9 neighbors", function() {
          var result;
          this.cell.liveNeighborCount = function() {
            return 9;
          };
          result = this.cell.isAliveNextGeneration();
          return expect(result).toBeFalsy();
        });
      });
    });
    return describe("dead cell", function() {
      beforeEach(function() {
        return this.cell.isAlive = false;
      });
      it("should become alive with 3 neighbors", function() {
        var result;
        this.cell.liveNeighborCount = function() {
          return 3;
        };
        result = this.cell.isAliveNextGeneration();
        return expect(result).toBeTruthy();
      });
      it("should stay dead with 0 neighbors", function() {
        var result;
        this.cell.liveNeighborCount = function() {
          return 0;
        };
        result = this.cell.isAliveNextGeneration();
        return expect(result).toBeFalsy();
      });
      it("should stay dead with 1 neighbors", function() {
        var result;
        this.cell.liveNeighborCount = function() {
          return 1;
        };
        result = this.cell.isAliveNextGeneration();
        return expect(result).toBeFalsy();
      });
      it("should stay dead with 2 neighbors", function() {
        var result;
        this.cell.liveNeighborCount = function() {
          return 2;
        };
        result = this.cell.isAliveNextGeneration();
        return expect(result).toBeFalsy();
      });
      it("should stay dead with 4 neighbors", function() {
        var result;
        this.cell.liveNeighborCount = function() {
          return 4;
        };
        result = this.cell.isAliveNextGeneration();
        return expect(result).toBeFalsy();
      });
      it("should stay dead with 5 neighbors", function() {
        var result;
        this.cell.liveNeighborCount = function() {
          return 5;
        };
        result = this.cell.isAliveNextGeneration();
        return expect(result).toBeFalsy();
      });
      it("should stay dead with 6 neighbors", function() {
        var result;
        this.cell.liveNeighborCount = function() {
          return 6;
        };
        result = this.cell.isAliveNextGeneration();
        return expect(result).toBeFalsy();
      });
      it("should stay dead with 7 neighbors", function() {
        var result;
        this.cell.liveNeighborCount = function() {
          return 7;
        };
        result = this.cell.isAliveNextGeneration();
        return expect(result).toBeFalsy();
      });
      return it("should stay dead with 8 neighbors", function() {
        var result;
        this.cell.liveNeighborCount = function() {
          return 8;
        };
        result = this.cell.isAliveNextGeneration();
        return expect(result).toBeFalsy();
      });
    });
  });

}).call(this);
