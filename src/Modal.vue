<template>
    <div role="dialog"
        :class="{
            'vc-modal-component': true,
            'modal': true,
            'fade': effect === 'fade',
            'zoom': effect === 'zoom'
        }"
    >
        <div v-el:modal :class="{ 'modal-dialog': true, 'modal-lg': large, 'modal-sm': small }" 
            :style="{ 'width': optionalWidth, 'top': optionalTop }"
            role="document"
        >
            <button type="button" class="close" v-show="showCloseBtn" @click="onClose"><span>&times;</span></button>
            <slot>
            <div v-el:content class="modal-content">
                <slot name="modal-header" v-if="showHeader">
                    <div class="modal-header">
                        <h4 class="modal-title" > 
                            <div name="ttle">
                                {{title}}
                            </div>
                        </h4>
                    </div>
                </slot>
                <slot name="modal-body">
                    <div class="modal-body"></div>
                </slot>
                <slot name="modal-footer" v-if="showFooter">
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" @click="onOk">{{ okText }}</button>
                        <button type="button" class="btn btn-default" @click="onClose">{{ cancelText }}</button>
                    </div>
                </slot>
            </div>
            </slot>
        </div>
    </div>
</template>

<style lang="less">
.vc-modal-component {

}
.modal {
    transition: all 0.3s ease;
    text-align: center;
    display: none; /* 初始化之前隐藏 */
}
.modal-dialog {
    margin: 30px auto;
}
.modal-footer {
    text-align: center; /* override bootstrap */
}
.modal.in {
    background-color: rgba(0,0,0,0.5);
}
.modal.zoom .modal-dialog {
    -webkit-transform: scale(0.1);
    -moz-transform: scale(0.1);
    -ms-transform: scale(0.1);
    transform: scale(0.1);
    top: 300px;
    opacity: 0;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
}
.modal.zoom.in .modal-dialog {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
    -webkit-transform: translate3d(0, -300px, 0);
    transform: translate3d(0, -300px, 0);
    opacity: 1;
}

.modal-content {
    padding: 30px; // 空出关闭按钮,也统一好看一些
}

/* 独立的close按钮 */
button.close {
    position: relative;
    right: 10px;
    top: 5px;
    z-index: 2;
    outline: none;
}
</style>

<script>
// polyfill
// Number.isInteger = Number.isInteger || function(value) {
//   return typeof value === "number" && 
//     isFinite(value) && 
//     Math.floor(value) === value
// }

const DEFAULT_TOP = '30px'

export default {
    name: 'vc-modal',
    props: {
        show: {
            require: true,
            type: Boolean,
            twoWay: true
        },
        title: {
            type: String,
            default: ''
        },
        showCloseBtn: {
            type: Boolean,
            default: true
        },
        maskCloseable: {
            type: Boolean,
            default: true
        },
        showHeader: {
            type: Boolean,
            default: true
        },
        showFooter: {
            type: Boolean,
            default: true
        },
        width: {
            default: null
        },
        top: {
            default: null
        },
        center: {
            type: Boolean,
            default: false
        },
        okText: {
            type: String,
            default: '确定'
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        onOk: Function,
        onCancel: Function,
        effect: {
            type: String,
            default: 'fade' 
        },
        backdrop: {
            type: Boolean,
            default: true
        },
        large: {
            type: Boolean,
            default: false
        },
        small: {
            type: Boolean,
            default: false
        }
    },
    ready () {
        this.$watch('show', (val) => {
            var el = this.$el
            var body = document.body
            if (val) {
                let defaultContent = this.$els.content
                // 可能会因为用户传入的slot导致没有
                defaultContent && defaultContent.focus()
                el.style.display = 'block'
                setTimeout(() => { 
                    if (this.cCenter) {
                        let fullHeight = document.documentElement.clientHeight || document.body.clientHeight
                        let modalHeight = this.$els.modal.offsetHeight
                        this.top = (fullHeight - modalHeight) / 2
                    }
                    el.classList.add('in') 
                }, 0)
                body.classList.add('modal-open')
                const scrollbarWidth = this.getScrollbarWidth()
                if (scrollbarWidth) {
                    body.style.paddingRight = scrollbarWidth + 'px'
                }
                if (this.backdrop && this.maskCloseable) {
                    el.addEventListener('click', this.modalBlurHandler, false)
                }
            } else {
                if (el.classList.contains('in')) {
                    el.classList.remove('in')
                    this.top = null
                    el.addEventListener('transitionend', this.transitionEndHandler, false)
                }
            }
        }, { immediate: true });
    },
    computed: {
        optionalWidth () {
            if (this.width == null || this.width === '') {
                return null
            }
            if (Number.isInteger(+this.width)) {
                return this.width + 'px'
            }
            return this.width
        },
        optionalTop () {
            if (this.top == null || this.top === '') {
                this.$els.modal.style.margin = '30px auto'
                return null
            }
            // top不为空的时候要清除margin，来真正利用top定位
            this.$els.modal.style.margin = '0 auto'
            if (!isNaN(this.top)) {
                return this.top + 'px'
            }
            return this.top
        },
        cCenter () {
            if (this.center === false) {
                return false
            }
            this.top = null
            return true
        }
    },
    // watch: {
    //     show (val) {
    //         const body = document.body
    //         const el = this.$el
    //         if (val) {
    //             el.querySelector('.modal-content').focus()
    //             el.style.display = 'block'
    //             setTimeout(() => { el.classList.add('in') }, 0)
    //             body.classList.add('modal-open')
    //             const scrollbarWidth = this.getScrollbarWidth()
    //             if (scrollbarWidth) {
    //                 body.style.paddingRight = scrollbarWidth + 'px'
    //             }
    //             if (this.backdrop && this.maskCloseable) {
    //                 el.addEventListener('click', this.modalBlurHandler, false)
    //             }
    //         } else {
    //             if (el.classList.contains('in')) {
    //                 el.classList.remove('in')
    //                 el.addEventListener('transitionend', this.transitionEndHandler, false)
    //             }
    //         }
    //     }
    // },
    methods: {
        getScrollbarWidth () {
            if (document.documentElement.scrollHeight <= document.documentElement.clientHeight) {
                return 0
            }
            let inner = document.createElement('p')
            inner.style.width = '100%'
            inner.style.height = '200px'

            let outer = document.createElement('div')
            outer.style.position = 'absolute'
            outer.style.top = '0px'
            outer.style.left = '0px'
            outer.style.visibility = 'hidden'
            outer.style.width = '200px'
            outer.style.height = '150px'
            outer.style.overflow = 'hidden'
            outer.appendChild(inner)

            document.body.appendChild(outer)
            let w1 = inner.offsetWidth
            outer.style.overflow = 'scroll'
            let w2 = inner.offsetWidth
            if (w1 === w2) w2 = outer.clientWidth

            document.body.removeChild(outer)

            return (w1 - w2)
        },
        modalBlurHandler (e) {
            if (e.target === this.$el) {
                this.show = false
            }
        },
        transitionEndHandler () {
            var body = document.body
            var el = this.$el
            // el.removeEventListener('click', blurEvent, false)
            el.removeEventListener('transitionend', this.transitionEndHandler, false)
            el.removeEventListener('click', this.modalBlurHandler, false)
            el.style.display = 'none'
            body.classList.remove('modal-open')
            body.style.paddingRight = '0'
        },
        onClose () {
            this.show = false;
            this.onOk && this.onOk()
        }
    },
    beforeDestroy () {
        if (el.classList.contains('in')) {
            el.classList.remove('in')
            el.addEventListener('transitionend', this.transitionEndHandler, false)
        }
    }
}
</script>
