
import { createApp, ref } from 'vue/dist/vue.esm-bundler.js'

import { Buttonesque as buttonesque } from "./button"
import { TransitionGroup, Transition } from 'vue/dist/vue.esm-bundler.js'
import data from './request.json' assert { type: 'json' };

import Mixin from './helper'

let rawItems = [["BOUGH", "COUGH", "DOUGH", "TOUGH"],
["BUNKER", "FAIRWAY", "GREEN", "ROUGH"], 
["ENOUGH", "MERCY", "STOP", "UNCLE"],
["BAWDY", "BLUE", "COARSE", "RISQUE"]]

const game = `
<div class="game">
  <transition-group name="fade">
      <div v-for="row, index in foundConnections" class="found done" v-bind:key="index">
          <span>
            {{ row.name }}
          </span>
          <div>
            {{ row.stringified }}
          </div>
      </div>
  </transition-group>
  
  <div class="row">
    <transition-group name="board">
      <buttonesque v-for="cell in items"
                  v-bind:g="cell"
                  class="cell"
                  v-bind:name="cell"
                  v-bind:greet="greet"
                  v-bind:isactive="isactive(cell)"
                  v-bind:key="cell"
                  v-bind:hidden="isFound(cell)"> </buttonesque>
      

    </transition-group>
  <div>
</div>
`


type requestType = {
  id: Number,
  groups: {

  },
  startingGroups: String[][]
}

type GroupType = {
  level: Number,
  groups: String[]
}

export default {
  components: {
    buttonesque
  },
  setup() {

  },
  data() {
    let request: requestType = data 
    let options = []
    const shuffledItems = request.startingGroups
    let items =  ref(shuffledItems.flat())
    let foundConnections = ref([])
    return {
      request,
      foundConnections,
      options,
      items
    }
  },
  methods: {
    onLeave(el, done) {
      console.log('LOVE')
    },
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
    isFound(cell) {
      return this.foundConnections.flat().includes(cell)
    },
    checkCorrectness(options) {
      let stuff = Object.keys(this.request.groups).map((group) => {      
        return {members: this.request.groups[group].members, name: group}
      }).filter((row) => {
        return areEqual(row.members, options)
      })

      if (stuff.length > 0) {
        console.log('DONE')
        

        let board = [...this.items]

        const itemsToMove = board.filter((obj) => {return !this.options.includes(obj)})

        this.items = options.concat(itemsToMove)

        this.foundConnections.push({name: stuff[0].name, children: options.sort(), stringified: options.sort().join(', ')})
        console.log(this.foundConnections)
      } else {
        console.log('NOT DONE')
      }
    },
    // getCoords(e) {
    //   return this.getCoords(e, this.items)
    // },
    // getClass(index) {
    //   return this.getClass(index)
    // }
  },
  mixins: [Mixin],
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
