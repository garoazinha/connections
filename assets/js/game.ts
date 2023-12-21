
import { createApp, ref } from 'vue/dist/vue.esm-bundler.js'

import { Buttonesque as buttonesque } from "./button"

let rawItems = [["BOUGH", "COUGH", "DOUGH", "TOUGH"],
["BUNKER", "FAIRWAY", "GREEN", "ROUGH"], 
["ENOUGH", "MERCY", "STOP", "UNCLE"],
["BAWDY", "BLUE", "COARSE", "RISQUE"]]



const game = `
<div class="game">
  <div v-for="row in foundConnections" class="row found">
    <div v-for="item in row" class="cell">
      {{item }}

    </div>
  </div>

  <div v-for="row in items" class="row">
    <buttonesque v-for="cell in row"
                 v-bind:g="cell"
                 class="cell"
                 v-bind:name="cell"
                 v-bind:greet="greet"
                 v-bind:isactive="isactive(cell)"
                 v-bind:key="cell"> </buttonesque>

  </div>
</div>
`

export default {
  components: {
    buttonesque
  },
  setup() {

  },
  data() {
    let options = []
    const shuffledItems = shuffleMatrix(rawItems)
    let items =  ref(shuffledItems)
    console.log(items)
    let foundConnections = ref([])
    return {
      foundConnections,
      options,
      items
    }
  },
  methods: {
    greet(item) {
      if (this.options.includes(item)) {
        this.deselect(item)
      } else {
        this.options.length < 4 ? this.options.push(item) : null
      }
    },
    deselect(item) {
      this.options.splice(this.options.indexOf(item), 1)
    },
    isactive(item) {        
      return this.options.includes(item)
    },
    checkCorrectness(options) {
      
      let stuff = rawItems.filter((row) => {
        return areEqual(row, options)
      })
      if (stuff.length > 0) {
        console.log('DONE')
        this.foundConnections.push(options.sort())

        const hate = options.map((e) => {
          return this.editBoard(e)
           
        })

        let board = [...this.items]
        hate.map((n,i) => {
          const rowToMove = [...board[0]]
          const x = n[0]
          const y = n[1]

          console.log(`n ${n} e i ${i} e ${board[x][y]} e ${rowToMove[i]}`)

          board[0][i] = board[x][y]
          board[x][y] = rowToMove[i]
        })
        board.splice(0,1)

        this.items = board
        
      } else {
        console.log('NOT DONE')
      }
    },
    editBoard(e) {
      
      let love = this.items.map((row,i) => {
        if (!row.includes(e)) {
          return null
        }
        return [i,row.indexOf(e)]
      }).filter((a) => a != null )
    
      return love[0]

    }
  },
  watch: {
    options: {
      handler(newVal, oldVal) {
        if (newVal.length == 4) {
          this.checkCorrectness(newVal)
          this.options = []
        }
      },
      deep: true 
    },
  },
  template: game,
}

function shuffleMatrix(matrix) {
  let flat = matrix.flat()
  return matrix.map((row, i) => {
    return row.map((cell, j) => {
      const randI = Math.floor(Math.random() * (flat.length));
      const value = flat[randI]
      flat.splice(randI, 1)
      return value
    })
  })
}

// function checkCorrectness(options, shuffledItems, rawItems) {
//   let stuff = rawItems.filter((row) => {
//     return areEqual(row, options)
//   })

//   if (stuff.length > 0) {
//     console.log('DONE')
//     let remove = shuffledItems.indexOf(stuff[0])
//     shuffledItems.splice(remove, 1)
    
//   } else {
//     console.log('NOT DONE')
//   }

// }

function areEqual(array1, array2) {
  if (array1.length === array2.length) {
    return array1.every(element => {
      if (array2.includes(element)) {
        return true;
      }

      return false;
    });
  }

  return false;
}
