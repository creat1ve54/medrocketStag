<template>
    <div class="personal-detail" v-if="!isLoading && personal">
        <div class="personal-detail__name" >
            <span>Фамилия: <span class="personal-detail__name-weight">{{ personal.surname }}</span></span>
            <span>Имя: <span class="personal-detail__name-weight">{{ personal.firstname }}</span></span>
            <span>Отчество: <span class="personal-detail__name-weight">{{ personal.secondname }}</span></span>
        </div>
        
        <div v-if="personal.experience">Опыт: {{ personal.experience}}</div>
        <div class="">Почта: <span>{{ personal.email }}</span></div>

        <div class="peronals__btns">
            <button class="btn btn--edit" @click="onOpenPopup">Редактировать</button>
            <button class="btn btn--remove" @click="deletePersonal">Удалить</button>
        </div>
        <div class="workplace__list">
            <div class="workplace__item" v-for="workplaceItem in workplace" :key="workplaceItem.id">
                <div class="workplace__filial"><span>Филиал: </span>{{ workplaceItem.filialItem ? workplaceItem.filialItem.name : 'Нет филиала' }}</div>
                <div class="workplace__name"><span>Специальность: </span> {{ workplaceItem.specialityItem ? workplaceItem.specialityItem.name : 'Нет специальности'}}</div>
            </div>
        </div>
        <button class="btn" @click="onOpenCalendarPopup">Открыть календарь</button>
        <button class="btn"  @click="onOpenModelSchedulePopup">Создать график</button>
        <div class="workplace__dates" >
            <DateModelSchedule v-for="date in dateModelSchedule" :key="date.id" :workplaceFilial="workplaceFilial" :date="date" :modelScheduleId="id"/>
        </div>
        <PopupCalendar v-if="popupOpenCalendar" :modelScheduleId="id.toString()" @onClosePopup="onCloseCalendarPopup"/>
        <PopupPersonal v-if="popupOpen" :personal="personal" :isCreated="false" @onClosePopup="onClosePopup"/>
        <PopupModelSchedule v-if="popupOpenModelSchedule" :modelScheduleId="id" :workplace="workplace" :workplaceFilial="workplaceFilial" @onClosePopup="onCloseModelSchedulePopup"/>
    </div>
</template>
<script>
import { personalsAPI } from '../api/axios';
import DateModelSchedule from '../components/ModelSchedule/DateModelSchedule.vue';
import PopupCalendar from '../components/Popup/PopupCalendar.vue';
import PopupModelSchedule from '../components/Popup/PopupModelSchedule.vue';
import PopupPersonal from '../components/Popup/PopupPersonal.vue';

export default {
    name: 'PersonalDetail',
    components: {
        PopupPersonal,
        PopupModelSchedule,
        DateModelSchedule,
        PopupCalendar
    },
    data() {
        return {
            popupOpen: false,
            popupOpenModelSchedule: false,
            popupOpenCalendar: false,
        }
    },
    props: ['id'],
    methods: {
        onOpenPopup(){
            this.popupOpen = true
        },
        onClosePopup() {            
            this.popupOpen = false
        },
        onOpenModelSchedulePopup(){
            this.popupOpenModelSchedule = true
        },
        onCloseModelSchedulePopup() {            
            this.popupOpenModelSchedule = false
        },
        onOpenCalendarPopup(){
            this.popupOpenCalendar = true
        },
        onCloseCalendarPopup() {            
            this.popupOpenCalendar = false
        },
        deletePersonal() {
            personalsAPI.deletePersonal(this.id).then(() => {
                this.$store.dispatch('personal/getPersonals')
                this.$router.back()                
            })
        }
    },
    created() {
        this.$store.dispatch('workplace/getModelSchedule', this.id)
    },
    computed: {
        personal() {
            return this.$store.getters['personal/getPersonalById'](this.id)
        },
        workplace () {
            return this.$store.getters['workplace/getWorkplaceDoctorById'](this.personal.id);
        },
        workplaceFilial(){
            return this.$store.getters['workplace/getWorkplaceDoctorFilialById'](this.personal.id);
        },
        dateModelSchedule() {
            return this.$store.getters['workplace/getOnlyDate']
        },
        isLoading() {
            return this.$store.state.workplace.isLoading   
        }
    }
}
</script>
<style scoped>
    .personal-detail {
        display: flex;
        flex-direction: column;
        gap: 10px;

        text-decoration: none;
        color: black;
        padding: 10px;
        border-radius: 20px;
        background-color: white;
        font-family: 'Arial';
    }
    .personal-detail__name {
        display: flex;
        flex-direction: column;
        font-size: 16px;
    }

    .personal-detail__name-weight {
        font-weight: 600;
    }

    .workplace__list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
        gap: 15px;
    }

    .workplace__item {
        display: flex;
        flex-direction: column;
        gap: 10px;

        position: relative;
        text-decoration: none;
        color: black;
        padding: 15px;
        border-radius: 20px;
        box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
        background-color: white;
        font-family: 'Arial';
    }

    .workplace__item span{
        font-weight: 600;
    }

    .workplace__dates {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
        gap: 15px;
    }

    .workplace__date {
        position: relative;
        padding: 15px;
        border-radius: 20px;
        box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
        min-height: 100px;
    }


</style>