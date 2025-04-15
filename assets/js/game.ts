
import { createApp, ref } from 'vue/dist/vue.esm-bundler.js'

import { Buttonesque as buttonesque } from "./components/button"
import { Modal as modal } from "./components/modal"
import { Instructions as instruction } from "./components/instructions"
import { TransitionGroup, Transition } from 'vue/dist/vue.esm-bundler.js'
import { store } from './store'

import Mixin from './helper'

function sleep(ms : number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const game = `
<section class="container">
    <div class="header">
      <div></div>
      <div class="game__title">CONNECTIONS</div>
      <div><button @click="handleToggleInstruction()" style="font-weight: bold;">?</button></div>
    
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
      <transition name="fadeintou">
        <div class="flash" v-show="flash"><p>Esse já foi!</p></div>
      </transition>
      <div class="done" >
        <transition-group name="fade" type="animation">
          <div v-for="(row, index) in foundConnections" v-bind:key="row.name" class="card" v-bind:style="{ backgroundColor: getColor(row.level) }">
            <span style="font-weight: bold;">
              {{ row.name }}
            </span>
            <span>
              {{ row.stringified }}
            </span>
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
        class="btn clickable"
        v-bind:disabled="this.options.length < 4 || this.loading">Enviar</button>
        <div class="attempts">
          <span style="margin-right: 10px;">Erros sobrando:   </span>
          <span v-for="n in mistakesLeft">
            *
          </span>
        </div>
    </div>

    <div class="button-group" v-show="status === 'DONE' || status === 'FAILED'">
      <button @click="toggleModal" class="btn result-button">Ver resultados</button>
    </div>
  </section>

</section>
`


export default {
  components: {
    buttonesque,
    modal,
    instruction
  },
  setup() {

  },
  data() {
    return store;
  },
  mounted() {
    const finalStatus : { plays: [][], foundConnections: any, status?: String} = store.getFromBrowser()
    this.fetchData().then((result: typeof store.request) => {
      if (finalStatus.status) {
        store.items = store.request.groups.map((el) => el.members).flat()
        const plused = finalStatus.foundConnections
        const requestGroups = store.request.groups.map((el) => {
          return {
            name: el.title,
            children: el.members,
            stringified: el.members.sort().join(', '),
            level: el.level
          }
        })
        if (plused.length !== 0 ) {

          store.foundConnections = plused
        } else {
          store.foundConnections = requestGroups
        }


      } else if (!finalStatus.foundConnections) {
        return

      } else if (finalStatus.foundConnections.length !== 0 && !finalStatus.status) {
          const flattenedConnections : string[] = finalStatus.foundConnections.map(el => el.children).flat()
          let rest = this.items.filter((item: string) => {
            return !flattenedConnections.includes(item)
          }) 
          store.foundConnections = finalStatus.foundConnections
          store.items = flattenedConnections.concat(rest)
   
        }
    })

  },
  computed: {
    notFound() {
      const foundGroups = store.foundConnections.map((found) => found.children)
      return store.request.groups.filter((group) => {
        return foundGroups.map(element => {
          return this.areEqual(element, group.members)
        }).filter((e) => e === true ).length === 0;

      })
    },
    mistakesLeft() {
      return 4 - store.attempts.length
    }
  },
  methods: {
    async fetchData() {
      const response = await fetch("/api/game");
      store.request = await response.json();
      store.items = this.request.startingGroups.flat();
    },
    getColor(level: number) {
      const colorMap = {
        0: 'yellow',
        1: 'green',
        2: 'blue',
        3: 'purple'
      }

      return `var(--${colorMap[level]})`
    },
    checkSolution(_e) {
      this.checkCorrectness(this.options)
    },
    async checkCorrectness(options : string[]) {
      this.loading = true
      if (this.hasBeenTried(options)) {
        this.flash = true
        setTimeout(() => {
          this.flash = false
        }, 2000)
        store.options = []
        this.loading = false
        return;
      }

      const stuff : {level: number, name: string, members: string[]}|null= store.request.groups.map((group) => {      
        return {members: group.members, name: group.title, level: group.level}
      }).filter((row) => {
        return this.areEqual(row.members, options)
      }).reduce((acc: {level: number, name: string, members: string[]}|null, currentValue) => {
        acc = currentValue
        return acc
      }, null)

      if (stuff) {
        await this.solveConnection(stuff.name, options, stuff.level)
        this.overallState.plays.push({items: store.options})

      } else {
        this.shakeables = store.options
        store.attempts.push(store.options)

        this.overallState.plays.push({items: this.options})

        await sleep(500)
        this.shakeables = []
        
      }
      this.loading = false
      store.options = []
    },
    toggleModal() {
      if (this.status === '') {
        this.status = 'STARTED'
      }
      this.isOpen = !this.isOpen
    },
    async solveConnection(name: string, options: string[], level: number) {
      this.popables = options
      await sleep(500)
      this.popables = []

      let board = [...store.items]

      const foundChildren = store.foundConnections.map((found) => { return found.children }).flat()

      const itemsToMove = board.filter((obj) => {return !(options.includes(obj) || foundChildren.includes(obj)) })

      this.items = foundChildren.concat(options).concat(itemsToMove)

      await sleep(1000)

      this.foundConnections.push({name: name, children: options.sort(), stringified: options.sort().join(', '), level: level})
      this.overallState.foundConnections = this.foundConnections
    },
    async finishGame() {
      await sleep(500)
      this.options = []
      this.loading = true
      for await (const element of this.notFound) {
        await this.solveConnection(element.title, element.members, element.level)
        await sleep(1000)
      }
      this.status = 'FAILED'
      this.overallState.status = 'FAILED'
      this.loading = false
    },
    handleToggleInstruction() {
      this.visibleInstruction = !this.visibleInstruction
    }
  },
  mixins: [Mixin],
  watch: { 
    overallState: {
      handler(newValue : typeof store.overallState, oldValue : typeof store.overallState) {
        console.log('got here')
        this.storeInBrowser(newValue)
      },
      deep: true
    }
    ,
    foundConnections: {
      async handler(newValue: any[], oldValue: any[]) {
        if (newValue.length === 4) {
          await sleep(1000)
          if (this.mistakesLeft > 0) {
            this.overallState.status = 'DONE'
            this.status = 'DONE'
          }
          this.toggleModal()
        }
      },
      deep:true,
    },
    mistakesLeft: {
      handler(newValue:number, oldValue:number) {
        if (newValue === 0) {
          this.finishGame()
        }
      }
    }
  },
  template: game,
}
