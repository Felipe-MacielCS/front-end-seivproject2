<script setup>
import CourseServices from "../services/courseService";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import avocadoImg from "../assets/avocado.png"; 
import CourseDialog from "../components/courseDetails.vue"
import CourseDetails from "../components/courseDetails.vue";

const router = useRouter();
const courses = ref([]);
const dialog = ref(false)
const selectedCourse = ref(null)


const editCourse = (course) => {
  router.push({ name: "editCourse", params: { id: course.course_number } });
};

const viewCourse = (course) => {
  selectedCourse.value = course
  dialog.value = true
};

const deleteCourse = (course) => {
  CourseServices.delete(course.course_number)
    .then(() => {
      retrieveCourses();
    })
    .catch((e) => {
      message.value = e.response?.data?.message || "Error deleting course.";
    });
};

const retrieveCourses = () => {
  CourseServices.getAll()
    .then((response) => {
      courses.value = response.data;
    })
    .catch((e) => {
      message.value = e.response?.data?.message || "Error retrieving courses.";
    });
};

onMounted(() => {
  retrieveCourses();
});
</script>

<template>
  <div>
    <v-container>
      <v-card>
        <v-card-title class="d-flex align-center ga-3">
            <v-img
                :src="avocadoImg"
                alt="Avocado Logo"
                max-width="40"
                max-height="40"
                cover
            />
            <span class="text-h6">Courses</span>
        </v-card-title>
        <v-card-text>
          
        </v-card-text>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">Course Number</th>
              <th class="text-left">Course Name</th>
              <th class="text-left">Department</th>
              <th class="text-left">Level</th>
              <th class="text-left">Credit Hours</th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="course in courses" :key="course.course_number">
              <td>{{ course.course_number }}</td>
              <td>{{ course.course_name }}</td>
              <td>{{ course.dept }}</td>
              <td>{{ course.level }}</td>
              <td>{{ course.hours }}</td>
              <td>
                <v-icon small class="mx-2" @click="editCourse(course)">
                  mdi-pencil
                </v-icon>
                <v-icon small class="mx-2" @click="viewCourse(course)">
                  mdi-eye
                </v-icon>
                <v-icon small class="mx-2" @click="deleteCourse(course)">
                  mdi-trash-can
                </v-icon>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card>

      <CourseDetails v-model="dialog" :course="selectedCourse" />
    </v-container>
  </div>
</template>
