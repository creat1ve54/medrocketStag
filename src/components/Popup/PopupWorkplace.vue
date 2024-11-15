<template>
        <div class="popup">
        <div @click="onClose" class="popup__overlay"></div>
        <div class="popup__container">
            <button @click="onClose" class="popup__close">X</button>
            <form class="popup__form">
                <div class="popup__up">
                    <div class="popup__slected">
                        <div class="popup__item">
                            Филиал:
                            <Selected :title="buildingItem==null? 'Выбрать' : buildingItem.name" :list="building" :searchInput="false" @onChangeItem="onChangeBuilding"/>
                        </div>
                        <div class="popup__item">
                            Доктор:
                            <Selected :list="personals" :title="personalItem==null? 'Выбрать' : personalItem.secondname" searchTitle='secondname' @onChangeItem="onChangePersonals"/>
                        </div>
                        <div class="popup__item">
                            Специальность:
                            <Selected :list="specialites" :title="specialitesItem==null? 'Выбрать' : specialitesItem.name" @onChangeItem="onChangeSpecialites"/>
                        </div>
                    </div>
                    <div class="popup__error" v-if="isError">Заполните все поля!</div>
                </div>

                <button class="btn btn--submit" type="submit" @click.prevent @click="onSubmit">{{ isCreated ? 'Создать': 'Обновить' }}</button>
            </form>
        </div>
    </div>
</template>
<script>
import { workplaceAPI } from '../../api/axios';
import Selected from '../Selected.vue';

export default {
    name: 'PopupWorkplace',
    components: {
        Selected
    },
    data() {
        return {
            personalItem: this.workplace ? this.workplace.doctorItem : null,
            personalsError: '',
            buildingItem: this.workplace ? this.workplace.filialItem : null,
            buildingError: '',
            specialitesItem: this.workplace ? this.workplace.specialityItem : null,
            specialitesError: '',
            isError: false
        }
    },
    props: {
        isCreated: {
            type: Boolean,
            default: true
        },
        workplace: {
            type: Object
        }
    },
    emits: ['onClosePopup'],
    methods: {
        onClose() {
            this.$emit('onClosePopup')
        },
        onChangeSpecialites(specialites) {
            this.specialitesItem = specialites
        },
        onChangeBuilding(building) {
            this.buildingItem = building
        },
        onChangePersonals(personal) {
            this.personalItem = personal
        },
        async onSubmit(){            
            if(this.personalItem != null && this.buildingItem !=null && this.specialitesItem !=null) {
                this.isError = false 

                const newWorkplace = {
                    doctor: this.personalItem.id,
                    filial: this.buildingItem.id,
                    speciality: this.specialitesItem.id,
                    service_categories: [],
                    services: [], 
                }

                try {                        
                    this.isCreated ? await workplaceAPI.postWorkplace(newWorkplace) : await workplaceAPI.patchWorkplace(this.workplace.id, newWorkplace)
                    this.$emit('onClosePopup')
                } catch (error) {
                    console.log(error);
                }

            } else {
                this.isError = true
            }
        },
    },
    computed: {
        specialites() {
            return this.$store.state.workplace.specialities
        },
        building() {
            return this.$store.state.workplace.building
        },
        personals() {
            return this.$store.state.personal.personals
        }
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
        flex: 1 1 calc(100% / 3);
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

        min-height: 400px;

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