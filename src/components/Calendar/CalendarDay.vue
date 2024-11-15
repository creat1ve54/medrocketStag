<template>
    <div class="calendar__day-info" v-if="day">
        <div class="calendar__day-list">
            <CalendarDayTime  v-for="modelSchedule in modelScheduleDate" :key="modelSchedule.id" :dateActive="dateCorrectly" :modelSchedule="modelSchedule" :modelScheduleId="modelScheduleId"/>
            <button class="calendar__day-add btn" @click="onOpenModelSchedulePopup">+</button>
        </div>
        <span>{{ day }}</span>
        <PopupModelSchedule v-if="popupOpenModelSchedule" :dateActive="dateCorrectly" :modelScheduleId="modelScheduleId.toString()" :workplace="workplace"  @onClosePopup="onCloseModelSchedulePopup"/>
    </div>
</template>
<script>
import CalendarDayTime from './CalendarDayTime.vue';
import PopupModelSchedule from '../Popup/PopupModelSchedule.vue';

export default {
    name: 'CalendarDay',
    components: {
        PopupModelSchedule,
        CalendarDayTime
    },
    data() {
        return {
            popupOpenModelSchedule: false,
        }
    },
    props:['day', 'year', 'month', 'modelScheduleId'],
    methods: {
        onOpenModelSchedulePopup(){
            this.popupOpenModelSchedule = true
        },
        onCloseModelSchedulePopup() {            
            this.popupOpenModelSchedule = false
        },
        workplaceSpecialitiesById(id) {
            return this.$store.getters['workplace/getWorkplaceById'](id)
        },
        modelScheduleDateFunc() {
            
            const data = this.modelSchedule.filter(item => item.dt == this.dateCorrectly).sort((a, b) => {
                const timeA = new Date(`1970-01-01T${a.work_start}Z`);
                const timeB = new Date(`1970-01-01T${b.work_start}Z`);
                return timeA - timeB;
            })


            let newData = [];
            
            for (let i = 0; i < data.length; i++) {
                
                // console.log(data[i]);
                

                
                
                if (data[i + 1] 
                    && data[i].dt == data[i + 1].dt 
                    && this.workplaceSpecialitiesById(data[i].workplace).speciality == this.workplaceSpecialitiesById(data[i + 1].workplace).speciality 
                    && data[i].work_end == data[i + 1].work_start
                ) {
                    if(newData.length == 0) {
                        let item = data[i]
                        item.work_end = data[i + 1].work_end
                        newData.push(item)

                    } else {
                        let item = newData[newData.length - 1]
                        // console.log(item);
                        item.work_end = data[i + 1].work_end
                        newData.pop()
                        newData.push(item)
                        console.log(111);
                        console.log(newData);
                    }

                    if(data[i].dt == "2024-11-29") {

                        
                        
                    }

                } 
                else {
                    newData.push(data[i])
                }

                
            }

            return newData
        },
    },
    created() {
        // this.modelScheduleDateFunc()
        // console.log();
        
    },
    computed: {
        dateCorrectly() {
            let dayNew;
            if(this.day < 10) {
                dayNew = '0' + this.day
            } else {
                dayNew = this.day
            }
            return this.year + '-' + (this.month+1) + '-' + dayNew
        },
        modelScheduleDate() {            
            const data = this.modelSchedule.filter(item => item.dt == this.dateCorrectly).sort((a, b) => {
                const timeA = new Date(`1970-01-01T${a.work_start}Z`);
                const timeB = new Date(`1970-01-01T${b.work_start}Z`);
                return timeA - timeB;
            })
            
            return data
        },
        dateModelSchedule() {
            return this.$store.getters['workplace/getOnlyDate']
        },
        modelSchedule() {
            return this.$store.getters['workplace/getModelScheduleTimes'];
        },
        
        isLoading() {
            return this.$store.state.workplace.isLoading   
        },
        workplace () {
            return this.$store.getters['workplace/getWorkplaceDoctorById'](this.modelScheduleId);
        },
    },
}
</script>
<style scoped>
    .calendar__day-info .popup {
        height: 100%;
    }

    .calendar__btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 35px;
        height: 35px;
    }

    .calendar__day-add {
        width: 100%;
        padding: 5px;
        border-radius: 0;
    }

    .calendar__day-list {
        display: flex;
        flex-direction: column;
    }
    .calendar__day span {
        text-align: end;
        padding: 5px;
    }
</style>