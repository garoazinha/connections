import { ref, Transition } from 'vue'

export const Instructions = {
  props: {
    toggleInstruction: Function
  },
  template: `

      <div class="modal instruction-modal">
          <nav class="close-button">
            <button @click="toggleInstruction()">X</button>
          </nav>
        <section class="modal-p">
          <h1 class="modal-title">Como jogar Connections</h1>

          <p>
            Encontre o grupo de quatro palavras conectadas! <br/>
            Ao selecionar quatro palavras pressione enviar para checar se essas quatro palavras estão relacionadas por algum fio. <br/>
            Você pode errar até 4 vezes.
          </p>

          <h2 class="modal-title">Exemplo:</h2>
            Conexão: Gatos grandes <br/>
            Palavras: ONÇA, TIGRE, LEÃO, LEOPARDO

        </section> 
      </div>

  `,
  methods: {

  }
}

