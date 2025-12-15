// Entry point that wires together the Vue application, global styles and router.
// Keeping this file tiny makes it obvious that most behavior lives in components.
import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import router from "./router";

// Mount the root application and enable client-side routing between the views.
const app = createApp(App);
app.use(router);

app.mount("#app");
