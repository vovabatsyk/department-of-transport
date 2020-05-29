<template>
  <div>
    <v-row>
      <img src="../assets/LMR_logo.png">
    </v-row>
    <v-row justify="center">
      <v-btn class="ma-2" color="blue darken-4" @click="$router.push('/posts')" dark>Ввійти
        <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
      </v-btn>
    </v-row>
  </div>
</template>
<style scoped>
  img {
    width: 100%;
    max-width: 320px;
  }
</style>

