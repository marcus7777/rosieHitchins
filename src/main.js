import { createWebHistory, createRouter } from "vue-router";
import { createApp } from "vue/dist/vue.esm-bundler.js"
import App from "./App"
import './registerServiceWorker'

var requestURL = "https://rosiehitchins-384e1.firebaseio.com/pages.json"
var request = new XMLHttpRequest()
request.open('GET', requestURL)
request.responseType = 'json'
request.send()
request.onload = function() {
  let data = request.response
  let app = createApp(App)

  const router = createRouter({
    history: createWebHistory(),
    routes: [ ...Object.keys(data).map(d => {
      const p = data[d]
      const html = p.body.split("<a href=\"/").map((h,i) => {
        if (!i) return h // not the first part
        return h.replace("</a>","</router-link>").replace(`target="_blank"`, '')
      }).join("<router-link to=\"/")
      const name = p.menu.replace(" ","-").toLowerCase()
      return {
        path: "/" + name,
        name: p.menu,
        component: {
          template: `<div>${html}</div>`
        },
        meta:{
          images: p.images,
        },
        menu: p.menu,
        weight: +p.weight,
      }
    }), {path: "", redirect: '/home', menu: ""}]
  })
 
  app.use(router).mount('#app')
}
