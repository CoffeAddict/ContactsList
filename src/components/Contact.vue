<template>
    <div class="d-flex align-items-center flex-column">
        <router-link :to="'contact-info/' + contactInfo.id" tag="div" class="pointer section-item w-100 d-flex py-3">
            <div class="col-3 d-flex justify-content-center align-items-center">
                <img
                    class="profile-picture"
                    :src="contactInfo.largeImageURL ? contactInfo.largeImageURL : defaultPicture"
                    alt="profile-picture">
            </div>
            <div class="col d-flex justify-content-center flex-column">
                <div class="d-flex align-items-center">
                    <div class="d-flex align-items-start h-100">
                        <img
                            v-if="contactInfo.isFavorite"
                            class="favStarIcon"
                            :src="favTrue"
                            alt="">
                    </div>
                    <div class="ml-1">
                        <div class="text-bold contact-name"> {{ contactInfo.name}} </div>
                        <div class="text-ligther description-text"> {{ contactInfo.companyName }} </div>
                    </div>
                </div>
            </div>
        </router-link>
        <div class="line" v-if="!lastOne" />
    </div>
</template>

<script>
import defaultPicture from '../../public/icons/user_largex1.png'
import favTrue from '../../public/icons/fav_truex1.png'
import favFalse from '../../public/icons/fav_falsex1.png'
export default {
    name: 'Contact',
    props: {
        contactInfo: {
            type: Object,
            required: true
        },
        lastOne: {
            type: Boolean,
            required: true
        }
    },
    data () {
        return {
            defaultPicture: defaultPicture,
            favTrue: favTrue,
            favFalse: favFalse
        }
    }
}
</script>

<style lang="scss" scoped>
.profile-picture {
    width: 50px;
    height: 50px;
}
.contact-name {
    font-size: 16px;
    line-height: 16px;
}
.favStarIcon {
    $size: 15px;
    max-height: $size;
    max-width: $size;
}
.line {
    height: 1px;
    max-height: 1px;
    width: 90%;
    background: rgb(219, 219, 219);
}
.description-text {
    color: lightgrey;
    font-size: 12px;
}
</style>
