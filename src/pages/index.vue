<template>
  <div>
    <v-app-bar scroll-behavior="hide elevate" scroll-threshold="80">
      <v-app-bar-title>Bubbles of People</v-app-bar-title>
      <template v-slot:append>
        <v-btn icon="mdi-magnify"></v-btn>
      </template>
    </v-app-bar>

    <v-card class="mx-auto my-2" max-width="450">
      <v-list-item
        key="file"
        title="王思澄"
      >
        <template v-slot:prepend>
          <v-avatar color="file.color">
          </v-avatar>
        </template>

        <template v-slot:append>
          <v-btn
            color="grey-lighten-1"
            icon="mdi-information"
            variant="text"
          ></v-btn>
        </template>
      </v-list-item>
    </v-card>
  </div>
</template>

<script setup>
import { getHumanList } from '@/impl/people/human';

getHumanList((json) => {
  console.log(json)
})
</script>
