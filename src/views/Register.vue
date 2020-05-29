<template>
  <v-card elevation="12" min-width="320">
    <v-form @submit.prevent="submitHandler"
            ref="form"
            v-model="valid"
            lazy-validation
            align="center"
            class="pa-5"

    >
      <v-text-field
              v-model.trim="email"
              :rules="emailRules"
              label="E-mail"
              required
      ></v-text-field>

      <v-text-field
              v-model.trim="name"
              :counter="10"
              :rules="nameRules"
              label="Ім'я"
              required
      ></v-text-field>


      <v-text-field
              v-model.trim="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passwordRules"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Пароль"
              hint="Мінімум 6 символів"
              counter
              @click:append="show1 = !show1"
      ></v-text-field>


      <v-btn
              type="submit"
              :disabled="!valid"
              color="primary"
              class="mr-4"
      >
        Зареєструватися
      </v-btn>
      <p class="pt-2"><small>Зареєстрований?
        <router-link to="/login">Увійти</router-link>
      </small></p>

    </v-form>
  </v-card>
</template>

<script>
    export default {
        metaInfo() {
            return {
                title: this.$title('Реєстрація')
            }
        },
        data: () => ({
            valid: true,
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
            ],
            name: '',
            nameRules: [
                v => !!v || 'Заповніть',
                v => (v && v.length <= 10) || 'Максимум 10 символів'
            ],
            show1: false,
            password: '',
            passwordRules: [
                value => !!value || 'Заповніть.',
                v => v.length >= 6 || 'Мінімум 6 символів'
            ]
        }),

        methods: {
            async submitHandler() {
                try {
                    if (this.$refs.form.validate()) {
                        const formData = {
                            email: this.email,
                            password: this.password,
                            name: this.name
                        }
                        await this.$store.dispatch('register', formData)
                        this.$router.push('/posts')
                    }
                } catch (e) {
                }

            }
        }
    }
</script>
