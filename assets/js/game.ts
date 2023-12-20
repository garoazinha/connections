
import { createApp, ref } from 'vue/dist/vue.esm-bundler.js'

import { Buttonesque as buttonesque } from "./button"
import Game from "./game"

let rawItems = [["BOUGH", "COUGH", "DOUGH", "TOUGH"],
["BUNKER", "FAIRWAY", "GREEN", "ROUGH"], 
["ENOUGH", "MERCY", "STOP", "UNCLE"],
["BAWDY", "BLUE", "COARSE", "RISQUE"]]

export default {
  components: {
    buttonesque
  },
  setup() {
    let items =  ref(rawItems)
    return {
      items
    }
  },
  data() {
    let options = []
    return {
      options
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
    }
  },
  watch: {
    options: {
      handler(newVal, oldVal) {
        if (newVal.length == 4) {
          checkCorrectness(newVal, rawItems)
          this.options = []
        }
      },
      deep: true 
    },
  },
  template: `
    <div class="game">
      <div v-for="row in items" class="row">
        <buttonesque v-for="cell in row" v-bind:g="cell" class="cell" v-bind:name="cell"  v-bind:greet="greet"  v-bind:isactive="isactive(cell)" v-bind:key="cell">
        </buttonesque>
      </div>
    </div>
  `,
}

function checkCorrectness(options, items) {

  let stuff = items.filter((row) => {
    return areEqual(row, options)
  })

  if (stuff.length > 0) {
    console.log('DONE')
    let remove = items.indexOf(stuff[0])
    rawItems.splice(remove, 1)
    
  } else {
    console.log('NOT DONE')
  }

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
