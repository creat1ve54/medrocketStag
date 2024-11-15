<template>
    <div class="calendar__day-time">
        <div class="calendar__day-time-container" @click="onOpenPopup">
            <div class="calendar__day-personal">
                {{ workplaceSpecialitiesById(modelSchedule.workplace).specialityItem.name }}
            </div>
            {{ workTimeSplit(modelSchedule.work_start) }} - {{ workTimeSplit(modelSchedule.work_end) }}
        </div>
        <PopupModelSchedule v-if="popupOpen" :dateActive="dateActive" :workplaceItemObj="modelScheduleWorkplaceById(modelSchedule.workplace)" :workplace="workplace" :modelScheduleId="modelScheduleId.toString()" :modelSchedule="modelSchedule" :isCreated="false" @onClosePopup="onClosePopup"/>
    </div>
</template>
<script>
import PopupModelSchedule from '../Popup/PopupModelSchedule.vue';

export default {
    name: 'CalendarDayTime',
    data() {
        return {
            popupOpen: false
        }
    },
    props: ['modelSchedule', 'modelScheduleId', 'dateActive'],
    components: {
        PopupModelSchedule
    },
    methods: {
        onOpenPopup(){
            this.popupOpen = true
        },
        onClosePopup() {                       
            this.popupOpen = false
        },
        workplaceSpecialitiesById(id) {
            return this.$store.getters['workplace/getWorkplaceById'](id)
        },
        workTimeSplit(time) {
            return time.split(":").slice(0, 2).join(":");
        },
        modelScheduleWorkplaceById(id) {
            return this.$store.getters['workplace/getWorkplaceById'](id)
        },
    },
    computed: {
        workplace () {
            return this.$store.getters['workplace/getWorkplaceDoctorById'](this.modelScheduleId);
        },
    }
}
</script>
<style scoped>
    .calendar__day-time-container {
        cursor: pointer;
        padding: 2px;
        font-size: 14px;
        background-color: rgb(247 233 207);
        font-weight: 600;
        color: rgb(233 93 38);
    }

    .calendar__day-time .popup {
        height: 100%;
    }
</style>