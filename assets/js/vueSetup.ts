
import { createApp, ref } from 'vue/dist/vue.esm-bundler.js'

import { Buttonesque as buttonesque } from "./button"

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
      let rereitems = rawItems
      return {
        options,
        rereitems
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
        // Do what you want with the selected objects:
        },
        deep: true 
      },
    },
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


