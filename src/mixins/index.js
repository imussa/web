import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
import {createItem, updateItem, removeItem, removeItemByIndex} from './arrayList'

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

export const listMixin = {
    methods: {
        createItem,
        updateItem,
        removeItem,
        removeItemByIndex
    }
}