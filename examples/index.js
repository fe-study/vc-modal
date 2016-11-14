import Vue from 'vue'
import vcModal from '../src/Modal.vue'

new Vue({
	el: '#app',
	data () {
		return {
            bools: {
                'true': true,
                'false': false
            },
            title: 'title',
            show: true,
            center: false,
            small: false,
            large: true,
            showCloseBtn: true,
            showHeader: true,
            showFooter: true,
            effect: 'fade',
            width: '',
            top: '',
            okText: '确认',
            cancelText: '取消',
            maskCloseable: true
		}
	},
    methods: {
        showModal () {
            this.show = true
        },
        onOk () {
            console.log('ok')
        },
        onCancel () {
            console.log('cancel')
        },
        showSmallModal () {
            this.show = true
            this.large = false
            this.small = true
            this.width = null
        },
        showLargeModal () {
            this.show = true
            this.small = false
            this.large = true
            this.width = null
        },
        showFadeModal () {
            this.show = true
            this.effect = 'fade'
        },
        showZoomModal () {
            this.show = true
            this.effect = 'zoom'
        }
    },
    watch: {
        center (val) {
            if (val) {
                this.top = null
            }
        }
    },
	components: {
        vcModal
	}
})
