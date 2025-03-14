import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { QuillEditor } from '@vueup/vue-quill'
import VueVirtualScroller from 'vue-virtual-scroller'


import '@vueup/vue-quill/dist/vue-quill.snow.css'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
// import VirtualList from 'vue-virtual-scroll-list'
const app = createApp(App)

app.component('QuillEditor', QuillEditor)
app.use(VueVirtualScroller)
// app.use(VirtualList)


app.mount('#app')
