export default {
    install(Vue) {
        Vue.prototype.$title = function(titleKey) {
            return titleKey
        }
    }
}
