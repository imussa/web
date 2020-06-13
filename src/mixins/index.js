import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
import {createItem, updateItem, removeItem, removeItemByIndex} from './arrayList'

export default {
    computed: {
        ...mapState([
            'token',
            'username'
        ])
    },
    methods: {
        ...mapMutations([
            'setToken',
            'setUsername'
        ])
    }
}

export const listMixin = {
    methods: {
        createItem,
        updateItem,
        removeItem,
        removeItemByIndex
    }
}

export const requestMixin = {
    methods: {
        createTokenRequest (token) {
            return this.$http.create({
                headers: {
                    'Authorization': token
                }
            })

        }
    }
}