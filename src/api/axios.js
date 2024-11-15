import axios from 'axios'

const url = "https://medsystem-test11.medlock.ru/";

const instance = axios.create({
    baseURL: url,
    headers: { 
        "Content-Type": "application/json",
        "ActorToken": 'euDwKkTztYZvqCLRNQUvzVnRy7KqwDsk',
        "Authorization": "Bearer 2ZJKCQw72wCXstNiGtEMgvdFWsAZQw",   
    }
});

export const personalsAPI = {
    deletePersonal(id) {
        return instance.delete(`/staff/${id}/`);
    },
    addPersonal (newPersonal) {
        return instance.post('/staff/', newPersonal);
    },
    updatePersonal (id, newPersonal) {
        return instance.patch(`/staff/${id}/`, newPersonal);
    },
    getPersonal (){
        return instance.get('/staff/');
    }
};

export const buildingAPI = {
    getBuilding () {
        return instance.get('/building');
    }
}

export const specialitiesAPI = {
    getSpecialities () {
        return instance.get('/get_list_specialities/');
    }
}

export const workplaceAPI = {
    getWorkplace () {
        return instance.get('/workplace/');
    },
    postWorkplace (workplace) {        
        return instance.post('/workplace/', workplace);
    },
    patchWorkplace (id, workplace) {
        return instance.patch(`/workplace/${id}/`, workplace);
    },
    deleteWorkplace (id) {
        return instance.delete(`/workplace/${id}/`);
    }
}

export const modelScheduleAPI = {
    getModelSchedule(doctorId, filialId, dt) {
        return instance.get('/model_schedule/', {
            params: {
                doctor_id: doctorId,
                filial_id: 1,
            }
        });
    },
    postModelSchedule(modelSchedule) {
        return instance.post('/model_schedule/', modelSchedule);
    },
    patchModelSchedule (id, modelSchedule) {
        return instance.patch(`/model_schedule/${id}/`, modelSchedule);
    },
    deleteModelSchedule (id) {
        return instance.delete(`/model_schedule/${id}/`);
    }
}

  


