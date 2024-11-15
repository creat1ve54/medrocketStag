<template>
    <div>
        <div v-for="specialitie in specialities" :key="specialitie.id">
            {{ specialitie.name }}
        </div>
    </div>
</template>
<script>
export default {
    name: 'Specialities',
    computed: {
        specialities(){
            return this.$store.state.workplace.specialities
        }
    }
}
</script>
<style scoped>
    
</style>