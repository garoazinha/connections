import { createApp } from 'vue/dist/vue.esm-bundler.js'


export function Hatred()  {
  const app = createApp({
    data() {
      return {
        count: 0
      }
    }
  })

  app.mount("#app")
}

