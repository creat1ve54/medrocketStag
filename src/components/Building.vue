<template>
    <div>
        <div v-for="buildingItem in building" :key="buildingItem.id">
            {{ buildingItem.name }}
        </div>
    </div>
</template>
<script>
export default {
    name: 'Building',
    created() {
      this.$store.dispatch('workplace/getBuilding') 
    },
    computed: {
        building(){
            return this.$store.state.workplace.building
        },
    }
}
</script>
<style scoped>
    
</style>