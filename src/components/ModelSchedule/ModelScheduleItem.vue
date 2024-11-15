<template>
    <div class="workplace__time" v-if="!isLoading && modelSchedule != null">
        <div class="workplace__time-info">
            <div class="workplace__time-text">{{ modelScheduleWorkStart }} {{ modelScheduleWorkEnd }}</div>
            <div class="workplace__time-specialities" v-if="workplaceSpecialitiesById(modelSchedule.workplace) && workplaceSpecialitiesById(modelSchedule.workplace).specialityItem">{{ workplaceSpecialitiesById(modelSchedule.workplace).specialityItem.name }}</div>
        </div>
        <div class="workplace__time-btns">
            <button @click="onOpenPopup" class="workplace__edit">
                <svg width="15px" height="15px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 469.333 469.333" style="enable-background:new 0 0 469.333 469.333;" xml:space="preserve"><g><g><rect x="21.333" y="426.667" />
                    </g></g><g><g><path d="M327.253,0L64,263.253V384h120.747L448,120.747L327.253,0z M167.04,341.333h-60.373V280.96L327.253,60.373l60.373,60.373 L167.04,341.333z" fill="green"/></g></g>
                </svg>
            </button>
            <button @click="() => deleteModelScheduleTime(modelSchedule.id)" class="workplace__delete">
                <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 24 24" fill="none">
                    <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" 
                    stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
        <PopupModelSchedule v-if="popupOpen" :workplaceItemObj="modelScheduleWorkplaceById(modelSchedule.workplace)" :workplace="workplace" :modelScheduleId="modelScheduleId.toString()" :modelSchedule="modelSchedule" :isCreated="false" @onClosePopup="onClosePopup"/>
    </div>
</template>
<script>
import PopupModelSchedule from '../Popup/PopupModelSchedule.vue';


export default {
    name: 'ModelScheduleItem',
    components: {
        PopupModelSchedule,
    },
    props: ['modelSchedule', 'workplaceFilial', 'modelScheduleId'],
    data() {
        return {
            popupOpen: false
        }
    },
    methods: {
        workplaceSpecialitiesById(id) {
            return this.$store.getters['workplace/getWorkplaceById'](id);
        },
        onOpenPopup(){
            this.popupOpen = true
        },
        onClosePopup() {            
            this.popupOpen = false
        },
        modelScheduleWorkplaceById(id) {
            return this.$store.getters['workplace/getWorkplaceById'](id)
        },
        workTimeSplit(time) {
            return time.split(":").slice(0, 2).join(":");
        },
        deleteModelScheduleTime(id) {
            this.$store.dispatch('workplace/deleteModelScheduleTime', id).then(() => {
                this.$store.dispatch('workplace/getModelSchedule', this.modelScheduleId)
            }) 
        }
    },
    computed: {
        isLoading() {
            return this.$store.state.workplace.isLoading   
        },
        workplace () {
            return this.$store.getters['workplace/getWorkplaceDoctorById'](this.modelScheduleId);
        },
        modelScheduleWorkStart() {
            return this.workTimeSplit(this.modelSchedule.work_start)
        },
        modelScheduleWorkEnd() {
            return this.workTimeSplit(this.modelSchedule.work_end)   
        }
    }
}
</script>
<style scoped>
   

    .workplace__time {
        display: flex;
        justify-content: space-between;
        gap: 5px;
    }


    .workplace__time-info {
        display: flex;
        gap: 5px;
    }

    .workplace__time-btns {
        display: flex;
        gap: 5px;
    }

    .workplace__delete {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        /* position: absolute; */
        cursor: pointer;
        background-color: buttonface;
        /* right: 10px;
        top: 10px; */
        outline: none;
        width: 20px;
        height: 20px;
        padding: 0;
        border: none;
    }

    .workplace__edit {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        /* position: absolute; */
        cursor: pointer;
        background-color: buttonface;
        /* right: 10px;
        top: 50px; */
        outline: none;
        width: 20px;
        height: 20px;
        padding: 0;
        border: none;
    }
</style>