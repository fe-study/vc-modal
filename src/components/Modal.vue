<template>
    <div role="dialog"
        :class="{
        'modal': true,
        'fade': effect === 'fade',
        'zoom': effect === 'zoom'
        }"
    >
        <div :class="{ 'modal-dialog':true,'modal-lg':large,'modal-sm':small }" 
            :style="{width: optionalWidth}"
            role="document"
        >
            <button type="button" class="close" v-show="showCloseBtn" @click="onClose"><span>&times;</span></button>
            <div class="modal-content">
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
                        <button type="button" class="btn btn-primary" @click="onConfirm">{{ okText }}</button>
                        <button type="button" class="btn btn-default" @click="onClose">{{ noText }}</button>
                    </div>
                </slot>
            </div>
        </div>
    </div>
</template>

<style>
.modal {
    transition: all 0.3s ease;
    text-align: center;
    display: none; /* 初始化之前隐藏 */
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
Number.isInteger = Number.isInteger || function(value) {
  return typeof value === "number" && 
    isFinite(value) && 
    Math.floor(value) === value
}

export default {
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
        okText: {
            type: String,
            default: '确定'
        },
        noText: {
            type: String,
            default: '取消'
        },
        onConfirm: {
            type: Function,
            default: function() {}
        },
        effect: {
            type: String,
            default: null
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
                el.querySelector('.modal-content').focus()
                el.style.display = 'block'
                setTimeout(() => { el.classList.add('in') }, 0)
                body.classList.add('modal-open')
                const scrollbarWidth = this.getScrollbarWidth()
                if (scrollbarWidth) {
                    body.style.paddingRight = scrollbarWidth + 'px'
                }
                if (this.backdrop) {
                    el.addEventListener('click', this.modalBlurHandler, false)
                }
            } else {
                if (el.classList.contains('in')) {
                    el.classList.remove('in')
                    el.addEventListener('transitionend', this.transitionEndHandler, false)
                }
            }
        }, { immediate: true });
    },
    computed: {
        optionalWidth: function () {
            if (this.width == null || this.width === '') {
                return null
            }
            if (Number.isInteger(+this.width)) {
                return this.width + 'px'
            }
            return this.width
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
    //             if (this.backdrop) {
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
        onClose: function() {
            this.show = false;
        }
    },
    beforeDestroy: function() {
        if (el.classList.contains('in')) {
            el.classList.remove('in')
            el.addEventListener('transitionend', this.transitionEndHandler, false)
        }
    }
}
</script>
