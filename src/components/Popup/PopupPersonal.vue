<template>
    <div class="popup">
        <div @click="onClose" class="popup__overlay"></div>
        <div class="popup__container">
            <button @click="onClose" class="popup__close">X</button>
            <form class="popup__form">
                <div class="field" :class="{ 'field--error': surnameError }">
                    <div class="custom-input">
                        <input class="custom-input__input" type="text" placeholder="Ваше Фамилия" v-model="surname">
                        <span class="custom-input__placeholder">Ваше Фамилия<span class="custom-input__placeholder-decor">*</span></span>
                    </div>
                </div>

                <div class="field" :class="{ 'field--error': firstnameError }">
                    <div class="custom-input">
                        <input class="custom-input__input" type="text" placeholder="Ваше Имя" v-model="firstname">
                        <span class="custom-input__placeholder">Ваше Имя<span class="custom-input__placeholder-decor">*</span></span>
                    </div>
                </div>
                
                <div class="field" :class="{ 'field--error': secondnameError }">
                    <div class="custom-input">
                        <input class="custom-input__input" type="text" placeholder="Ваше Отчество" v-model="secondname"> 
                        <span class="custom-input__placeholder">Ваше Отчество<span class="custom-input__placeholder-decor">*</span></span>
                    </div>
                </div>
                <div class="tabs">
                    <label class="tab">
                        <input type="radio" name="gender" v-model="gender" value="MALE">
                        <span>Мужчина</span>
                    </label>
                    <label class="tab">
                        <input type="radio" name="gender" v-model="gender" value="FEMALE">
                        <span>Женщина</span>
                    </label>
                </div>
                <button class="btn btn--submit" type="submit" @click.prevent @click="onSubmit">{{ isCreated ? 'Создать': 'Обновить' }}</button>
            </form>
        </div>
    </div>
</template>
<script>
import { personalsAPI } from '../../api/axios';

export default {
    name: 'PopupPersonal',
    props: {
        isCreated: {
            type: Boolean,
            default: true
        },
        personal: {
            type: Object
        }
    },
    emits: ['onClosePopup'],
    data() {
        return {
            surname: this.personal ? this.personal.surname : null,
            surnameError: '',
            firstname: this.personal ? this.personal.firstname : null,
            firstnameError: '',
            secondname: this.personal ? this.personal.secondname : null,
            secondnameError: '',
            gender: this.personal ? this.personal.gender : "MALE",
        }
    },
    methods: {
        async onSubmit(){            
            if(this.surname != '' && this.firstname !='' && this.secondname !='') {
                this.surnameError = false   
                this.firstnameError = false 
                this.secondnameError = false    
                
                const newPersonal = new FormData()

                newPersonal.append('surname', this.surname)
                newPersonal.append('firstname', this.firstname)
                newPersonal.append('secondname', this.secondname)
                newPersonal.append('gender', this.gender)
                
                try {                        
                    this.isCreated ? await personalsAPI.addPersonal(newPersonal): await personalsAPI.updatePersonal(this.personal.id,newPersonal)
                    await this.$store.dispatch('personal/getPersonals')
                    this.$emit('onClosePopup')
                } catch (error) {
                    console.log(error);
                }

            } else {
                this.surnameError = this.surname == ''
                this.firstnameError = this.firstname == ''
                this.secondnameError = this.secondname == ''
            }
        },

        onClose() {
            this.$emit('onClosePopup')
        }
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
</style>