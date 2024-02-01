import { ref } from 'vue'
import { Transition } from 'vue'

import { store } from '../store'

export const Buttonesque = {
  data() {
    return { store };
  },
  props: {
    g: String
  },
  template: `
    <div v-bind:class="{ selected: store.isactive(g),
                         inactive: store.isFound(g),
                         shake: store.iswrong(g),
                         pop: store.isright(g),
                         fastpop: store.fastPop.includes(g) }" @click="toggle">{{ g }}</div>
  `,
  methods: {
    toggle() {
      store.select(this.g)
    },
  }
}

