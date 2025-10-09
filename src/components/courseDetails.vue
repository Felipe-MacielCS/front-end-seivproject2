<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  course: Object
})

const emit = defineEmits(['update:modelValue'])

const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>

<template>
  <v-dialog v-model="dialogVisible" max-width="500">
    <v-card>
      <v-card-title class="text-h6">
        {{ course?.course_name || "Course Details" }}
      </v-card-title>

      <v-card-text>
        <p><strong>Course Number:</strong> {{ course?.course_number }}</p>
        <p><strong>Department:</strong> {{ course?.dept }}</p>
        <p><strong>Level:</strong> {{ course?.level }}</p>
        <p><strong>Credit Hours:</strong> {{ course?.hours }}</p>
        <p><strong>Description:</strong> {{ course?.course_description }}</p>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialogVisible = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>