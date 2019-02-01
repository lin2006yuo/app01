<template>
    <div class="ripple-button" @mousedown="mousedown" @click="click">
        <slot></slot>
        <span class="e-ripple"></span>
    </div>
</template>
<script>
import effectRipple from '@/lib/effectRipple'

export default {
    props: {
        bgc: {
            type: String,
            default: 'rgba(0, 0, 0, 0.15)'
        }
    },
    methods: {
        click(e) {
            this.$emit("click", e)
        },
        mousedown(e) {
            effectRipple(e, {
                bgc: this.bgc
            })
        }
    },
}
</script>
<style lang="stylus" scoped>
.ripple-button {
  width 100px
  height 36px
  border-radius 3px
  background-color orange
  display inline-block
  cursor pointer
  line-height 36px
  color #fff;
  position relative;
  overflow hidden
}
.e-ripple {
  position: absolute;
  border-radius: 100%;
  background-color: rgba(0, 0, 0, 0.15);
  background-clip: padding-box;
  pointer-events: none;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  -webkit-transform: scale(0);
      -ms-transform: scale(0);
          transform: scale(0);
  opacity: 1; }
  .e-ripple.z-active {
    opacity: 0;
    -webkit-transform: scale(2);
        -ms-transform: scale(2);
            transform: scale(2);
    -webkit-transition: opacity 1.2s ease-out, -webkit-transform 0.6s ease-out;
    transition: opacity 1.2s ease-out, -webkit-transform 0.6s ease-out;
    transition: opacity 1.2s ease-out, transform 0.6s ease-out;
    transition: opacity 1.2s ease-out, transform 0.6s ease-out, -webkit-transform 0.6s ease-out; }
</style>
