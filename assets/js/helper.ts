export function getCoords(e, board)  {
  return board.map((row,i) => {
    if (!row.includes(e)) {
      return null
    }
    return [i,row.indexOf(e)]
  }).filter((a) => a != null ).at(0)

}

export function getClass(index) {
  return `row-${index + 1}`
}

export default {
  methods: {
    getCoords(e, board)  {
      return board.map((row,i) => {
        if (!row.includes(e)) {
          return null
        }
        return [i,row.indexOf(e)]
      }).filter((a) => a != null )[0]
    
    },
    getClass(index) {
      return `row-${index + 1}`
    }
  },

}