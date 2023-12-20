import { ref } from 'vue'

export const Buttonesque = {
  data() {
    return {
      hi: false
    }
  },
  props: {
    g: String,
    greet: Function,
    isactive: Boolean
  },
  template: `
    <div v-bind:class="{ selected: this.isactive }" @click="toggle">{{ g }}</div>
  `,
  methods: {
    toggle() {
      this.greet(this.g)
    }
  },
  emits: {
    someEvent(payload: {}) {
      console.log('miau')
      return true
    }
  }
}

