<template>
  <list-container>
    <list-item :on-tap="onAvatarClick">
      <template #title>头像</template>
      <template #right-avatar>
        <image :src="`${config.resourceUrl}${currentUser.avatarUrl}`"></image>
      </template>
    </list-item>
    <list-item
        :on-tap="() => navigateTo(`/pages/me/profileEdit/textEditor?title=盟ID&field=username&value=${currentUser.username}`)">
      <template #title>盟ID</template>
    </list-item>
    <list-item
        :on-tap="() => navigateTo(`/pages/me/profileEdit/textEditor?title=昵称&field=nickname&value=${currentUser.nickname}`)">
      <template #title>昵称</template>
    </list-item>
    <list-item>
      <template #title>地址</template>
    </list-item>
    <list-item
        :on-tap="() => navigateTo(`/pages/me/profileEdit/textEditor?title=诉求&field=needs&value=${currentUser.needs}`)">
      <template #title>诉求</template>
    </list-item>
    <list-item>
      <template #title>联系方式</template>
    </list-item>
    <list-item
        :on-tap="() => navigateTo(`/pages/me/profileEdit/textEditor?title=个性签名&field=personalizedSignature&value=${currentUser.personalizedSignature}`)">
      <template #title>个性签名</template>
    </list-item>
    <list-item>
      <template #title>标签管理</template>
    </list-item>
  </list-container>
</template>

<script>
import ListItem from '@/components/yemengpai/list-item/list-item.vue'
import ListContainer from '@/components/yemengpai/list-container/list-container.vue'
import store from '@/store'
import config from '@/config'
import api from '@/api'

export default {
  data () {
    return {}
  },
  computed: {
    config () {
      return config
    },
    currentUser () {
      return store.state.user.currentUser
    },
  },
  methods: {
    onAvatarClick () {
      const that = this
      uni.chooseMedia({
        mediaType: ['image'],
        count: 1,
        sizeType: ['compressed'],
        success (res) {
          uni.showLoading({
            title: '上传中',
            mask: true,
          })
          const filePath = res.tempFiles[0].tempFilePath
          wx.getFileSystemManager().readFile({
            filePath: filePath,
            encoding: 'base64',
            success (res) {
              that.uploadAvatar(res.data, filePath.split('.').pop())
            },
          })
        },
      })
    },

    async uploadAvatar (base64, ext) {
      try {
        const resp = await api.user.upload({
          ext,
          base64,
        })
        if (resp.code === 200) {
          await api.user.edit({
            ...this.currentUser,
            avatarUrl: resp.data.url,
          })
          await store.dispatch('user/fetchCurrentInfo')
        } else {
          uni.showToast({
            title: '修改失败',
            icon: 'error',
          })
        }
      } finally {
        uni.hideLoading()
      }
    },

    navigateTo (url) {
      uni.navigateTo({
        url,
      })
    },
  },
  components: {
    ListItem,
    ListContainer,
  },
}
</script>

<style scoped>

</style>
