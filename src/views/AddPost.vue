<template>
  <div align="center" class="pa-5">
    <v-form @submit.prevent="submitHandler" ref="form">
    <v-card class="pa-5" max-width="600">
        <v-text-field
                v-model.trim="title"
                label="Назва"
                :rules="titleRules"
        ></v-text-field>
        <v-textarea
                v-model.trim="text"
                :rules="textRules"
                filled
                label="Фабула"
                auto-grow
        ></v-textarea>
        <v-btn color="primary" type="submit">Створити</v-btn>
    </v-card>
  </v-form>

  </div>
</template>

<script>
    export default {
        metaInfo() {
            return {
                title: this.$title('Додати')
            }
        },
        data: () => ({
            title: '',
            titleRules: [
                value => !!value || 'Введіть текст',
                value => (value && value.length >= 3) || 'Мінімум 3 символа'
            ],
            text: '',
            textRules: [
                value => !!value || 'Введіть текст',
                value => (value && value.length >= 3) || 'Мінімум 3 символа'
            ],
            userId: ''
        }),
        async mounted(){
            this.userId  = await this.$store.dispatch('getUid')
        },
        methods: {
            async submitHandler() {
                try {
                    if (this.$refs.form.validate()) {
                        await this.$store.dispatch('createPost', {
                            title: this.title,
                            text: this.text,
                            date: new Date().toJSON(),
                            userId: this.userId
                        })
                        this.$router.push('/posts')
                    }

                } catch (e) {
                }
            }
        }
    }
</script>

