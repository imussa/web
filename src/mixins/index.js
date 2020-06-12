import { mapState } from 'vuex'
import { mapMutations } from 'vuex'

export default {
    computed: {
        ...mapState([
            'token'
        ])
    },
    methods: {
        ...mapMutations([
            'setToken'
        ])
    }
}