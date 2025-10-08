<script setup>
import CourseServices from "../services/courseService";
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import avocadoImg from "../assets/avocado.png";
import CourseDetails from "../components/courseDetails.vue";
import UpdateCourse from "../components/updateCourse.vue";

const router = useRouter();

// Modal state
const dialog = ref(false);
const editDialog = ref(false);
const selectedCourse = ref(null);
const editedCourse = ref(null);

// state
const itemsPerPage = ref(10);
const headers = ref([
  { title: "Course Number", key: "course_number" },
  { title: "Course Name", key: "course_name" },
  { title: "Department", key: "dept" },
  { title: "Level", key: "level" },
  { title: "Credit Hours", key: "hours" },
  { title: "Actions", key: "actions", sortable: false },
]);

const serverItems = ref([]);
const loading = ref(true);
const totalItems = ref(0);

// search fields
const courseNumber = ref("");
const department = ref("");
const level = ref("");
const search = ref("");

// actions
const editCourse = (course) => {
  editedCourse.value = course;
  editDialog.value = true;
};

const viewCourse = (course) => {
  selectedCourse.value = course;
  dialog.value = true;
};

const deleteCourse = (course) => {
  CourseServices.delete(course.course_number).then(() => {
    loadItems({ page: 1, itemsPerPage: itemsPerPage.value, sortBy: [] });
  });
};

// backend fetch simulation
const loadItems = ({ page, itemsPerPage, sortBy }) => {
  loading.value = true;
  CourseServices.getAll()
    .then((response) => {
      let items = response.data;

      // filter locally
      if (courseNumber.value) {
        items = items.filter((c) =>
          c.course_number.toLowerCase().includes(courseNumber.value.toLowerCase())
        );
      }
      if (department.value) {
        items = items.filter((c) =>
          c.dept.toLowerCase().includes(department.value.toLowerCase())
        );
      }
      if (level.value) {
        items = items.filter((c) =>
          c.level.toLowerCase().includes(level.value.toLowerCase())
        );
      }

      // sort
      if (sortBy.length) {
        const { key, order } = sortBy[0];
        items.sort((a, b) => {
          if (a[key] < b[key]) return order === "desc" ? 1 : -1;
          if (a[key] > b[key]) return order === "desc" ? -1 : 1;
          return 0;
        });
      }

      totalItems.value = items.length;

      // paginate
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      serverItems.value = items.slice(start, end);

      loading.value = false;
    })
    .catch(() => {
      loading.value = false;
    });
};

onMounted(() => {
  loadItems({ page: 1, itemsPerPage: itemsPerPage.value, sortBy: [] });
});

// refresh table when search inputs change
watch([courseNumber, department, level], () => {
  search.value = String(Date.now());
});
</script>

<template>
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

      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="serverItems"
        :items-length="totalItems"
        :loading="loading"
        :search="search"
        item-value="course_number"
        @update:options="loadItems"
      >
        <!-- table footer with search inputs -->
        <template v-slot:tfoot>
          <tr>
            <td>
              <v-text-field
                v-model="courseNumber"
                density="compact"
                placeholder="Search course #..."
                hide-details
              />
            </td>
            <td>
              <v-text-field
                v-model="department"
                density="compact"
                placeholder="Search dept..."
                hide-details
              />
            </td>
            <td>
              <v-text-field
                v-model="level"
                density="compact"
                placeholder="Search level..."
                hide-details
              />
            </td>
          </tr>
        </template>

        <!-- actions column -->
        <template v-slot:item.actions="{ item }">
          <v-icon size="small" class="mx-2" @click="editCourse(item)">
            mdi-pencil
          </v-icon>
          <v-icon size="small" class="mx-2" @click="viewCourse(item)">
            mdi-eye
          </v-icon>
          <v-icon size="small" class="mx-2" @click="deleteCourse(item)">
            mdi-trash-can
          </v-icon>
        </template>
      </v-data-table-server>
    </v-card>

    <!-- Course Details Modal -->
    <CourseDetails v-model="dialog" :course="selectedCourse" />
    <UpdateCourse v-model="editDialog" :course="editedCourse" />
  </v-container>
</template>