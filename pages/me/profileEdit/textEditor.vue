<template>
  <view>
    <tui-input backgroundColor="#212121"
               color="#fff"
               clearColor="#999"
               v-model="editorValue"
               clearable
    />
    <view style="margin-top: 32rpx;">
      <tui-button @click="onSaveBtnClick">保存</tui-button>
    </view>
  </view>
</template>

<script>
import TuiInput from '@/components/thorui/tui-input/tui-input.vue'
import TuiButton from '@/components/thorui/tui-button/tui-button.vue'
import service from '@/service/index'
import store from '@/store'

export default {
  components: { TuiButton, TuiInput },
  data () {
    return {
      editorValue: '',
    }
  },
  computed: {
    currentUser () {
      return store.state.user.currentUser
    },
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    field: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
  },
  methods: {
    onSaveBtnClick () {
      if (!this.field) {
        console.error('field is required')
        return
      }

      service.user.editProfile({
        ...this.currentUser,
        [this.field]: this.editorValue,
      })
    },
  },
  onLoad () {
    uni.setNavigationBarTitle({
      title: `修改${this.title}`,
    })
    this.editorValue = this.value
  },
}
</script>

<style lang="scss" scoped>

</style>
