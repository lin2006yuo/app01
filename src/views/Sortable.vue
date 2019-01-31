<template>
    <div class="sortable">
        <ul ref="items" class="items">
            <li v-for="(item, index) in items" :key="index" class="item">{{item.name}}</li>
        </ul>
    </div>
</template>
<script>
import Sortable from 'sortablejs'
export default {
    data() {
        return {
            items: [
                { name: 'Hardon' },
                { name: 'James' },
                { name: 'Curry' }
            ]
        }
    },
    mounted() {
        new Sortable(this.$refs.items, {
            delay: 0,
            animation: 500
        });
    },  
}
</script>
<style lang="stylus">
    .items {
        display flex
        flex-direction column
        align-items center
       .item {
           margin 5px 0
           padding 8px
           border-radius 4px
           color #f5f5f5
           cursor pointer
           background-color #fc4969
           user-select none
       }
    }
</style>
