import App from "./App.vue";
import { createApp } from "vue";
import { basicSetup } from "codemirror";
import { json } from "@codemirror/lang-json";
import VueCodemirror from "vue-codemirror";
import "@/assets/css/hover.css";

const app = createApp(App);

app.use(VueCodemirror, {
  extensions: [basicSetup, json()],
});

app.mount("#app");
