<template>
  <div>
    <Loader v-if="loading"/>
    <v-app id="inspire" v-else>
      <v-navigation-drawer
              v-model="drawer"
              app
              clipped
      >
        <v-list dense>
          <v-list-item link to="/posts">
            <v-list-item-action>
              <v-icon>mdi-comment-text-multiple</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Фабули</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/add">
            <v-list-item-action>
              <v-icon>mdi-plus</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Створити</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar
              app
              clipped-left
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
        <v-toolbar-title>{{name}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="$vuetify.theme.dark = !$vuetify.theme.dark">Тема</v-btn>
        <v-btn icon @click.prevent="exit">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-app-bar>

      <v-content>
        <v-container>
          <router-view></router-view>
          <router-link to="/add">
            <v-btn class="mx-2 add" fab dark color="indigo">
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </router-link>
        </v-container>
      </v-content>

    </v-app>
  </div>
</template>

<script>
    export default {
        props: {
            source: String
        },
        data: () => ({
            drawer: null,
            loading: true
        }),
        async mounted() {
            if (!this.$store.getters.info.name) {
                await this.$store.dispatch('fetchInfo')
            }
            this.loading = false
        },
        computed: {
            name() {
                return this.$store.getters.info.name
            }
        },
        created() {
            this.$vuetify.theme.dark = true
        },
        methods: {
            async exit() {
                await this.$store.dispatch('logout')
                this.$router.push('/login')
            }
        }
    }
</script>

<style scoped>
  .add {
    position: absolute;
    right: 2rem;
    bottom: 2rem;
  }
</style>
