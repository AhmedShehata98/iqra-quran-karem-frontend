import "./assets/main.css";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.min.css";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { ar, en } from "vuetify/locale";

// Your own translation file
import enFile from "@/i18n/vuetify/en";

const vuetify = createVuetify({
  components,
  directives,
  locale: {
    locale: "ar",
    fallback: "enFile",
    messages: { ar, en },
  },
});
const app = createApp(App);

app.use(router);
app.use(VueQueryPlugin);
app.use(createPinia());
app.use(vuetify);

app.mount("#app");
