<template>
  <v-card elevation="12" min-width="320">
    <v-form
            @submit.prevent="submitHandler"
            ref="form"
            v-model="valid"
            lazy-validation
            align="center"
            class="pa-5"

    >
      <v-text-field
              v-model.trim="email"
              :error-messages="emailErrors"
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
              label="E-mail"
              required
      ></v-text-field>


      <v-text-field
              v-model.trim="password"
              :error-messages="passwordErrors"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              label="Пароль"
              counter
              @click:append="show1 = !show1"
              required
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
      ></v-text-field>

      <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              type="submit"
      >
        Ввійти
      </v-btn>
      <p class="pt-2"><small>Нема акаунта?
        <router-link to="/register">Зареєструвати</router-link>
      </small></p>

    </v-form>
  </v-card>
</template>

<script>
    import {validationMixin} from 'vuelidate'
    import {required, minLength, email} from 'vuelidate/lib/validators'

    export default {
        metaInfo() {
            return {
                title: this.$title('Вхід')
            }
        },
        mixins: [validationMixin],

        validations: {
            email: {required, email},
            password: {required, minLength: minLength(6)}

        },
        data: () => ({
            valid: true,
            email: '',
            show1: false,
            password: ''
        }),
        computed: {
            passwordErrors() {
                const errors = []
                if (!this.$v.password.$dirty) return errors
                !this.$v.password.minLength && errors.push('Пароль повинен мати не менше 6 символів')
                !this.$v.password.required && errors.push('Введіть пароль')
                return errors
            },
            emailErrors() {
                const errors = []
                if (!this.$v.email.$dirty) return errors
                !this.$v.email.email && errors.push('Введіть правельний e-mail')
                !this.$v.email.required && errors.push('E-mail не може бути пустим')
                return errors
            }
        },
        methods: {
            async submitHandler() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }
                const formData = {
                    email: this.email,
                    password: this.password
                }
                try {
                    await this.$store.dispatch('login', formData)
                    this.$router.push('/posts')

                } catch (e) {
                }
            }
        }
    }
</script>
