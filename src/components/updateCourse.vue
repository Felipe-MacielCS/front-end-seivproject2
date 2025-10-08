<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  modelValue: Boolean,  
  course: Object         
})

const emit = defineEmits(['update:modelValue', 'save'])

const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const editedCourse = ref({
  course_name: '',
  course_number: '',
  dept: '',
  level: '',
  hours: '',
  course_description: ''
})


watch(
  () => props.course,
  (newCourse) => {
    if (newCourse) {
      editedCourse.value = { ...newCourse }
    }
  },
  { immediate: true }
)


function saveChanges() {
  
  if (
    !editedCourse.value.course_name ||
    !editedCourse.value.course_number ||
    !editedCourse.value.dept ||
    !editedCourse.value.level ||
    !editedCourse.value.hours
  ) {
    alert('Please fill out all required fields.')
    return
  }

  emit('save', { ...editedCourse.value })
  dialogVisible.value = false
}
</script>

<template>
  <v-dialog v-model="dialogVisible" max-width="600">
    <v-card>
      <v-card-title class="text-h6">Edit Course</v-card-title>

      <v-card-text>
        <v-form>
          <v-text-field
            v-model="editedCourse.course_name"
            label="Course Name"
            required
          ></v-text-field>

          <v-text-field
            v-model="editedCourse.course_number"
            label="Course Number"
            required
          ></v-text-field>

          <v-text-field
            v-model="editedCourse.dept"
            label="Department"
            required
          ></v-text-field>

          <v-text-field
            v-model="editedCourse.level"
            label="Level"
            required
          ></v-text-field>

          <v-text-field
            v-model="editedCourse.hours"
            label="Credit Hours"
            type="number"
            required
          ></v-text-field>

          <v-textarea
            v-model="editedCourse.course_description"
            label="Description"
          ></v-textarea>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialogVisible = false">Cancel</v-btn>
        <v-btn color="primary" @click="saveChanges">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
