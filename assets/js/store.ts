import { reactive } from 'vue'
import helper from './helper'
const today = new Date(Date.now())
const stringifiedToday = `${today.getDate()}_${today.getMonth() + 1}_${today.getFullYear()}`

const storageKey = `status_${stringifiedToday}`
export type foundConnectionType = {
  name: string, level: Number, children: string[], stringified: string
}

export type storedStateType = {
  overallState: { plays: {}[], foundConnections: foundConnectionType[], status?: string},
  getFromBrowser: Function,
  items: string[],
  foundConnections: foundConnectionType[],
  request: {
    id: number,
    groups: {title: string, members: string[], level: number}[]|[],
    startingGroups: string[]
  },
  attempts: string[][],
  options: string[],
  flash: boolean,
  status: string, 
  isOpen: boolean,
  loading: boolean, 
  visibleInstruction: boolean,
  shakeables: string[],
  popables: string[],
  fastPop: string[],
  storeInBrowser: Function,
  select: Function,
  deselect: Function,
  isactive: Function,
  iswrong: Function,
  isFound: Function,
  isright: Function,
  hasBeenTried: Function,
  findSolvableGroup: Function,
  getFoundCells: Function,
  clearOptions: Function
}

function getFromBrowser() {
  const rawState = localStorage.getItem(storageKey)
  if (typeof rawState === "string") {
  return JSON.parse(rawState) }
  else {
    return {plays: [], foundConnections: []}
  }
}

export const store : storedStateType = reactive({
  request: {id: 0, groups: [], startingGroups:[]},
  overallState: getFromBrowser(),
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
  fastPop: [],
  storeInBrowser(data) {
    return localStorage.setItem(storageKey,JSON.stringify(this.overallState))
  },
  getFromBrowser() {
    const rawState = localStorage.getItem(storageKey)
    if (typeof rawState === "string") {
    return JSON.parse(rawState) }
    else {
      return {plays: [], foundConnections: []}
    }
  },
  async select(item) {
    if (this.options.includes(item)) {
      this.deselect(item)
    } else {
      if (this.options.length < 4) {
        this.options.push(item) 
        this.fastPop.push(item)
        setTimeout(() => {
          this.fastPop = this.fastPop.filter((i) => i !== item)
        }, 100)
        
      }
    }
  },
  async deselect(item) {
    this.options.splice(this.options.indexOf(item), 1)
    this.fastPop.push(item)
    setTimeout(() => {
      this.fastPop = this.fastPop.filter((i) => i !== item)
    }, 100)

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
  findSolvableGroup(options) {
    const solvableGroup = this.request.groups.map((group) => {      
      return {members: group.members, name: group.title, level: group.level}
    }).filter((row) => {
      return helper.methods.areEqual(row.members, options )
    }).reduce((acc, currentValue) => {
      acc = currentValue
      return acc
    }, null)
    return solvableGroup
  },
  getFoundCells() {
    return this.foundConnections.map((found) => found.children).flat()
  },
  clearOptions() {
    this.options = []
  }
})