<template>
    <div class="main-container bg-white d-flex flex-column">
        <div class="header w-100 d-flex justify-content-center align-items-end text-bold pb-2">Contacts</div>
        <div class="list-container">
            <!-- Favorites -->
            <div>
                <div
                    @click="toggleFavorites = !toggleFavorites"
                    v-b-toggle.favorite-contacs
                    class="section-header w-100 d-flex justify-content-between py-1 px-2">
                    <span>Favorite Contacts</span>
                    <font-awesome-icon
                        class="animate mt-1"
                        :class="{'rotate': toggleFavorites}"
                        :icon="'chevron-down'" />
                </div>
                <b-collapse
                    visible
                    id="favorite-contacs">
                    <div
                        :key="item.id"
                        v-for="(item, i) in favorites">
                        <Contact :lastOne="(i + 1) == favorites.length" :contactInfo="item" />
                    </div>
                </b-collapse>
            </div>
            <!-- Other -->
            <div>
                <div
                    @click="toggleOther = !toggleOther"
                    v-b-toggle.other-contacs
                    class="section-header w-100 d-flex justify-content-between py-1 px-2">
                    <span>Other Contacts</span>
                    <font-awesome-icon
                        class="animate mt-1"
                        :class="{'rotate': toggleOther}"
                        :icon="'chevron-down'" />
                </div>
                <b-collapse
                    visible
                    id="other-contacs">
                    <div
                        :key="item.id"
                        v-for="(item, i) in others">
                        <Contact :lastOne="(i + 1) == favorites.length" :contactInfo="item" />
                    </div>
                </b-collapse>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Contact from './Contact'
import store from '@/Vuex'
export default {
    name: 'IndexContacts',
    store,
    data () {
        return {
            toggleFavorites: false,
            toggleOther: false
        }
    },
    computed: {
        allContacts () {
            return this.$store.state.allContacts
        },
        favorites () {
            return this.$store.state.favorites
        },
        others () {
            return this.$store.state.others
        }
    },
    components: {
        Contact
    },
    mounted () {
        this.loadData()
    },
    methods: {
        loadData () {
            var url = 'v3/contacts.json'
            /*
                API fetched:
                fetch(url)
                    .then((response) => {
                        this.contacs = response
                    })
            */

           // I prefer axios
            axios.get(url)
                .then((response) => {
                    this.$store.commit('saveContacts', response.data)
                    this.filterContacts(this.allContacts)
                })
        },
        filterContacts (data) {
            let favorites = []
            let others = []
            data.forEach(item => {
                if (item.isFavorite) favorites.push(item) //Get favorites
                else others.push(item) // Get Others
            })
            this.sortArray(favorites)
            this.sortArray(others)
            this.$store.commit('saveFavs', favorites)
            this.$store.commit('saveOthers', others)
        },
        sortArray (array) {
            array.sort((a, b) => {
                if(a.name < b.name) { return -1; }
                if(a.name > b.name) { return 1; }
                return 0;
            })
        }
    }
}
</script>

<style lang="scss" scoped>
$main-color: lightgrey;
$header-height: 60px;

.header {
    user-select: none;
    min-height: $header-height;
    background-color: $main-color;
}
.section-header {
    user-select: none;
    min-width: 15px;
    font-size: 12px;
    font-weight: bold;
    background-color: darken($main-color, 5);
}
.list-container {
    overflow-y: auto;
    max-height: calc(100vh - #{$header-height})
}
</style>
