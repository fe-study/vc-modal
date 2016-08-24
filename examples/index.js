import Vue from 'vue'
import vcModal from '../dist/build.js'

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
            small: false,
            large: true,
            showCloseBtn: true,
            showHeader: true,
            showFooter: true,
            effect: 'fade',
            width: '',
            okText: '确认',
            noText: '取消'
		}
	},
    methods: {
        showModal () {
            this.show = true
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
	components: {
        vcModal
	}
})
