<template>
  <v-app>
    <v-main id="main">
      <v-container fluid class="fill-height">
        <v-row class="align-center justify-center" style="height: 100%">
          <v-col cols="6" style="height: 100%" class="pl-6">
            <div class="pb-3" style="height: 40%">
              <v-card class="elevation-6" style="height: 100%">
                <v-container fluid class="fill-height py-0">
                  <v-row class="align-center justify-center" style="height: 100%">
                    <v-col class="pa-0" cols="4" style="height: 100%">
                      <v-list dark class="rounded-l pa-0 green" style="height: 100%">
                        <v-list-item-group mandatory active-class="indicator" v-model="selectedMode" style="height: 100%">
                          <v-list-item
                              v-for="(item, i) in modes"
                              :key="i"
                              style="height: 25%"
                          >
                            <v-list-item-content>
                              <v-list-item-title class="text-center">
                                {{ item }}
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list-item-group>
                      </v-list>
                    </v-col>
                    <v-col cols="8">

                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </div>
            <div class="pt-3" style="height: 60%">
              <v-card class="elevation-6" style="height: 100%">
                <v-card-text>
                  debug
                </v-card-text>
              </v-card>
            </div>
          </v-col>
          <v-col cols="6" style="height: 100%" class="pr-6">
            <v-card class="elevation-6" style="height: 100%">
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
    modes: ['单词链数量', '单词数最多', '首字母不同', '字母数最多'],
    selectedMode: 0,
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
