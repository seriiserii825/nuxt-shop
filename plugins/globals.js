import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import VueAnimate from 'vue-animate-scroll'

Vue.use(VueAnimate)

// Vue.locale('en', enLocale);
// Vue.locale('it', itLocale);

Vue.use(Element, { locale })
