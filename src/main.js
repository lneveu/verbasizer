import Vue from 'vue';
import VueI18n from 'vue-i18n';
import App from './App.vue';
import './assets/styles/index.css';
import './registerServiceWorker'

Vue.config.productionTip = false;
Vue.use(VueI18n);

function getBrowserLocale() {
  const navigatorLocale =
    navigator.languages !== undefined
      ? navigator.languages[0]
      : navigator.language;

  if (!navigatorLocale) {
    return undefined;
  }
  return navigatorLocale.trim().split(/-|_/)[0];
}

const i18n = new VueI18n({
  locale: getBrowserLocale() || 'en',
  messages: {
    en: {
      inputAreaTextExample1:
        'Once again... welcome to my house. Come freely. Go safely; and leave something of the happiness you bring.',
      inputAreaTextExample2:
        'Always eyes watching you and the voice enveloping you. Asleep or awake, indoors or out of doors, in the bath or bed no escape.',
      addInputBtn: 'Add sentence',
      generateBtn: 'Generate',
      inputWordLabel: 'Number of words per sentence:',
      inputAreaStatusBtnEnable: 'Enable',
      inputAreaStatusBtnDisable: 'Disable',
      inputAreaRemoveBtn: 'Remove',
      installPWABtn: 'Install the app'
    },
    fr: {
      inputAreaTextExample1:
        'Once again... welcome to my house. Come freely. Go safely; and leave something of the happiness you bring.',
      inputAreaTextExample2:
        'Always eyes watching you and the voice enveloping you. Asleep or awake, indoors or out of doors, in the bath or bed no escape.',
      addInputBtn: 'Ajouter une phrase',
      generateBtn: 'Générer',
      inputWordLabel: 'Nombre de mots par phrase :',
      inputAreaStatusBtnEnable: 'Activer',
      inputAreaStatusBtnDisable: 'Désactiver',
      inputAreaRemoveBtn: 'Supprimer',
      installPWABtn: 'Installer l\'application'
    },
  },
});

new Vue({
  render: (h) => h(App),
  i18n,
}).$mount('#app');
