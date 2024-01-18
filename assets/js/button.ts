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
    select: Function,
    isactive: Boolean,
    hidden: Boolean,
    shake: Boolean
  },
  template: `
    <div v-bind:class="{ selected: isactive, inactive: hidden }"  @click="toggle">{{ g }}</div>
  `,
  methods: {
    toggle() {
      this.select(this.g)
    },
    
  },
  emits: {
    someEvent(payload: {}) {
      console.log('miau')
      return true
    }
  }
}

