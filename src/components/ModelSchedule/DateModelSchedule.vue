<template>
    <div class="workplace__date" v-if="!isLoading">
        <div class="workplace__date-title">{{date}}</div>
        <div class="workplace__times">
            <ModelScheduleItem v-for="modelSchedule in modelScheduleDate" :key="modelSchedule.id" :workplaceFilial="workplaceFilial" :modelScheduleId="modelScheduleId" :modelSchedule="modelSchedule"/>
        </div>
    </div>
</template>
<script>
import ModelScheduleItem from './ModelScheduleItem.vue';

export default {
    name: 'DateModelSchedule',
    components: {
        ModelScheduleItem
    },
    props: ['date', 'workplaceFilial', 'modelScheduleId'],
    computed: {
        modelSchedule() {
            return this.$store.getters['workplace/getModelScheduleTimes'];
        },
        modelScheduleDate() {
            return this.modelSchedule.filter(item => item.dt == this.date).sort((a, b) => {
                const timeA = new Date(`1970-01-01T${a.work_start}Z`);
                const timeB = new Date(`1970-01-01T${b.work_start}Z`);
                return timeA - timeB;
            })
        },
        isLoading() {
            return this.$store.state.workplace.isLoading   
        },
    }
}
</script>
<style scoped>
    .workplace__date-title {
        font-weight: 600;
        margin-bottom: 10px;
    }

    .workplace__times {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
</style>