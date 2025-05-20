import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { QuillEditor } from '@vueup/vue-quill'
import VueVirtualScroller from 'vue-virtual-scroller'
// import ElementPlus from 'element-plus';
// import ElementTiptapPlugin from 'element-tiptap';

// import PrimeVue from 'primevue/config'
// import Button from 'primevue/button'
// import Dropdown from 'primevue/dropdown'
// import Toolbar from 'primevue/toolbar'

// import 'primevue/resources/themes/lara-light-indigo/theme.css'
// import 'primevue/resources/primevue.min.css'
// import 'primeicons/primeicons.css'

// import 'element-tiptap/lib/style.css';
import 'github-markdown-css/github-markdown.css'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
// import VirtualList from 'vue-virtual-scroll-list'
const app = createApp(App)

// app.use(ElementPlus);
// app.use(ElementTiptapPlugin);

// app.use(PrimeVue)
// app.component('Button', Button)
// app.component('Dropdown', Dropdown)
// app.component('Toolbar', Toolbar)

app.component('QuillEditor', QuillEditor)
app.use(VueVirtualScroller)
// app.use(VirtualList)


app.mount('#app')
