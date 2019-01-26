<template>
  <div class="search-list" v-show="searches.length">
    <transition-group tag="ul" name="list">
      <li @click="selectItem(item)" :key="item" class="search-item" v-for="(item) in searches">
        <span class="text">{{item}}</span>
        <span class="icon" @click.stop="deleteOne(item)">
          <i class="icon-delete"></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    searches: {
      type: Array,
      default: []
    }
  },
  methods: {
    selectItem(item) {
      // 点击搜索历史记录
      this.$emit('select', item)
    },
    // 基础组件,不做业务逻辑,派发出去,
    deleteOne(item) {
      // 派发删除单条历史记录
      this.$emit('delete', item)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"

.search-list
  .search-item
    display: flex
    align-items: center
    height: 40px
    overflow: hidden
    &.list-enter-active, &.list-leave-active
      transition: all 0.1s
    &.list-enter, &.list-leave-to
      height: 0
    .text
      flex: 1
      color: $color-text-l
    .icon
      extend-click()
      .icon-delete
        font-size: $font-size-small
        color: $color-text-d
</style>
