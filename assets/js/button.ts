import { ref } from 'vue'
import { Transition } from 'vue'

export const Buttonesque = {
  data() {
    return {
      hi: false
    }
  },
  props: {
    g: String,
    greet: Function,
    isactive: Boolean,
    hidden: Boolean
  },
  template: `
    <div v-bind:class="{ selected: isactive, pick: pickThis, inactive: hidden }"  @click="toggle">{{ g }}</div>
  `,
  methods: {
    toggle() {
      this.greet(this.g)
    },
    putStyle() {
      ["BOUGH", "COUGH", "DOUGH", "TOUGH"].includes(this.g)
    }
  },
  computed: {
    pickThis() {
      return ["BUZZ",
      "CALL",
      "DIAL",
      "RING"].includes(this.g)
    }
  },
  emits: {
    someEvent(payload: {}) {
      console.log('miau')
      return true
    }
  }
}

