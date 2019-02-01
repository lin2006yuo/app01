<template>
    <div class="container" ref="container" @ps-y-reach-start="start">
        <slot></slot>
    </div>
</template>
<script>
import PerfectScrollbar from 'perfect-scrollbar';
export default {
    mounted() {
        const ps = new PerfectScrollbar(this.$refs.container, {
            // wheelSpeed: 2,
            // wheelPropagation: true,
            // minScrollbarLength: 20,
            // swipeEasing: true
            // scrollingThreshold: 50
            // useBothWheelAxes: true
            // suppressScrollY : true
        })
        // this.$nextTick(() => {
        //     this.$refs.container.style.width = this.width;
        //     this.$refs.container.style.height = this.height
        //     ps.update()
        // })
        this.$refs.container.style.width = this.width + 'px';
        this.$refs.container.style.height = this.height + 'px'
        ps.update()
        
        console.log(ps.reach.y);
    },
    props: {
        width: {
            require: true
        },
        height: {
            require: true
        }
    },
    methods: {
        start(e) {
            console.log(e)
        }
    }
}
</script>
<style lang="stylus" scoped>
.container {
    position relative
}
</style>
