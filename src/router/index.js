import Main from "../pages/Main.vue";
import PersonalDetail from "../pages/PersonalDetail.vue";
import WorkplacePage from "../pages/WorkplacePage.vue";

export default [
  {path: '/', name: 'main', component: Main},
  {path: '/personal/:id', name: 'personal', component: PersonalDetail, props: true},
  {path: '/workplace', name: 'workplace', component: WorkplacePage}
]
