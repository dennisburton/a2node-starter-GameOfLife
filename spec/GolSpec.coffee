describe "Board Setup", ->
  beforeEach ->
    boardSize = 5
    @board = new gol.Board(boardSize)

  describe "Initial population", ->
    it "should create all live cells with weight of 1", ->
      @board.weight = 1
      @board.createCells()
      liveCellCount = @board.liveCellCount()
      expect(liveCellCount).toEqual(25)

    it "soulld create no live cells with a wight of 0", ->
      @board.weight = 0
      @board.createCells()
      liveCellCount = @board.liveCellCount()
      expect(liveCellCount).toEqual(0)

describe "Board Generations", ->
  beforeEach ->
    boardSize = 5
    @board = new gol.Board(boardSize)
    @board.weight = 0
    @board.createCells()
    gol.setLiveCell(@board,1,0)
    gol.setLiveCell(@board,1,1)
    gol.setLiveCell(@board,1,2)
    gol.setLiveCell(@board,1,3)
    gol.setLiveCell(@board,1,4)
    gol.setLiveCell(@board,2,0)
    gol.setLiveCell(@board,2,1)
    gol.setLiveCell(@board,2,2)
    gol.setLiveCell(@board,2,3)
    gol.setLiveCell(@board,2,4)
    @nextGeneration = @board.processGeneration()

  it "should process generation", ->
    expect(gol.cellAt(@nextGeneration,0,0).isAlive).toBeFalsy()
    expect(gol.cellAt(@nextGeneration,0,1).isAlive).toBeTruthy()
    expect(gol.cellAt(@nextGeneration,0,2).isAlive).toBeTruthy()
    expect(gol.cellAt(@nextGeneration,0,3).isAlive).toBeTruthy()
    expect(gol.cellAt(@nextGeneration,0,4).isAlive).toBeFalsy()
    expect(gol.cellAt(@nextGeneration,1,0).isAlive).toBeTruthy()
    expect(gol.cellAt(@nextGeneration,1,1).isAlive).toBeFalsy()
    expect(gol.cellAt(@nextGeneration,1,2).isAlive).toBeFalsy()
    expect(gol.cellAt(@nextGeneration,1,3).isAlive).toBeFalsy()
    expect(gol.cellAt(@nextGeneration,1,4).isAlive).toBeTruthy()
    expect(gol.cellAt(@nextGeneration,2,0).isAlive).toBeTruthy()
    expect(gol.cellAt(@nextGeneration,2,1).isAlive).toBeFalsy()
    expect(gol.cellAt(@nextGeneration,2,2).isAlive).toBeFalsy()
    expect(gol.cellAt(@nextGeneration,2,3).isAlive).toBeFalsy()
    expect(gol.cellAt(@nextGeneration,2,4).isAlive).toBeTruthy()
    expect(gol.cellAt(@nextGeneration,3,0).isAlive).toBeFalsy()
    expect(gol.cellAt(@nextGeneration,3,1).isAlive).toBeTruthy()
    expect(gol.cellAt(@nextGeneration,3,2).isAlive).toBeTruthy()
    expect(gol.cellAt(@nextGeneration,3,3).isAlive).toBeTruthy()
    expect(gol.cellAt(@nextGeneration,3,4).isAlive).toBeFalsy()
    expect(gol.cellAt(@nextGeneration,4,0).isAlive).toBeFalsy()
    expect(gol.cellAt(@nextGeneration,4,1).isAlive).toBeFalsy()
    expect(gol.cellAt(@nextGeneration,4,2).isAlive).toBeFalsy()
    expect(gol.cellAt(@nextGeneration,4,3).isAlive).toBeFalsy()
    expect(gol.cellAt(@nextGeneration,4,4).isAlive).toBeFalsy()

    

describe "Board Processing", ->
  beforeEach ->
    @cell = new gol.Cell()

  describe "Neighbor processing", ->
    it "cell without a live neighbor should report 0 live neighbors", ->
      result = @cell.liveNeighborCount()
      expect(result).toEqual(0)

    it "cell with 1 live neighbor should report 1 live neighbors", ->
      gol.setupNeighbors(@cell,1,7)
      result = @cell.liveNeighborCount()
      expect(result).toEqual(1)

