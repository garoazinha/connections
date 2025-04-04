import { ref, Transition } from 'vue'

export const Modal = {
  props: {
    status: String,
    isOpen: Boolean,
    openModal: Function
  },
  template: `

      <div class="modal" v-bind:class="{ opaque: done || failed, 'start-modal': !(done && failed) }" @click="handleToggleModal()">
        <div class="modal__content" v-bind:class="{ modal__secondary: done || failed }" @click.stop="">
          <nav class="close-button" v-show="done || failed">
            <button @click="handleToggleModal()" >X</button>
          </nav>
          <section class="modal__p">
            <div v-if="done">
              <h1 class="modal__title game__title">Parabéns</h1>
              <div style="margin: 0 auto;"> Amanhã tem mais um garotada! </div>
            </div>
            <div v-if="idle">
              <h1 class="modal__title game__title">CONNECTIONS</h1>
              <p style="margin: 0 auto;">Encontre as palavras conectadas! xD</p>
                                
              <button class="btn play-button" @click="handleToggleModal()">Jogar</button>
            </div>
            <div v-if="failed">
              <h1 class="modal__title game__title">Amanhã tem outro!</h1>


            </div>
          </section>
        </div>

      </div>

  `,
  methods: {
    handleToggleModal() {
      this.openModal()
    }
  },
  computed: {
    width() {
      if (this.done || this.failed) {
        return '50%'
      }
      return '100%'
    },
    background() {
      if (this.done || this.failed) {
        return ''
      }
      return '#8c32a1'
    },
    done() {
      return this.status === 'DONE'
    },
    failed() {

        return this.status === 'FAILED'

    },
    idle() {
      return this.status === ''
    }
  }
}

