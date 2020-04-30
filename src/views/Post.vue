<template>
  <div>
    <Loader v-if="loading"/>
    <v-card v-else
            class="mx-auto"
            max-width="800"

    >
      <v-row justify="space-between">
        <v-btn icon @click="$router.push('/posts')" class="ml-7">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-btn icon class="mr-7" v-clipboard:copy="post.text"  v-clipboard:success="onCopy"
               v-clipboard:error="onError">
          <v-icon>mdi-content-copy</v-icon>
        </v-btn>
      </v-row>

      <v-card-title>

        <span class="title font-weight-bold">{{post.title}}</span>

      </v-card-title>

      <v-card-text class="font-weight-medium text-justify">
        {{post.text}}
        <p><small>{{post.date}}</small></p>

      </v-card-text>

      <v-card-actions>
        <v-list-item class="grow">

          <v-row
                  align="center"
                  justify="end"
          >
            <v-btn class="mr-5" v-show="show" color="primary" @click="editPost">змінити</v-btn>

            <v-btn v-show="show" disabled color="error" @click.stop="dialog = true">видалити</v-btn>
          </v-row>
        </v-list-item>
      </v-card-actions>

      <v-dialog
              v-model="dialog"
              max-width="290"
      >
        <v-card>
          <v-card-title class="headline">Видалити фабулу?</v-card-title>


          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
                    color="blue darken-1"
                    text
                    @click="dialog = false"
            >
              Ні
            </v-btn>

            <v-btn
                    color="red darken-1"
                    text
                    @click="deletePost"
            >
              Так
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar
              v-model="snackbar"
              :timeout="timeout"
      >
        {{message}}
        <v-btn
                color="blue"
                text
                @click="snackbar = false"
        >
          Закрити
        </v-btn>
      </v-snackbar>
    </v-card>
  </div>
</template>

<script>
    export default {
        data: () => ({
            dialog: false,
            snackbar: false,
            timeout: 2000,
            post: '',
            loading: true,
            id: '',
            show: false,
            userId: '',
            owner: '',
            message: ''

        }),
        computed: {
            name() {
                return this.$store.getters.info.name
            }
        },
        async mounted() {
            this.id = this.$route.params.id
            this.post = await this.$store.dispatch('fetchRecordById', this.id)
            this.owner = await this.$store.dispatch('getUid')
            this.loading = false
            if (this.post.userId === this.owner || this.owner === 'kDiFk7r2qfcs3leH23bnQg6AYzN2') {
                this.show = true
            }
        },
        methods: {
            onCopy(){
                this.message = 'Скопійовано'
                this.snackbar = true
            },
            onError(){
                this.message = 'Виникла невідома помилка'
                this.snackbar = true
            },
            editPost() {

                this.$router.push(`/post/edit/${this.id}`)
            },
            async deletePost() {
                try {
                    await this.$store.dispatch('deletePost', this.id)
                    this.dialog = false

                    this.$router.push('/posts')
                    console.log(this.id)
                } catch (e) {
                    console.error(e)
                }

            }
        }
    }
</script>