describe "Cell Processing", ->
  beforeEach ->
    @cell = new gol.Cell()

  describe "live cell", ->
    beforeEach ->
      @cell.isAlive = true

    describe "should die with fewer than 2 live neighbors", ->
      it "should die with 0 live neighbors", ->
        @cell.liveNeighborCount = -> 0
        result = @cell.isAliveNextGeneration()
        expect(result).toBeFalsy()
      it "should die with 1 live neighbors", ->
        @cell.liveNeighborCount = -> 1
        result = @cell.isAliveNextGeneration()
        expect(result).toBeFalsy()

    describe "should live with 2 or 3 neighbors", ->
      it "should live with 2 neighbors", ->
        @cell.liveNeighborCount = -> 2
        result = @cell.isAliveNextGeneration()
        expect(result).toBeTruthy()
      it "should live with 3 neighbors", ->
        @cell.liveNeighborCount = -> 3
        result = @cell.isAliveNextGeneration()
        expect(result).toBeTruthy()

    describe "should die with more than 3 neighbors", ->
      it "should die with 4 neighbors", ->
        @cell.liveNeighborCount = -> 4
        result = @cell.isAliveNextGeneration()
        expect(result).toBeFalsy()
      it "should die with 5 neighbors", ->
        @cell.liveNeighborCount = -> 5
        result = @cell.isAliveNextGeneration()
        expect(result).toBeFalsy()
      it "should die with 6 neighbors", ->
        @cell.liveNeighborCount = -> 6
        result = @cell.isAliveNextGeneration()
        expect(result).toBeFalsy()
      it "should die with 7 neighbors", ->
        @cell.liveNeighborCount = -> 7
        result = @cell.isAliveNextGeneration()
        expect(result).toBeFalsy()
      it "should die with 8 neighbors", ->
        @cell.liveNeighborCount = -> 8
        result = @cell.isAliveNextGeneration()
        expect(result).toBeFalsy()
      it "should die with more 9 neighbors", ->
        @cell.liveNeighborCount = -> 9
        result = @cell.isAliveNextGeneration()
        expect(result).toBeFalsy()


  describe "dead cell", ->
    beforeEach ->
      @cell.isAlive = false

    it "should become alive with 3 neighbors", ->
      @cell.liveNeighborCount = -> 3
      result = @cell.isAliveNextGeneration()
      expect(result).toBeTruthy()
      
    it "should stay dead with 0 neighbors", ->
      @cell.liveNeighborCount = -> 0
      result = @cell.isAliveNextGeneration()
      expect(result).toBeFalsy()
      
    it "should stay dead with 1 neighbors", ->
      @cell.liveNeighborCount = -> 1
      result = @cell.isAliveNextGeneration()
      expect(result).toBeFalsy()

    it "should stay dead with 2 neighbors", ->
      @cell.liveNeighborCount = -> 2
      result = @cell.isAliveNextGeneration()
      expect(result).toBeFalsy()

    it "should stay dead with 4 neighbors", ->
      @cell.liveNeighborCount = -> 4
      result = @cell.isAliveNextGeneration()
      expect(result).toBeFalsy()

    it "should stay dead with 5 neighbors", ->
      @cell.liveNeighborCount = -> 5
      result = @cell.isAliveNextGeneration()
      expect(result).toBeFalsy()

    it "should stay dead with 6 neighbors", ->
      @cell.liveNeighborCount = -> 6
      result = @cell.isAliveNextGeneration()
      expect(result).toBeFalsy()

    it "should stay dead with 7 neighbors", ->
      @cell.liveNeighborCount = -> 7
      result = @cell.isAliveNextGeneration()
      expect(result).toBeFalsy()

    it "should stay dead with 8 neighbors", ->
      @cell.liveNeighborCount = -> 8
      result = @cell.isAliveNextGeneration()
      expect(result).toBeFalsy()


