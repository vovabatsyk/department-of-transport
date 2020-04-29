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
        <v-btn icon class="mr-7">
          <v-icon>mdi-content-copy</v-icon>
        </v-btn>
        </v-row>

      <v-card-title>

        <span class="title font-weight-bold ml-5">{{post.title}}</span>

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
            <v-btn class="mr-5" color="primary" @click="editPost">змінити</v-btn>
            <v-btn color="error" @click.stop="dialog = true">видалит</v-btn>
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

    </v-card>
  </div>
</template>

<script>
    export default {
        data: () => ({
            dialog: false,
            snackbar: false,
            text: 'My timeout is set to 2000.',
            timeout: 2000,
            post: '',
            loading: true,
            id: ''
            // postId: ''

        }),
        computed: {
            name() {
                return this.$store.getters.info.name
            }
        },
        async mounted() {
            this.id = this.$route.params.id
            this.post = await this.$store.dispatch('fetchRecordById', this.id)
            this.loading = false
        },
        methods: {
            editPost() {

                 this.$router.push(`/post/edit/${this.id}`)
            },
            deletePost() {
                this.dialog = false
                this.$router.push('/')
            }
        }
    }
</script>
