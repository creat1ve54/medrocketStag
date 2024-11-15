<template>
    <div class="popup">
        <div @click="onClose" class="popup__overlay"></div>
        <div class="popup__container">
            <button @click="onClose" class="popup__close">X</button>
            <form class="popup__form">
                <div class="popup__item">
                    Специальность:
                    <Selected :list="specialitesPersonal" :title="specialitesItem==null? 'Выбрать' : specialitesItem.name" @onChangeItem="onChangeSpecialites"/>
                </div>
                <div class="field" :class="{ 'field--error': dateError }" v-if="dateActive == ''">
                    <div class="custom-input">
                        <input class="custom-input__input" type="date" placeholder="Дата" v-model="date">                        
                    </div>
                </div>

                <div class="field" :class="{ 'field--error': !timeStartIsValid }">
                    <div class="custom-input">
                        <input class="custom-input__input" placeholder="Ваше Имя" v-model="timeStart" type="text" v-mask="'##:##'" >
                        <span class="custom-input__placeholder">Начало<span class="custom-input__placeholder-decor">*</span></span>
                    </div>
                </div>
                
                <div class="field" :class="{ 'field--error': !timeEndIsValid }">
                    <div class="custom-input">
                        <input class="custom-input__input" type="text" placeholder="Ваше Отчество" v-model="timeEnd" v-mask="'##:##'" > 
                        <span class="custom-input__placeholder">Конец<span class="custom-input__placeholder-decor">*</span></span>
                    </div>
                </div>
                <button class="btn btn--submit" type="submit" @click.prevent @click="onSubmit">{{ isCreated ? 'Создать': 'Обновить' }}</button>
            </form>
        </div>
    </div>
</template>
<script>
import { modelScheduleAPI } from '../../api/axios';
import Selected from '../Selected.vue';

export default {
    name: 'PopupPersonal',
    props: {
        isCreated: {
            type: Boolean,
            default: true
        },
        workplace: {
            type: Array | Object
        },
        workplaceFilial: {
            type: Array
        },
        modelScheduleId: {
            type: String
        },
        workplaceId: {
            type: Number
        },
        workplaceItemObj: {
            type: Object
        },
        modelSchedule: {
            type: Object
        },
        dateActive: {
            type:String,
            default: ''
        }
    },
    components: {
        Selected
    },
    emits: ['onClosePopup'],
    data() {
        return {
            timeStart: this.modelSchedule ? this.modelSchedule.work_start : '',
            timeStartIsValid: true,
            timeEnd: this.modelSchedule ? this.modelSchedule.work_end : '',
            timeEndIsValid: true,
            date: this.modelSchedule ? this.modelSchedule.dt : '',
            dateError: '',
            workplaceItem: null,
            workplaceError: '',
            specialitesItem: this.workplaceItemObj ? this.workplaceItemObj.specialityItem : null,
            specialitesError: '',
        }
    },
    methods: {
        onChangeSpecialites(specialites) {
            this.specialitesItem = specialites
        },
        onChangeBuilding(workplace) {
            this.workplaceItem = workplace
        },

        validTime(time) {
            let [hours, minutes] = time.split(':');
            return hours >= 0 && hours <= 23 && minutes >= 0 && minutes < 60
        },

        async onSubmit(){            
            const datePattern = /^\d{4}-\d{2}-\d{2}$/;
                    

            if(this.timeStart.length == 5) {
                this.timeStartIsValid = this.validTime(this.timeStart)
            } else {
                this.timeStartIsValid = false
            }

            if(this.timeEnd.length == 5) {
                this.timeEndIsValid = this.validTime(this.timeEnd)
            } else {
                this.timeEndIsValid = false
            }

            // this.workplaceError = this.workplaceItem == null
            if(this.dateActive == '') {
                this.dateError = !datePattern.test(this.date)    
            }
            

            if(this.timeStartIsValid && this.timeEndIsValid && !this.dateError && this.workplaceChange) {
                const newModelSchedule = new FormData()

                newModelSchedule.append('workplace', this.workplaceChange.id)
                newModelSchedule.append('dt', this.dateActive == '' ? this.date : this.dateActive)
                newModelSchedule.append('work_start', this.timeStart)
                newModelSchedule.append('work_end', this.timeEnd)
                
                try {                        
                    this.isCreated ? await modelScheduleAPI.postModelSchedule(newModelSchedule): await modelScheduleAPI.patchModelSchedule(this.modelSchedule.id, newModelSchedule)
                    await this.$store.dispatch('workplace/getModelSchedule', this.modelScheduleId)
                    this.$emit('onClosePopup')
                } catch (error) {
                    console.log(error);
                }
            } 
        },

        onClose() {
            this.$emit('onClosePopup')
        }
    },
    computed: {
        specialites() {
            return this.$store.state.workplace.specialities
        },
        specialitesPersonal() {
            return this.$store.getters['workplace/getSpecialitiesPersonal'](this.workplace)
        },
        workplaceChange() {
            if(this.specialitesItem) {
                return this.workplace.find(item=>item.speciality == this.specialitesItem.id)
            }
        },

    }
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

    .popup__item {
        display: flex;
        flex-direction: column;
        gap: 10px;
        /* flex: 1 1 calc(100% / 3); */
    }

    .popup--close {
        display: none;
    }

    .popup__slected {
        display: flex;
        justify-content: space-between;
        gap: 20px;
    }

    .popup__overlay {
        position: absolute;
        width: 100%;
        height: 100dvh;
        background-color: rgba(0, 0, 0, 0.4);
    }

    .popup__container {
        display: flex;
        flex-direction: column;
        position: absolute;
        left: calc(50% - 20px);
        top: 50%;
        transform: translate(-50%, -50%);
        position: relative;
        z-index: 2;
        background-color: white;

        min-height: 300px;

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
        flex: 1 1 auto;
        justify-content: space-between;
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
</style>