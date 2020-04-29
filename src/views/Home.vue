<template>
    <div>
    <Loader v-if="loading"/>
    <v-card v-else
            class="mx-auto mt-5"
            max-width="800"
            tile

    >
      <v-list shaped>
        <v-subheader>Фабули</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item
                  v-for="(post, i) in posts"
                  :key="i"
                  @click="$router.push('/post/' + post.id)"
          >
            <v-list-item-icon>
              <v-icon v-text="i + 1"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{post.title}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>

    export default {
        name: 'Home',
        data: () => ({
            loading: true,
            posts: [],
            user: ''
        }),
        async mounted() {
            this.posts = await this.$store.dispatch('fetchPosts')
            this.loading = false
        }
    }
</script>
