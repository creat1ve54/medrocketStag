<template>
    <div ref="selected" class="selected">
        <div @click="openSelected" class="selected__header">{{ newTitle }}</div>
        <div class="selected__list" v-if="isOpen">
            <input v-if="searchInput" type="text" class="selected__search" v-model="search"/>
            <div class="selected__item" v-for="item in newList" :key="item.id" @click="() => changeTitle(item)">{{item[searchTitle]}}</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Selected',
    data() {
        return {
            search: '',
            isOpen: false,
            newTitle: '',
        }
    },
    emits: ['onChangeItem'],
    props: {
        title: {
            type: String,
            default: 'Выбрать'
        },
        searchInput: {
            type: Boolean,
            default: true,
        },
        searchTitle: {
            type: String,
            default: 'name'
        },
        list: {
            type: Array,
            default: []
        },
    },
    methods: {
        openSelected() {
            this.isOpen = true
        },
        changeTitle(item){
            this.newTitle = item[this.searchTitle];
            this.isOpen = false
            this.$emit('onChangeItem', item)
        }
    },
    created() {
        window.addEventListener('click', (e)=>{
            if(this.$refs.selected && !this.$refs.selected.contains(e.target)) {
                this.isOpen = false
            }
        })
        this.newTitle = this.title;
    },
    computed: {
        newList() {
            return this.list.filter(item => item[this.searchTitle].toLowerCase().includes(this.search.toLowerCase()))
        },
    }
}
</script>
<style scoped>
    .selected {
        cursor: pointer;
        position: relative;
    }

    .selected__list {
        display: flex;
        flex-direction: column;

        overflow: auto;
        max-height: 250px;
        background: #f6f6fa;
        border: 1px solid transparent;
        border-radius: 9px;
        left: 0;
        overflow: auto;
        position: absolute;
        right: 0;
        top: calc(100% + 10px);
        width: 100%;
        z-index: 15;
        padding: 10px;
    }

    .selected__search {
        display: flex;
        /* width: 100%; */
    }

    .selected__item {
        cursor: pointer;
        padding: 5px;
        border-radius: 9px;
    }

    @media (hover: hover) and (pointer: fine) {
        .selected__item:hover {
            background: #2243861a;
            color: #42474d;
            transition: background .3s ease, color .3s ease;
        }
    }
</style>