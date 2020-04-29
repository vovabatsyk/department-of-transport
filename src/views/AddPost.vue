<template>
  <div align="center" class="pa-5">
    <v-form @submit.prevent="submitHandler">
    <v-card class="pa-5" max-width="600">
        <v-text-field
                v-model="title"
                label="Назва"
                :rules="titleRules"
        ></v-text-field>
        <v-textarea
                v-model="text"
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
                    await this.$store.dispatch('createPost', {
                        title: this.title,
                        text: this.text,
                        date: new Date().toJSON(),
                        userId: this.userId
                    })
                    this.title = ''
                    this.text = ''
                } catch (e) {
                }
            }
        }
    }
</script>

