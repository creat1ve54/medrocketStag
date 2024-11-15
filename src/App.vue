<template>
  <div id="app">
    <router-view></router-view>
 </div>

</template>

<script>
export default {
  name: "App",
  created() {
    this.$store.dispatch('personal/getPersonals')
    this.$store.dispatch('workplace/getSpecialities') 
    this.$store.dispatch('workplace/getBuilding') 
    this.$store.dispatch('workplace/getWorkplace')  
  },
};
</script>

<style scoped></style>
