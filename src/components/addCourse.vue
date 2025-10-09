<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue', 'save'])

const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

function emptyCourse() {
  return {
    course_name: '',
    course_number: '',
    dept: '',
    level: '',
    hours: '',
    course_description: ''
  }
}

const newCourse = ref(emptyCourse())

const form = ref(null)

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      newCourse.value = emptyCourse()
      if (form.value && typeof form.value.resetValidation === 'function') {
        form.value.resetValidation()
      }
    }
  },
  { immediate: true }
)

const rules = {
  required: (v) => !!v || 'This field is required',
  number: (v) => !isNaN(Number(v)) || 'Must be a number',
  nonNegative: (v) => Number(v) >= 0 || 'Must be 0 or greater',
  length: (min) => (v) =>
    (v && v.length >= min) || `Must be at least ${min} characters`
}

function saveNewCourse() {
  if (!isValid.value) return
  emit('save', newCourse.value)
  dialogVisible.value = false
}

function cancelAdd() {
  newCourse.value = emptyCourse()
  dialogVisible.value = false
}

const isValid = computed(() => {
  return (
    newCourse.value.course_name &&
    newCourse.value.course_number &&
    newCourse.value.dept &&
    newCourse.value.level !== null &&
    newCourse.value.level !== '' &&
    newCourse.value.hours !== null &&
    newCourse.value.hours !== ''
  )
})
</script>

<template>
  <v-dialog v-model="dialogVisible" max-width="600">
    <v-card>
      <v-card-title class="text-h6">Add New Course</v-card-title>

      <v-card-text>
        <v-form ref="form">
          <v-text-field
            v-model="newCourse.course_name"
            label="Course Name"
            :rules="[rules.required, rules.length(3)]"
            required
          ></v-text-field>

          <v-text-field
            v-model="newCourse.course_number"
            label="Course Number"
            :rules="[rules.required]"
            required
          ></v-text-field>

          <v-text-field
            v-model="newCourse.dept"
            label="Department"
            :rules="[rules.required, rules.length(2)]"
            required
          ></v-text-field>

          <v-text-field
            v-model="newCourse.level"
            label="Level"
            :rules="[rules.required, rules.number]"
            required
          ></v-text-field>

          <v-text-field
            v-model="newCourse.hours"
            label="Credit Hours"
            :rules="[rules.required, rules.number]"
            required
          ></v-text-field>

          <v-textarea
            v-model="newCourse.course_description"
            label="Description"
          ></v-textarea>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="cancelAdd">Cancel</v-btn>
        <v-btn color="primary" :disabled="!isValid" @click="saveNewCourse">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
