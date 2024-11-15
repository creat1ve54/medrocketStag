<template>
    <div class="workplace-page">
        <button class="workplace-page__btn btn"  @click="onOpenPopup">Создать</button>
        <Workplace/>
        <PopupWorkplace v-if="popupOpen" @onClosePopup="onClosePopup"/>
    </div>
</template>
<script>
import Building from '../components/Building.vue';
import PopupWorkplace from '../components/Popup/PopupWorkplace.vue';
import Specialities from '../components/Specialities.vue';
import Workplace from '../components/Workplace/Workplace.vue';

export default {
    name: 'WorkplacePage',
    components: {
        Building,
        Specialities,
        Workplace,
        PopupWorkplace
    },
    data() {
        return {
            popupOpen: false,
        }
    },
    methods: {
        onOpenPopup(){
            this.popupOpen = true
        },

        onClosePopup() {            
            this.popupOpen = false
        }
    }
}
</script>
<style scoped>
    .workplace-page {
        padding: 20px;
    }

    .workplace-page__btn {
        margin-bottom: 20px;
    }
</style>