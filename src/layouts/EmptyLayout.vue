<template>
  <v-app class="inspire">

    <v-content>
      <v-container
              class="fill-height"
              fluid
      >
        <v-row
                align="center"
                justify="center"
        >
          <router-view></router-view>
        </v-row>

        <v-snackbar
                v-model="snackbar"
                :timeout="timeout"
        >
          {{ text }}
          <v-btn
                  color="error"
                  text
                  @click="snackbar = false"
          >
            Закрити
          </v-btn>
        </v-snackbar>
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
    import messages from '@/utils/messages'

    export default {
        props: {
            source: String
        },
        data: () => ({
            snackbar: false,
            text: '',
            timeout: 4000
        }),
        created() {
            this.$vuetify.theme.dark = true
        },
        computed: {
            error() {
                return this.$store.getters.error
            }
        },
        watch: {
            error(fbError) {
                console.log(fbError)
                this.text = messages[fbError.code] || 'Виникла невідома помилка'
                this.snackbar = true
            }
        }
    }
</script>


