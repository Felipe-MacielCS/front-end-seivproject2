import { createRouter, createWebHistory } from "vue-router";
import ViewCourse from "./views/ViewCourse.vue";
import CoursesList from "./views/CourseList.vue";
;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: "/",
      name: "courses",
      component: CoursesList,
    },
    {
      path: "/view/:id",
      name: "view",
      component: ViewCourse,
      props: true,
    },
  ],
});

export default router;