<template>
    <div class="personals">
        <div>
            <button class="personals__btn btn" @click="onOpenPopup">Создать сотрудника</button>
            <router-link class="personals__link btn" to="/workplace">Рабочее место</router-link>
        </div>

        <div class="personals__list">
            <Personal v-for="personal in personals" :key="personal.id" :personal="personal"/>
        </div>
        <PopupPersonal v-if="popupOpen" @onClosePopup="onClosePopup"/>
    </div>
</template>
<script>
import Personal from './Personal.vue';
import PopupPersonal from '../Popup/PopupPersonal.vue';


export default {
    name: "Personals",
    components: {
        Personal,
        PopupPersonal
    },
    data() {
        return {
            popupOpen: false,
        }
    },
    created() {
        this.$store.dispatch('workplace/getSpecialities') 
        this.$store.dispatch('workplace/getBuilding') 
        this.$store.dispatch('workplace/getWorkplace')  
    },
    methods: {
        onOpenPopup(){
            this.popupOpen = true
        },

        onClosePopup() {
            this.popupOpen = false
        }
    },
    computed: {
        personals() {
            return this.$store.state.personal.personals
        },
    },
}
</script>
<style scoped>
    .personals {
        padding: 20px;
    }

    .personals__list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 15px;
    }

    .personals__btn {
        margin-bottom: 20px;
    }

    .personals__link {
        color: black;
        text-decoration: none;
        background-color: buttonface;
    }
</style>