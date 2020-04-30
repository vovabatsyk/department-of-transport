import firebase from 'firebase/app'

export default {
    state: {
        post: {}
    },
    mutations: {
        setPost(state, post) {
            state.post = post
        }
    },
    actions: {
        async createPost({dispatch, commit}, post) {
            try {
                return await firebase.database().ref(`/posts`).push(post)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchPosts({dispatch, commit}) {
            try {
                const posts =
                    (
                        await firebase
                            .database()
                            .ref(`/posts`)
                            .once('value')
                    ).val() || {}
                return Object.keys(posts).map(key => ({...posts[key], id: key}))
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchRecordById({dispatch, commit}, id) {
            try {
                const record =
                    (
                        await firebase
                            .database()
                            .ref('/posts')
                            .child(id)
                            .once('value')
                    ).val() || {}
                return {...record, id}
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updatePost({dispatch, commit, getters}, {title, text, id}) {
            try {
                // const updateData = { ...getters.post, ...toUpdate }
                await firebase
                    .database()
                    .ref(`/posts/${id}`)
                    .update({title, text})
                // commit('setPost', updateData)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async deletePost({commit}, id) {
            try {
                const record =

                    await firebase
                        .database()
                        .ref(`/post`).child(id).remove()

            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    },
    getters: {
        post: s => s.post
    }
}
