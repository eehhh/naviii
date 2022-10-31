import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/css/hover.css";
import { basicSetup } from "codemirror";
import { json } from "@codemirror/lang-json";
import VueCodemirror from "vue-codemirror";

const app = createApp(App);

app.use(VueCodemirror, {
  extensions: [basicSetup, json()],
});

app.mount("#app");
