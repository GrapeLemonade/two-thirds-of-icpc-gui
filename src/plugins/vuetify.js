import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework'
import colors from 'vuetify/lib/util/colors'

const vuetify = new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.green,
                secondary: colors.lime.darken2,
                accent: colors.teal.accent3,
                error: colors.red.accent3,
            },
            dark: {
                primary: colors.green,
                secondary: colors.lime.darken2,
                accent: colors.teal.accent3,
                error: colors.red.accent3,
            },
        },
    },
})

Vue.use(Vuetify);

export default vuetify;
