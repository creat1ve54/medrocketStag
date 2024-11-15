import { buildingAPI, modelScheduleAPI, specialitiesAPI, workplaceAPI } from "../api/axios";

const state = {
    building: [],
    specialities: [],
    workplace: [],
    modelSchedule:[],
    isLoading: false,
    isError: false,
};

const mutations = {
  setBuildins(state, building) {
    state.building = building;
  },
  setSpecialities(state, specialities) {
    state.specialities = specialities;
  },
  setWorkplace(state, workplace) {
    state.workplace = workplace;
  },
  setModelSchedule(state, modelSchedule) {
    state.modelSchedule = modelSchedule;
  },
  setLoading(state, isLoading) {
    state.isLoading = isLoading;
  },
  setError(state, isError) {
    state.isError = isError;
  },
};

const actions = {
  async getBuilding({commit}) {
    commit('setLoading', true)
    await buildingAPI.getBuilding().then(({data}) => {
        commit('setBuildins', data)
    }).finally(()=>{
      commit('setLoading', false)
    })
  },
  async getSpecialities({commit}){
    commit('setLoading', true)    
    await specialitiesAPI.getSpecialities().then(({data}) => {
        commit('setSpecialities', data)
    }).finally(()=>{
      commit('setLoading', false)
    })
  },
  async getWorkplace({commit }){
    commit('setLoading', true)
    await workplaceAPI.getWorkplace().then(({data}) => {
      commit('setWorkplace', data)
    }).finally(()=>{
      commit('setLoading', false)
    })
  },
  async deleteWorkplace(_, id){
    await workplaceAPI.deleteWorkplace(id)
  },
  async getModelSchedule({commit}, id){        
    await modelScheduleAPI.getModelSchedule(id).then(({data}) => {
      commit('setModelSchedule', data)
    }).finally(()=>{
      commit('setLoading', false)
    })
  },
  async deleteModelScheduleTime(_, id){   
    await modelScheduleAPI.deleteModelSchedule(id)
  },
};

const getters = {
  getFilialItemById: (state) => (id) => { 
    return state.building.find(building => building.id == id)
  },
  getSpecialityItemById: (state) => (id) => {
    return state.specialities.find(specialitie => specialitie.id == id)
  },
  getDoctorItemById: (_, __,rootState) => (id) => {
    return rootState.personal.personals.find(personal => personal.id == id)
  },
  getModelScheduleTimes:  (state) => {    
    return state.modelSchedule
  },
  getWorkplaceById: (state) => (id) => {
    return state.workplace.find(workplace => workplace.id == id)
  },
  getWorkplaceDoctorById: (state, getters) => (id) => {
    const newWorkplace = state.workplace.filter(item => item.doctor == id)
    return newWorkplace.map(item => {
      item.filialItem = getters.getFilialItemById(item.filial)
      item.specialityItem= getters.getSpecialityItemById(item.speciality)
      item.doctorItem = getters.getDoctorItemById(item.doctor);
      return item;
    })
  },
  getWorkplaceDoctorFilialById: (state) => (id) => {
    let array = state.workplace.filter(item => {
      return item.doctor == id && item.filial == 1
    })   
    return array.map(item=> {
      return {
        id: item.id,
        name: item.filialItem.name
      }
    })
  },
  getOnlyDate: (state) => {
    const newDt = state.modelSchedule.map(item => item.dt)
    const newDtSet = [...new Set(newDt)]
    return newDtSet
  },
  getWorkplaceDoctorAll: (state, getters) => {
    return state.workplace.map(item => {
      item.filialItem = getters.getFilialItemById(item.filial)
      item.specialityItem = getters.getSpecialityItemById(item.speciality)
      item.doctorItem = getters.getDoctorItemById(item.doctor);
      return item;
    })
  },
  getSpecialitiesPersonal: (state, getters) => (array) => {
    return array.map(item => {
      return item.specialityItem
    })
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};