<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <RippleButton bgc="rgba(255,0,0,0.2)">cancel</RippleButton>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import effectRipple from '@/lib/effectRipple'
import RippleButton from '@/components/RippleButton'

export default {
  name: 'home',
  components: {
    HelloWorld,
    RippleButton
  },
  methods: {
    ripple(e) {
      effectRipple(e)
    }
  }
}
</script>
<style lang="stylus">

</style>

