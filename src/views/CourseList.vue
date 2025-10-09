<script setup>
import CourseServices from "../services/courseService";
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import avocadoImg from "../assets/avocado.png";
import CourseDetails from "../components/courseDetails.vue";
import DeleteDialog from "../components/courseDelete.vue";
import UpdateCourse from "../components/updateCourse.vue";
import AddCourse from "../components/addCourse.vue";

const router = useRouter();

// Modal state
const dialog = ref(false);
const editDialog = ref(false);
const addDialog = ref(false);
const selectedCourse = ref(null);
const editedCourse = ref(null);

// Delete dialog state
const deleteDialog = ref(false);
const courseToDelete = ref(null);

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
const courseName = ref("");
const department = ref("");
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

const addedCourse = () => {
  addDialog.value = true;
};

const deleteCourse = (item) => {
  const course = item.raw || item;
  courseToDelete.value = course;
  deleteDialog.value = true;
};

const confirmDelete = () => {
  if (!courseToDelete.value) return;

  CourseServices.delete(courseToDelete.value.course_number)
    .then(() => {
      deleteDialog.value = false;
      courseToDelete.value = null;
      loadItems({ page: 1, itemsPerPage: itemsPerPage.value, sortBy: [] });
    })
    .catch((error) => {
      console.error("Error deleting course:", error);
      console.error("Error response:", error.response?.data);

      const errorMessage = error.response?.data?.message
        || error.response?.data?.error
        || error.message
        || "Failed to delete course. Please try again.";

      alert(errorMessage);
    });
};

// Add save handler for new courses
const saveNewCourse = (newCourse) => {

  CourseServices.create(newCourse)

    .then(() => {
      addDialog.value = false;
      loadItems({ page: 1, itemsPerPage: itemsPerPage.value, sortBy: [] });
    })
    .catch((error) => {
      console.error("Error creating course:", error);
      const errorMessage = error.response?.data?.message
        || error.response?.data?.error
        || error.message
        || "Failed to create course. Please try again.";
      alert(errorMessage);
    });
};

// Add save handler for updating courses
const saveCourse = (updatedCourse) => {
  CourseServices.update(updatedCourse.course_number, updatedCourse)
    .then(() => {
      editDialog.value = false;
      loadItems({ page: 1, itemsPerPage: itemsPerPage.value, sortBy: [] });
    })
    .catch((error) => {
      console.error("Error updating course:", error);
    });
};

// backend fetch simulation
const loadItems = ({ page, itemsPerPage, sortBy }) => {
  loading.value = true;
  CourseServices.getAll()
    .then((response) => {
      let items = response.data;

      // filter by course name
      if (courseName.value) {
        items = items.filter((c) =>
          c.course_name.toLowerCase().includes(courseName.value.toLowerCase())
        );
      }

      // filter by department
      if (department.value) {
        items = items.filter((c) =>
          c.dept.toLowerCase().includes(department.value.toLowerCase())
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
watch([courseName, department], () => {
  search.value = String(Date.now());
});
</script>

<template>
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
        <v-btn icon @click="addedCourse">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
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
        <template v-slot:thead>
          <tr>
            <td colspan="2">
              <v-text-field
                v-model="courseName"
                density="compact"
                placeholder="Search course name..."
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
            <td colspan="3"></td>
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

    <!-- Delete Confirmation Dialog -->
    <DeleteDialog
      v-model="deleteDialog"
      :course="courseToDelete"
      @confirm="confirmDelete"
    />
    <UpdateCourse v-model="editDialog" :course="editedCourse" @save="saveCourse" />

    <!-- Add Course Dialog -->
    <AddCourse v-model="addDialog" @save="saveNewCourse" />

</template>
