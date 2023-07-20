import {usePage,} from "@inertiajs/vue3";
import {inject, ref, defineEmits} from 'vue'


export default {
    // emits: ['showToast'],
    // setup(props, ctx) {
    //     ctx.emit('showToast')
    // },

    data() {
        return {
            user: null,
        }
    },
    mounted() {
        // console.log(inject('toast'));
        if (usePage().props.auth)
            this.user = usePage().props.auth.user
    },

    methods: {
        showToast(type, message) {
            this.emitter.emit('showToast', {type, message});

        },
        showAlert(type, message) {
            this.emitter.emit('showAlert', {type, message});

        },
        showDialog(type, message, onClick) {

            this.emitter.emit('showDialog', {type, message});

        },
        isLoading(loading) {
            this.emitter.emit('loading', loading);

        },
        /**
         * Translate the given key.
         */
        __: (key, replace = {}) => {
            let $lang = usePage().props.language;

            var translation = $lang[key]
                ? $lang[key]
                : key

            Object.keys(replace).forEach(function (key) {
                translation = translation.replace(':' + key, replace[key])
            });

            return translation
        }, dir: () => {
            let $lang = usePage().props.language;
            if ($lang == 'en') return 'ltr'; else return 'rtl';

        }, log: (str) => {
            console.log(str);
        },
        asPrice(price) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        cropText(str, len, trailing = "...") {
            return str && str.length >= len ? `${trailing}${str.substring(0, len)}` : str
        },
        getCategory(id) {
            if (id == null || usePage().props.categories == null) return '';
            for (const el of usePage().props.categories)
                if (el.id == id)
                    return this.__(el.name);
            return '';
        },
        getStatus(type, id) {
            if (id == null || type == null || usePage().props[`${type}_statuses`] == null) return {
                name: '',
                color: 'primary'
            };
            for (const el of usePage().props[`${type}_statuses`])
                if (el.name == id)
                    return {name: this.__(el.name), color: el.color || 'primary'};

        },
        getErrors(error) {
            if (error.response) {
                if (error.response.data && error.response.data.errors)
                    return Object.values(error.response.data.errors).join("<br/>")
                if (error.response.data && error.response.data.message)
                    return error.response.data.message;

            } else if (error.request) {
                return error.request;
            } else {
                return error.message;
            }
        }
    },


}
