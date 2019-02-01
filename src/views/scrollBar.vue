<template>
    <div class="scorll-bar">
        <ScrollBarContainer width="500" height="500">
            <div class="wrapper"></div>
        </ScrollBarContainer>
    </div>
</template>
<script>
import ScrollBarContainer from '@/components/ScrollBarContainer'
export default {
    components: {
        ScrollBarContainer
    }
}
</script>
<style lang="stylus" scoped>
    .wrapper {
        width 500px;
        height: 1000px
        background-color orange
    }
</style>