import firebase from 'firebase/app'

export default {
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
                return Object.keys(posts).map(key => ({ ...posts[key], id: key }))
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchRecordById({ dispatch, commit }, id) {
            try {
                const record =
                    (
                        await firebase
                            .database()
                            .ref('/posts')
                            .child(id)
                            .once('value')
                    ).val() || {}
                return { ...record, id }
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updatePost({ commit, dispatch }, { title, text, id }) {
            try {
                await firebase
                    .database()
                    .ref(`/posts/`)
                    .child(id)
                    .update({ title, text })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
    }
}
