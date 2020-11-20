import Vue from "vue";
import VueI18n from "vue-i18n";
import lang from "./lang";
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: sessionStorage.getItem("LANGUAGE") || "zh",
  messages: lang
});

export default i18n;
