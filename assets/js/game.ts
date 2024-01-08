
import { createApp, ref } from 'vue/dist/vue.esm-bundler.js'

import { Buttonesque as buttonesque } from "./button"
import { Modal as modal } from "./modal"
import { TransitionGroup, Transition } from 'vue/dist/vue.esm-bundler.js'
import data from './request.json' assert { type: 'json' };

import Mixin from './helper'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const game = `
<div class="game">
    <transition>
      <modal v-bind:done="this.status === 'DONE'" v-show="isOpen" v-bind:open-modal="openModal"></modal>
    </transition>
    <div class="done" >
      <transition-group name="fade" type="animation">
        <div v-for="(row, index) in foundConnections" v-bind:key="row.name" class="card">
            <div class="found">
              <span>
                {{ row.name }}
              </span>
              <div>
                {{ row.stringified }}
              </div>
            </div>
          
        </div>
      </transition-group>
    </div>
  
  
  <div class="row">
    <transition-group name="board">
      <buttonesque v-for="cell in items"
                  v-bind:g="cell"
                  class="cell"
                  v-bind:name="cell"
                  v-bind:greet="greet"
                  v-bind:isactive="isactive(cell)"
                  v-bind:key="cell"
                  v-bind:hidden="isFound(cell)"
                  v-bind:shake="false"> </buttonesque>
      

    </transition-group>
    </div>
  <div>

  <button @click="checkSolution()" v-bind:class="{ clickable: this.options.length === 4 }" v-bind:disabled="this.options.length < 4 || this.loading">Click</button>
  <span v-for="a,i in attempts">
    *
  </span>
  </div>
</div>
`


type requestType = {
  id: Number,
  groups: {

  },
  startingGroups: String[][]
}

export default {
  components: {
    buttonesque,
    modal
  },
  setup() {

  },
  data() {
    const request: requestType = data 
    const options = []
    const shuffledItems = request.startingGroups
    const items =  shuffledItems.flat()
    const foundConnections = []
    const attempts = []
    const isOpen = true
    const loading = false
    const status = ''
    return {
      request,
      foundConnections,
      options,
      items,
      attempts,
      isOpen,
      loading,
      status
    }
  },
  methods: {
    checkSolution(_e) {
      this.checkCorrectness(this.options)
    },
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
    async checkCorrectness(options) {
      let stuff = this.request.groups.map((group) => {      
        return {members: group.members, name: group.name}
      }).filter((row) => {
        return areEqual(row.members, options)
      })

      if (stuff.length > 0) {
        this.loading = true
        console.log('DONE')
        
        let board = [...this.items]

        const foundChildren = this.foundConnections.map((found) => { return found.children }).flat()

        const itemsToMove = board.filter((obj) => {return !(this.options.includes(obj) || foundChildren.includes(obj)) })

        this.items = foundChildren.concat(options).concat(itemsToMove)

        await sleep(1000)

        this.foundConnections.push({name: stuff[0].name, children: options.sort(), stringified: options.sort().join(', ')})

      } else {
        console.log('NOT DONE')
      }
      this.loading = false
      this.options = []
    },
    openModal() {
      this.isOpen = !this.isOpen
    },
  },
  mixins: [Mixin],
  watch: { 
    foundConnections: {
      async handler(oldValue, newValue) {
        console.log(newValue)
        if (newValue.length == 4) {
          this.status = 'DONE'
          await sleep(1000)
          this.openModal()
        }
      },
      deep:true,
    }
  },
  template: game,
}

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
