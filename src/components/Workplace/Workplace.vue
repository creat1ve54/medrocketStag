<template>
    <div class="workplace__list" v-if="!isLoading">
        <WorklaceItem v-for="workplaceItem in workplace" :key="workplaceItem.id"  :workplaceItem="workplaceItem"/>
    </div>
</template>
<script>
import PopupWorkplace from '../Popup/PopupWorkplace.vue';
import WorklaceItem from './WorklaceItem.vue';

export default {
    name: "Workplace",
    components: {
        PopupWorkplace,
        WorklaceItem
    },
    computed: {
        workplace(){
            return this.$store.getters['workplace/getWorkplaceDoctorAll'];
        },
        isLoading() {
            return this.$store.state.workplace.isLoading   
        }
    },
}
</script>
<style scoped>

    .workplace__list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
        gap: 15px;
    }

</style>