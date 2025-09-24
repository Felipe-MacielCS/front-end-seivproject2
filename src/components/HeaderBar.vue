<template>
  <v-app-bar color="primary" density="comfortable" flat>
    <v-container fluid class="d-flex align-center ga-3">
      <v-img src="/src/assets/avocado.png" alt="custom" max-width="28" max-height="28" />
      <span class="text-h6 ml-2">Course list</span>

        <v-combobox
        label="Major"
        :items="['CS', 'MED', 'ADMIN']"
        density="compact"
        variant="tonal"
        hide-details
        style="max-width: 120px"
        ></v-combobox>

        <v-combobox
        label="Level"
        :items="['CS', 'MED', 'ADMIN']"
        density="compact"
        variant="tonal"
        hide-details
        style="max-width: 120px"
        ></v-combobox>

        <v-combobox
        label="Credits"
        :items="['CS', 'MED', 'ADMIN']"
        density="compact"
        variant="tonal"
        hide-details
        style="max-width: 120px"
        ></v-combobox>

        <v-btn icon variant="tonal" rounded="lg" class="ml-2">
        <v-icon>mdi-plus</v-icon>
        </v-btn>

        <v-btn icon variant="tonal" rounded="lg" class="ml-2">
        <v-icon>mdi-download</v-icon>
        </v-btn>

        <v-spacer />

        <v-text-field
        label="Search courses"
        prepend-inner-icon="mdi-magnify"
        variant="tonal"
        density="comfortable"
        hide-details
        clearable
        rounded="lg"
        style="max-width: 360px"
        />

    </v-container>
  </v-app-bar>
</template>

<script setup>

</script>