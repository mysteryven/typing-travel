import { Cell, DiffResult } from './types'

const MATCH = 0
const INSERT = 1
const DELETE = 2

export default function doDiff(fromArray: string[], toArray: string[]) {
  const pathCostAndFlow = compareString(fromArray, toArray)
  return reconstructPath(pathCostAndFlow, fromArray, toArray)
}

export function reconstructPath(pathCostAndFlow: Array<Cell[]>, from: string[], to: string[]): DiffResult[] {
  const diffResult: DiffResult[] = []

  const reconstructPathImpl = (i: number, j: number) => {
    if (pathCostAndFlow[i][j].parent === -1) {
      return
    }

    if (pathCostAndFlow[i][j].parent === MATCH) {
      reconstructPathImpl(i - 1, j - 1)
      diffResult.push({
        type: from[i-1] === to[j-1] ? 'match' : 'substitute',
        content: to[i-1]
      })
    } else if (pathCostAndFlow[i][j].parent === INSERT) {
      reconstructPathImpl(i, j-1)
      diffResult.push({
        type: 'insert',
        content: to[j-1]
      })
    } else if (pathCostAndFlow[i][j].parent === DELETE) {
      reconstructPathImpl(i-1, j)
      diffResult.push({
        type: 'delete',
        content: from[i-1]
      })
    }
  }

  reconstructPathImpl(from.length, to.length)

  return diffResult
}

export function compareString(from: string[], to: string[]): Array<Cell[]> {
  const row = from.length + 1
  const column = to.length + 1
  const opt: [number, number, number] = [0, 0, 0]

  const pathCostAndFlow: Array<Cell[]> = Array.from({
    length: row 
  }, () => new Array(column).fill(0).map(() => ({ cost: 0, parent: -1 })))

  pathCostAndFlow[0][0] = {
    cost: 0,
    parent: -1
  }

  for (let i = 1; i < row; i++) {
    pathCostAndFlow[i][0].cost = i
    pathCostAndFlow[i][0].parent = DELETE
  }

  for (let i = 1; i < column; i++) {
    pathCostAndFlow[0][i].cost = i
    pathCostAndFlow[0][i].parent = INSERT
  }

  for (let i = 1; i < row; i++) {
    for (let j = 1; j < column; j++) {
      opt[MATCH] = pathCostAndFlow[i - 1][j - 1].cost + match(from[i - 1], to[j - 1])
      opt[INSERT] = pathCostAndFlow[i][j - 1].cost + indel()
      opt[DELETE] = pathCostAndFlow[i - 1][j].cost + indel()
      pathCostAndFlow[i][j].cost = opt[MATCH]
      pathCostAndFlow[i][j].parent = MATCH

      for (let k = INSERT; k <= DELETE; k++) {
        if (opt[k] < pathCostAndFlow[i][j].cost) {
          pathCostAndFlow[i][j] = {
            cost: opt[k],
            parent: k
          }
        }
      }
    }
  }

  return pathCostAndFlow
}

function match(s1: string, s2: string) {
  return s1 === s2 ? 0 : 1
}

function indel() {
  return 1
}