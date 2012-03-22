gol.setupNeighbors = (cell,liveCount,deadCount) ->
  gol.setupLiveNeighbors(cell,liveCount)
  gol.setupDeadNeighbors(cell,deadCount)

gol.setupLiveNeighbors = (cell,count) ->
  return if count == 0
  for i in [1..count]
    liveCell = new gol.Cell()
    liveCell.isAlive = true
    cell.neighbors.push liveCell

gol.setupDeadNeighbors = (cell,count) ->
  return if count == 0
  for i in [1..count]
    deadCell = new gol.Cell()
    deadCell.isAlive = false
    cell.neighbors.push deadCell

gol.setLiveCell = (board,row,column) ->
  currentCell = board.rows[row].cells[column]
  currentCell.isAlive = true

gol.cellAt = (board,row,column) ->
  board.rows[row].cells[column]
