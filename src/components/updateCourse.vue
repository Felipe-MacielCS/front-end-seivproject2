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

const rules = {
  required: (v) => !!v || 'This field is required',
  number: (v) => !isNaN(Number(v)) || 'Must be a number',
  positive: (v) => Number(v) > 0 || 'Must be greater than 0',
  length: (min) => (v) =>
    (v && v.length >= min) || `Must be at least ${min} characters`
}


function saveChanges() {
  
 if (!isValid.value) return
  emit('save', editedCourse.value)
  dialogVisible.value = false
}

const isValid = computed(() => {
  return (
    editedCourse.value.course_name &&
    editedCourse.value.course_number &&
    editedCourse.value.dept &&
    editedCourse.value.level &&
    editedCourse.value.hours &&
    editedCourse.value.course_description
  )
})
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
            :rules="[rules.required, rules.length(3)]"
            required
          ></v-text-field>

          <v-text-field
            v-model="editedCourse.course_number"
            label="Course Number"
            :rules="[rules.required, rules.number]"
            required
          ></v-text-field>

          <v-text-field
            v-model="editedCourse.dept"
            label="Department"
            :rules="[rules.required, rules.length(2)]"
            required
          ></v-text-field>

          <v-text-field
            v-model="editedCourse.level"
            label="Level"
            :rules="[rules.required, rules.number, rules.positive]"
            required
          ></v-text-field>

          <v-text-field
            v-model="editedCourse.hours"
            label="Credit Hours"
            :rules="[rules.required, rules.number, rules.positive]"
            required
          ></v-text-field>

          <v-textarea
            v-model="editedCourse.course_description"
            label="Description"
            :rules="[rules.required]"
            required
          ></v-textarea>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialogVisible = false">Cancel</v-btn>
        <v-btn color="primary" :disabled="!isValid" @click="saveCourse">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
