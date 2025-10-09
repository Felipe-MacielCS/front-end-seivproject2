<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  course: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['update:modelValue', 'confirm']);

const dialog = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  }
});

const handleConfirm = () => {
  emit('confirm');
};

const handleCancel = () => {
  dialog.value = false;
};
</script>

<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title class="text-h5">
        Confirm Delete
      </v-card-title>

      <v-card-text>
        <div v-if="course">
          <p>Are you sure you want to delete this course?</p>
          <div class="mt-4">
            <strong>Course Name:</strong> {{ course.course_name }}<br>
            <strong>Course Number:</strong> {{ course.course_number}}
          </div>
          <p class="mt-4 text-error">
            This action is irreversible.
          </p>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="grey-darken-1"
          variant="text"
          @click="handleCancel"
        >
          Cancel
        </v-btn>
        <v-btn
          color="error"
          variant="text"
          @click="handleConfirm"
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
