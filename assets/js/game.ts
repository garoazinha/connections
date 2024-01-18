
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
<section style="width: 50%;">
    <transition>
      <modal v-bind:done="this.status === 'DONE'" v-show="isOpen" v-bind:open-modal="openModal"></modal>
    </transition>

    <div>
      Escolha quatro grupos de quatro
    </div>
  <div class="game">
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
                    v-bind:select="select"
                    v-bind:isactive="isactive(cell)"
                    v-bind:key="cell"
                    v-bind:hidden="isFound(cell)"
                    v-bind:shake="false"></buttonesque>
        

      </transition-group>
    </div>
  </div>
  
  <div>
    <button @click="checkSolution()" 
      v-bind:class="{ clickable: this.options.length === 4 }"
      v-bind:disabled="this.options.length < 4 || this.loading">Click</button>
      <span v-for="n in mistakesLeft">
        *
      </span>
  </div>

</section>
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
    const mistakesLeft = 4
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
      status,
      mistakesLeft
    }
  },
  computed: {
    notFound() {
      const foundGroups = this.foundConnections.map((found) => found.children)
      return this.request.groups.filter((group) => {
        return foundGroups.map(element => {
          return this.areEqual(element, group.members)
        }).filter((e) => e === true ).length === 0;

      })
    }
  },
  methods: {
    checkSolution(_e) {
      this.checkCorrectness(this.options)
    },
    select(item) {
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
        return this.areEqual(row.members, options)
      })

      if (stuff.length > 0) {
        this.loading = true
        console.log('DONE')
        this.solveConnection(stuff)
        

      } else {
        console.log('NOT DONE')
        this.mistakesLeft--
      }
      this.loading = false
      this.options = []
    },
    openModal() {
      this.isOpen = !this.isOpen
    },
    async solveConnection(given) {
      let board = [...this.items]

        const foundChildren = this.foundConnections.map((found) => { return found.children }).flat()

        const itemsToMove = board.filter((obj) => {return !(this.options.includes(obj) || foundChildren.includes(obj)) })

        this.items = foundChildren.concat(this.options).concat(itemsToMove)

        await sleep(1000)

        this.foundConnections.push({name: given, children: this.options.sort(), stringified: this.options.sort().join(', ')})
    },
    async finishGame() {
      for await (const element of this.notFound) {
        this.options = element.members
        console.log(this.options)
        await this.solveConnection(element.name)
        await sleep(1000)
      }
    }
  },
  mixins: [Mixin],
  watch: { 
    foundConnections: {
      async handler(newValue, oldValue) {
        if (newValue.length === 4) {
          if (this.mistakesLeft > 0) {
            this.status = 'DONE'
          }
          await sleep(1000)
          this.openModal()
        }
      },
      deep:true,
    },
    mistakesLeft: {
      handler(newValue, oldValue) {
        console.log(newValue)
        if (newValue === 0) {
          this.finishGame()
        }
      }
    }
  },
  template: game,
}
