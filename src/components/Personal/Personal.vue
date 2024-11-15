<template>
    <router-link :to="{ name: 'personal',  params: { id: personal.id }}" class="personal" >
            <div class="personal__name">
            <span>Фамилия: <span class="personal__name-weight">{{ personal.surname }}</span></span>
            <span>Имя: <span class="personal__name-weight">{{ personal.firstname }}</span></span>
            <span>Отчество: <span class="personal__name-weight">{{ personal.secondname }}</span></span>
        </div>
        
         <div v-if="personal.experience">Опыт: {{ personal.experience}}</div>
         <div class="">Почта: <span>{{ personal.email }}</span></div>
    </router-link>
</template>
<script>


export default {
    name: 'Personal',
    props: {
        personal: {
            type: Object,
            default: {}
        }
    },
}
</script>
<style scoped>
    .personal {
        display: flex;
        flex-direction: column;
        gap: 10px;

        text-decoration: none;
        color: black;
        padding: 10px;
        border-radius: 20px;
        box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
        background-color: white;
        font-family: 'Arial';
    }
    .personal__name {
        display: flex;
        flex-direction: column;
        font-size: 16px;
    }

    .personal__name-weight {
        font-weight: 600;
    }
</style>