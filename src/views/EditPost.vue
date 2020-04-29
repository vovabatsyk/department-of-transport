<template>
  <div align="center" class="pa-5">
    <Loader v-if="loading"/>
    <v-card v-else class="pa-5" max-width="600">
      <v-form @submit.prevent="submitHandler">
        <v-text-field
                v-model="title"
                id="name"
                ref="newTitle"
                label="Назва"
                :rules="rules"
                hide-details="auto">
        </v-text-field>
        <v-textarea
                v-model="text"
                :rules="rules"
                hide-details="auto"
                filled
                label="Фабула"
                auto-grow
        ></v-textarea>
        <v-btn @click.prevent="" class="mr-5" @click="$router.push('/post/' + post.id)">Назад</v-btn>

        <v-btn color="primary" type="submit">Зберегти</v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
    export default {
        data: () => ({
            rules: [
                value => !!value || 'Введіть текст',
                value => (value && value.length >= 3) || 'Мінімум 3 символа'
            ],
            id: '',
            post: '',
            loading: true,
            title: '',
            text: ''
        }),
        async mounted() {
            this.id = this.$route.params.id
            this.post = await this.$store.dispatch('fetchRecordById', this.id)
            this.title = this.post.title
            this.text = this.post.text
            this.loading = false
        },
        methods: {
            async submitHandler() {
               try {
                   const formData = {
                       newTitle: this.title,
                       newText: this.text,
                       id: this.post.id
                   }
                   console.log(formData)
                   await this.$store.dispatch('updatePost', formData)
               } catch (e) {
                   console.error(e)
               }
            }
        }
    }
</script>

