export const animation = {
  async hasBeenDoneAnimation(store) {
    store.flash = true
    setTimeout(() => {
      store.flash = false
    }, 2000)
    store.options = []
    store.loading = false
    return;
  },
  async shakingAnimation(store) {
    store.shakeables = store.options
    store.attempts.push(store.options)
    setTimeout(() => {
      store.shakeables = []
    }, 500)
  },
  async popCells(store, options) {
    store.popables = options
    setTimeout(() => {
      store.popables = []
    }, 500)
  },
  async moveBoard(store, options) {
    let board = [...store.items]
    const foundChildren = store.getFoundCells()

    const itemsToMove = board.filter((obj) => {return !(options.includes(obj) || foundChildren.includes(obj)) })

    store.items = foundChildren.concat(options).concat(itemsToMove)
  }
}