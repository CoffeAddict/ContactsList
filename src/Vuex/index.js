import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        actualContact: {},
        allContacts: [],
        favorites: [],
        others: []
    },
    mutations: {
        selectContact (state, id) {
            var selected = state.allContacts.find(item => {
                return item.id === id
            })
            state.actualContact = selected
        },
        saveContacts (state, data) {
            state.allContacts = data
        },
        saveFavs (state, data) {
            state.favorites = data
        },
        saveOthers (state, data) {
            state.others = data
        }
    },
  })