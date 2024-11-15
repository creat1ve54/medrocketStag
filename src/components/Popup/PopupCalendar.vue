<template>
    <div class="popup">
        <div @click="onClose" class="popup__overlay"></div>
        <div class="popup__container">
            <button @click="onClose" class="popup__close">X</button>
            <div class="calendar">
                <div class="calendar__header">
                    <button class="calendar__btn btn" @click="changeMonth(-1)">‹</button>
                    <div class="calendar__header-title">{{ monthName }} {{ year }}</div>
                    <button class="calendar__btn btn" @click="changeMonth(1)">›</button>
                </div>
                <table class="calendar__table">
                    <thead class="calendar__table-header">
                        <tr>
                            <th>Понедельник</th>
                            <th>Вторник</th>
                            <th>Среда</th>
                            <th>Четверг</th>
                            <th>Пятница</th>
                            <th>Суббота</th>
                            <th>Воскресенье</th>
                        </tr>
                    </thead>
                    <tbody class="calendar__table-body">
                        <tr v-for="(week, weekIndex) in chunkedDays" :key="weekIndex">
                            <td v-for="(day, dayIndex) in week" :key="dayIndex" class="calendar__day" :class="{'calendar__day--empty': !day}">
                                <CalendarDay :day="day" :month="month" :year="year" :modelScheduleId="modelScheduleId"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import CalendarDay from '../Calendar/CalendarDay.vue';
import PopupModelSchedule from './PopupModelSchedule.vue';

export default {
    name: 'PopupPersonal',
    components: {
        PopupModelSchedule,
        CalendarDay
    },
    props: {
        isCreated: {
            type: Boolean,
            default: true
        },
        personal: {
            type: Object
        },
        modelScheduleId: {
            type: String
        }
    },
    data() {
        return {
            currentDate: new Date(),

            months: [
                "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
                "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
            ]
        };
    },
    emits: ['onClosePopup'],

    methods: {
        onClose() {
            this.$emit('onClosePopup')
        },
        changeMonth(offset) {
            const newDate = new Date(this.currentDate);
            newDate.setMonth(this.currentDate.getMonth() + offset);
            this.currentDate = newDate;
        },
        modelScheduleDate(year, month, day) {            
            const date = year + '-' + (month+1) + '-' + day
            return this.modelSchedule.filter(item => item.dt == date).sort((a, b) => {
                const timeA = new Date(`1970-01-01T${a.work_start}Z`);
                const timeB = new Date(`1970-01-01T${b.work_start}Z`);
                return timeA - timeB;
            })
        },
        workTimeSplit(time) {
            return time.split(":").slice(0, 2).join(":");
        },
        onOpenModelSchedulePopup(){
            this.popupOpenModelSchedule = true
        },
        onCloseModelSchedulePopup() {            
            this.popupOpenModelSchedule = false
        },
    },
    computed: {
        month() {
            return this.currentDate.getMonth();
        },
        monthName() {
            return this.months[this.currentDate.getMonth()];
        },
        year() {
            return this.currentDate.getFullYear();
        },
        chunkedDays() {
            const daysInMonth = this.daysInMonth;
            const weeks = [];
            while (daysInMonth.length) {
                weeks.push(daysInMonth.splice(0, 7));
            }
            return weeks;
        },
        daysInMonth() {
            const lastDayOfMonth = new Date(this.year, this.currentDate.getMonth() + 1, 0);
            const days = [];

            // Заполняем пустые ячейки перед первым днем месяца
            for (let i = 0; i < this.firstDayOfMonth; i++) {
                days.push(null);
            }

            // Заполняем календарь днями месяца
            for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
                days.push(i);
            }

            // Заполняем пустые ячейки в конце, если не воскресенье
            const lastDayOfWeek = lastDayOfMonth.getDay();  // день недели для последнего дня месяца           
            for (let i = lastDayOfWeek + 1; i <= 7; i++) {
                days.push(null);
            }

            return days;
        },
        firstDayOfMonth() {
            return new Date(this.year, this.currentDate.getMonth(), 0).getDay();
        },        
        isLoading() {
            return this.$store.state.workplace.isLoading   
        },
    },
}
</script>
<style scoped>
    .popup {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100dvh;
        z-index: 111;
    }

    .popup--close {
        display: none;
    }

    .popup__overlay {
        position: absolute;
        width: 100%;
        height: 100dvh;
        background-color: rgba(0, 0, 0, 0.4);
    }

    .popup__container {
        position: absolute;
        left: calc(50% - 20px);
        top: 50%;
        transform: translate(-50%, -50%);
        position: relative;
        z-index: 2;
        background-color: white;

        max-width: 800px;

        border-radius: 20px;
        padding: 40px;
        overflow: hidden;

        margin: 20px;
    }

    .popup__form {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .popup__close {
        cursor: pointer;
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        right: 10px;
        top: 10px;
        z-index: 2;

        border: none;
        width: 30px;
        height: 30px;
        background-color: white;
        outline: none;
        border-radius: 100%;
        box-shadow: 0px 0px 8px 3px rgba(34, 60, 80, 0.2);
    }

    .calendar__header {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 20px;
        margin-bottom: 20px;
    }

    .calendar__header-title {
        color: gray;
        text-align: center;
        min-width: 150px;
    }

    .calendar__table {
        border-spacing: 0px;
        border-collapse: collapse;
    }

    .calendar__table-header th{
        color: gray;
        font-weight: normal;
    }

    .calendar__day {
        width: 115px;
        height: 115px;
        overflow: auto;
        border: 1px solid gray;
    }

    .calendar__day-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }

    

    .calendar__day--empty {
        background-color: rgb(235, 227, 227);
    }


</style>