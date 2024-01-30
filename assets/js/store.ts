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
  flash: false
})