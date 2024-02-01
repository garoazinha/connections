import { ref, Transition } from 'vue'

export const Modal = {
  props: {
    status: String,
    isOpen: Boolean,
    openModal: Function
  },
  template: `

      <div class="modal start-modal" v-bind:style="{ backgroundColor: background }" v-bind:class="{ opaque: done || failed }" @click="handleToggleModal()">
        <div class="modal__content" v-bind:class="{ leave: done || failed }" @click.stop="">
          <nav class="close-button" v-show="done || failed">
            <button @click="handleToggleModal()" >X</button>
          </nav>
          <section class="modal__p">
            <div v-if="done">
              <h1 class="modal__title game__title">Parabéns</h1>
              <div style="margin: 0 auto;"> Amanhã tem mais um garotada! </div>
            </div>
            <div v-if="idle">
              <h1 class="modal__title game__title">Connections</h1>
              Olá você sabe jogar connections? É um joguinho em que você tem que acertar as palavras que estão conectadas!
              É super divertido
                                
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

