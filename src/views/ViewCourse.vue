<script setup>
import CourseServices from "../services/courseService";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const course = ref({});
const message = ref("View and edit course details");

const props = defineProps({
  id: {
    required: true,
  },
});

const retrieveCourse = () => {
  CourseServices.get(props.id)
    .then((response) => {
      course.value = response.data;
    })
    .catch((e) => {
      message.value = e.response?.data?.message || "Error retrieving course";
    });
};

const editCourse = () => {
  router.push({ name: "editCourse", params: { id: props.id } });
};

onMounted(() => {
  retrieveCourse();
});
</script>

<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Course View</v-toolbar-title>
      </v-toolbar>
      <br />
      <v-card>
        <v-card-title>
          {{ course.course_name }} ({{ course.course_number }})
          <v-btn class="mx-2" color="primary" @click="editCourse">Edit</v-btn>
        </v-card-title>
        <v-card-text>
          <b>{{ message }}</b>
          <v-list>
            <v-list-item><strong>Department:</strong> {{ course.dept }}</v-list-item>
            <v-list-item><strong>Level:</strong> {{ course.level }}</v-list-item>
            <v-list-item><strong>Credit Hours:</strong> {{ course.hours }}</v-list-item>
            <v-list-item><strong>Description:</strong> {{ course.course_description }}</v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>
