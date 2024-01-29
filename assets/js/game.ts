
import { createApp, ref } from 'vue/dist/vue.esm-bundler.js'

import { Buttonesque as buttonesque } from "./button"
import { Modal as modal } from "./modal"
import { Instructions as instruction } from "./instructions"
import { TransitionGroup, Transition } from 'vue/dist/vue.esm-bundler.js'
import data from './request.json' assert { type: 'json' };


import Mixin from './helper'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const game = `
<section class="container">
    <div class="header">
      <div></div>
      <div>CONNECTIONS</div>
      <div><button @click="handleToggleInstruction()">?</button></div>
    
    </div>
    <transition>
      <modal v-bind:status="this.status" v-show="isOpen" v-bind:open-modal="toggleModal"></modal>
    </transition>
    <instruction v-show="visibleInstruction" v-bind:toggle-instruction="handleToggleInstruction"> </instruction>
  <section v-show="this.status !== ''">
    <div class="title">
      Escolha quatro grupos de quatro
    </div>
    <div class="game">
      <div class="done" >
        <transition-group name="fade" type="animation">
          <div v-for="(row, index) in foundConnections" v-bind:key="row.name" class="card" v-bind:style="{ backgroundColor: getColor(row.level) }">
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
                      v-bind:wrong="iswrong(cell)"
                      v-bind:right="isright(cell)"></buttonesque>
          

        </transition-group>
      </div>
    </div>
    
    <div class="button-group" v-show="status !== 'DONE' && status !== 'FAILED'">
      <button @click="checkSolution()" 
        v-bind:class="{ clickable: this.options.length === 4 }"
        v-bind:disabled="this.options.length < 4 || this.loading">Click</button>
        <div>
          <span v-for="n in mistakesLeft">
            *
          </span>
        </div>
    </div>

    <div class="button-group" v-show="status === 'DONE' || status === 'FAILED'">
      <button @click="toggleModal">Ver resultados</button>
    </div>
  </section>

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
    modal,
    instruction
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
    const visibleInstruction = false
    const shakeables = []
    const popables = []
    return {
      request,
      foundConnections,
      options,
      items,
      attempts,
      isOpen,
      loading,
      status,
      mistakesLeft,
      visibleInstruction,
      shakeables,
      popables
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
    getColor(level) {
      const colorMap = {
        0: '#f9df6d',
        1: '#a0c35a',
        2: '#b0c4ef',
        3: '#ba81c5'
      }

      return colorMap[level]
    },
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
    iswrong(item) {        
      return this.shakeables.includes(item)
    },
    isFound(cell) {
      return this.foundConnections.flat().includes(cell)
    },
    isright(cell) {
      return this.popables.includes(cell)
    },
    async checkCorrectness(options) {
      let stuff = this.request.groups.map((group) => {      
        return {members: group.members, name: group.name, level: group.level}
      }).filter((row) => {
        return this.areEqual(row.members, options)
      })

      if (stuff.length > 0) {
        this.loading = true
        console.log('DONE')
        await this.solveConnection(stuff[0].name, options, stuff[0].level)

      } else {
        console.log('NOT DONE')
        this.shakeables = this.options
        this.mistakesLeft--
        await sleep(500)
        this.shakeables = []
      }
      this.loading = false
      this.options = []
    },
    toggleModal() {
      if (this.status === '') {
        this.status = 'STARTED'
      }
      this.isOpen = !this.isOpen
    },
    async solveConnection(name, options, level) {

      console.log(level, name, options)
      this.popables = options
      await sleep(500)
      this.popables = []

      let board = [...this.items]

      const foundChildren = this.foundConnections.map((found) => { return found.children }).flat()

      const itemsToMove = board.filter((obj) => {return !(options.includes(obj) || foundChildren.includes(obj)) })

      this.items = foundChildren.concat(options).concat(itemsToMove)

      await sleep(1000)

      this.foundConnections.push({name: name, children: options.sort(), stringified: options.sort().join(', '), level: level})
    },
    async finishGame() {
      console.log(this.notFound)
      this.loading = true
      for await (const element of this.notFound) {
        await this.solveConnection(element.name, element.members, element.level)
        await sleep(1000)
      }
      this.status = 'FAILED'
      this.loading = false
    },
    handleToggleInstruction() {
      this.visibleInstruction = !this.visibleInstruction
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
          this.toggleModal()
        }
      },
      deep:true,
    },
    mistakesLeft: {
      handler(newValue, oldValue) {
        if (newValue === 0) {
          this.finishGame()
        }
      }
    }
  },
  template: game,
}
