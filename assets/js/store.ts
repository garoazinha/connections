import { reactive } from 'vue'

export const store = reactive({
  request: {},
  foundConnections: [],
  options: [],
  items: [],
  attempts: [],
  isOpen: true,
  loading: false,
  status: '',
  visibleInstruction: false,
  shakeables: [],
  popables: [],
  flash: false,
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
  hasBeenTried(options) {
    return this.attempts.some((a) => this.areEqual(options, a))
  },
})