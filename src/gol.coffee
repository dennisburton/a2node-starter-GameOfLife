window.gol = {}

class gol.Cell
  constructor: ->
    @neighbors = []
    @isAlive = false

  isAliveNextGeneration: =>
    return @processLiveCell() if @isAlive
    return @processDeadCell() unless @isAlive

  liveNeighborCount: =>
    liveNeighbors = _(@neighbors).filter (neighbor) ->
      neighbor.isAlive
    liveNeighbors.length

  processLiveCell: =>
    liveNeighborCount = @liveNeighborCount()
    if liveNeighborCount == 2 or liveNeighborCount == 3
      return true
    return false

  processDeadCell: =>
    liveNeighborCount = @liveNeighborCount()
    return true if liveNeighborCount == 3 
    return false
  
  processCell: =>
    return @processLiveCell() if @isAlive
    return @processDeadCell() unless @isAlive

class gol.Board
  constructor: (boardSize) ->
    @boardSize = boardSize
    @rows = []
    for rowNumber in [0..(@boardSize-1)]
      @rows.push {cells: []}
      for columnNumber in [0..(@boardSize-1)]
        @rows[rowNumber].cells.push new gol.Cell()

  cellAt: (row,column) =>
    @rows[row].cells[column]

  createCells: =>
    @populateCells()
    @setupNeighbors()

  populateCells: =>
    for row in @rows
      for cell in row.cells
        cell.isAlive = Math.random() > (1-@weight)

  setupNeighbors: =>
    for rowNumber in [0..(@boardSize-1)]
      for columnNumber in [0..(@boardSize-1)]
        currentCell = @rows[rowNumber].cells[columnNumber]
        upperRow = rowNumber - 1
        lowerRow = rowNumber + 1
        leftColumn = columnNumber - 1
        rightColumn = columnNumber + 1

        if upperRow >= 0
          currentCell.neighbors.push(@rows[upperRow].cells[leftColumn]) if leftColumn >= 0
          currentCell.neighbors.push(@rows[upperRow].cells[columnNumber])
          currentCell.neighbors.push(@rows[upperRow].cells[rightColumn]) if rightColumn < @boardSize

        currentCell.neighbors.push(@rows[rowNumber].cells[leftColumn]) if leftColumn >= 0
        currentCell.neighbors.push(@rows[rowNumber].cells[rightColumn]) if rightColumn < @boardSize

        if lowerRow < @boardSize
          currentCell.neighbors.push(@rows[lowerRow].cells[leftColumn]) if leftColumn >= 0
          currentCell.neighbors.push(@rows[lowerRow].cells[columnNumber])
          currentCell.neighbors.push(@rows[lowerRow].cells[rightColumn]) if rightColumn < @boardSize

  liveCellCount: =>
    tally = 0
    for row in @rows
      for cell in row.cells
        tally = tally + 1 if cell.isAlive
    tally

  processGeneration: =>
    nextBoard = new gol.Board(@boardSize)
    for rowNumber in [0..(@boardSize-1)]
      for columnNumber in [0..(@boardSize-1)]
        nextGenCell = nextBoard.cellAt(rowNumber,columnNumber)
        currentCell = @rows[rowNumber].cells[columnNumber]
        nextGenCell.isAlive = currentCell.processCell()
    return nextBoard
