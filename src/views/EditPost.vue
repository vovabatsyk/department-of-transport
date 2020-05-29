<template>
  <div align="center" class="pa-5">
    <Loader v-if="loading"/>
    <v-card v-else class="pa-5" max-width="600">
      <v-form @submit.prevent="submitHandler " ref="form">
        <v-text-field
                v-model.trim="title"
                id="name"
                label="Назва"
                :rules="rules"
                hide-details="auto">
        </v-text-field>
        <v-textarea
                v-model.trim="text"
                :rules="rules"
                hide-details="auto"
                filled
                label="Фабула"
                auto-grow
                class="mb-3"
        ></v-textarea>
        <v-btn @click.prevent="" class="mr-5" @click="$router.push('/post/' + post.id)">Назад</v-btn>

        <v-btn color="primary" type="submit">Зберегти</v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        metaInfo() {
            return {
                title: this.$title('Редагувати')
            }
        },
        data: () => ({
            rules: [
                value => !!value || 'Введіть текст',
                value => (value && value.length >= 3) || 'Мінімум 3 символа'
            ],
            id: '',
            loading: true,
            post: '',
            title: '',
            text: '',
            userId: ''
        }),
        async mounted() {
            this.id = this.$route.params.id
            this.post = await this.$store.dispatch('fetchRecordById', this.id)
            this.title = this.post.title
            this.text = this.post.text
            this.loading = false
        },

        methods: {
            ...mapActions(['updatePost']),
            async submitHandler() {
                try {
                    if (this.$refs.form.validate()) {
                        await this.updatePost({
                            title: this.title,
                            text: this.text,
                            date: new Date().toJSON(),
                            id: this.id
                        })
                        this.$router.push(`/post/${this.id}`)
                    }

                } catch (e) {
                    console.error(e)
                }
            }
        }
    }
</script>

