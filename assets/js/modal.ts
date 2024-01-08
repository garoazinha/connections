import { ref, Transition } from 'vue'

export const Modal = {
  props: {
    done: Boolean,
    isOpen: Boolean,
    openModal: Function
  },
  template: `

      <div class="modal">
        <button @click="handleOpenModal()">cliiick</button>
        <span v-if="done">Você conseguiiiiu parabéns mona</span>
      </div>

  `,
  methods: {
    handleOpenModal() {
      this.openModal()
    }
  }
}

