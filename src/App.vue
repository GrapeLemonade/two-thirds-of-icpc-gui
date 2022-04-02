<template>
  <v-app>
    <v-main id="main">
      <v-container fluid class="fill-height">
        <v-row class="align-center justify-center">
          <v-col cols="4">
            <v-card class="elevation-6">
              <v-card-text>
                debug
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    //
  }),
};
</script>

<style lang="css">
html {
  overflow: hidden !important;
}
#main:before {
  content: "";
  background: url('assets/background.jpg') no-repeat center center fixed !important;
  background-size: cover !important;
  opacity: 0.3;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
</style>
