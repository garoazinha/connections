import { ref, Transition } from 'vue'

export const Modal = {
  props: {
    status: String,
    isOpen: Boolean,
    openModal: Function
  },
  template: `

      <div class="modal start-modal" v-bind:class="{ leave: done || failed}">
        <nav class="close-button">
          <button @click="handleToggleModal()" >X</button>
        </nav>
        <section class="modal-p">
          <div v-if="done">
            Você conseguiiiiu parabéns mona
          </div>
          <div v-if="idle">
            <h1 class="modal-title">Connections</h1>
            Olá você sabe jogar connections? É um joguinho em que você tem que acertar as palavras que estão conectadas!
            É super divertido
                              
            <button class="play-button" @click="handleToggleModal()">Jogar</button>
          </div>
          <div v-if="failed">
            Amigo me desculpa, não foi dessa vez... Já tentou suicídio?
          </div>
        </section>

      </div>

  `,
  methods: {
    handleToggleModal() {
      this.openModal()
    }
  },
  computed: {
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

