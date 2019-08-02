<template>
    <div class="main-container bg-white d-flex flex-column">
        <!-- <router-link tag="div" to="/index" class="header"> Volver</router-link> -->
        <div class="header w-100 d-flex justify-content-between align-items-end text-bold text-primary pb-2 px-2">
            <router-link
                to="/index"
                tag="div"
                class="d-flex pointer align-items-end">
                <font-awesome-icon
                    class="rotate mb-1 mr-1"
                    icon="chevron-down" />
                <span>Contacts</span>
            </router-link>
            <div class="fav-icon">
                <img
                    @click="$store.commit('Unfav', selectedConctact)"
                    v-if="selectedConctact && selectedConctact.isFavorite"
                    class="favStarIcon"
                    :src="favTrue"
                    alt="">
                <img
                    @click="$store.commit('Fav', selectedConctact)"
                    v-else
                    class="favStarIcon"
                    :src="favFalse"
                    alt="">
            </div>
        </div>
        <div class="body-container">
            <div class="contact-info w-100 flex-column d-flex align-items-center justify-content-center py-4">
                <img
                    v-if="selectedConctact && selectedConctact.largeImageURL"
                    class="profile-picture"
                    :src="selectedConctact && selectedConctact.largeImageURL  ? selectedConctact.largeImageURL : defaultPicture"
                    alt="profile-picture">
                <div
                    v-if="selectedConctact && selectedConctact.name"
                    class="contact-name mt-3">
                    {{ selectedConctact ? selectedConctact.name : '' }}
                </div>
                <div
                    v-if="selectedConctact && selectedConctact.companyName"
                    class="text-ligther description-text mb-4"> {{ selectedConctact ? selectedConctact.companyName : '' }}
                </div>
                <div class="line" />
                <div
                    v-for="(phone, i) in phoneList"
                    :key="i"
                    class="info-section w-100 py-3 px-4 d-flex justify-content-between flex-wrap no-gutters">
                    <span class="w-100 title">Phone:</span>
                    <div class="col text-bold"> {{ phone.data }} </div>
                    <div class="col site d-flex justify-content-end"> {{ phone.name }} </div>
                    <div class="line w-100 mt-4" />
                </div>
                <div
                    v-if="selectedConctact && selectedConctact.birthdate"
                    class="info-section w-100 py-3 px-4 d-flex justify-content-between flex-wrap no-gutters">
                    <span class="w-100 title">Birthdate:</span>
                    <div class="col text-bold">
                            {{ dateFormat }}
                    </div>
                    <div class="line w-100 mt-4" />
                </div>
                <div
                    v-if="selectedConctact && selectedConctact.emailAddress"
                    class="info-section w-100 py-3 px-4 d-flex justify-content-between flex-wrap no-gutters">
                    <span class="w-100 title">Email:</span>
                    <div class="col text-bold">
                        {{ selectedConctact ? selectedConctact.emailAddress : '' }}
                    </div>
                    <div class="line w-100 mt-4" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import defaultPicture from '../../public/icons/user_largex1.png'
import favTrue from '../../public/icons/fav_truex1.png'
import favFalse from '../../public/icons/fav_falsex1.png'
import store from '@/Vuex'
export default {
    name: 'ContactInfo',
    store,
    computed: {
        selectedConctact () {
            return this.$store.state.actualContact
        },
        dateFormat () {
            if (!this.selectedConctact) return ''
            let localDate = new Date(this.selectedConctact.birthdate)
            var month = this.monthList[localDate.getMonth()]
            var day = localDate.getDate()
            return month + ' ' + day + ', ' + localDate.getFullYear()
        }
    },
    data () {
        return {
            monthList: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            defaultPicture: defaultPicture,
            favTrue: favTrue,
            favFalse: favFalse,
            phoneList: []
        }
    },
    mounted () {
        let id = this.$route.params.id
        this.$store.commit('selectContact', id)
        if (this.$store.state.allContacts.length === 0) this.$router.push('/index') // Check if vuex is empty
    },
    watch: {
        selectedConctact () {
            this.formatPhones()
        }
    },
    methods: {
        formatPhones () {
            if (!this.selectedConctact && !this.selectedConctact.phone) return
            let phones = []
            for (var item in this.selectedConctact.phone) {
                phones.push({
                    name: item,
                    data: this.selectedConctact.phone[item]
                })
            }
            this.phoneList = phones
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
.body-container {
    min-height: calc(100vh - #{$header-height});
    max-height: calc(100vh - #{$header-height});
    overflow-y: auto;
}
.profile-picture {
    max-height: 150px;
    max-width: 150px;
}
.rotate {
    transform: rotate(90deg);
}
.description-text {
    color: lightgrey;
    font-size: 15px;
}
.line {
    height: 1px;
    max-height: 1px;
    width: 90%;
    background: rgb(219, 219, 219);
}
.info-section {
    .title {
        font-weight: 300;
        color: lightgrey;
        font-size: 12px;
        text-transform: uppercase;
    }
    .site {
        font-weight: 300;
        text-transform: capitalize;
        color: lightgrey;
        font-size: 12px;
    }
}
</style>
