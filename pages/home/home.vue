<template>
  <view class="tui-banner-box">
    <swiper :indicator-dots="true" :autoplay="true" :interval="5000" :duration="150" class="tui-banner-swiper"
            :circular="true" previous-margin="0" next-margin="0">
      <swiper-item v-for="(item, index) in banner" :key="index" class="tui-banner-item">
        <image :src="'https://thorui.cn/images/mall/banner/' + item" class="tui-slide-image"
               mode="scaleToFill" lazy-load @tap="detail"></image>
      </swiper-item>
    </swiper>
  </view>

  <card-container margin-top="32rpx">
    <view class="tui-group-name" @tap="more">
      <view>
        <text>线下活动</text>
        <text class="tui-sub__desc"></text>
      </view>
      <view class="tui-more__box">
        <text>更多</text>
        <tui-icon name="arrowright" :size="36" unit="rpx" color="#999"></tui-icon>
      </view>
    </view>
    <view class="tui-product-container">
      <template v-for="(item, index) in offlineActivities" :key="index">
        <view class="tui-pro-item tui-flex-list" hover-class="tui-hover" :hover-start-time="150" @tap="detail">
          <image :src="'/static/images/mall/product/' + item.img + '.jpg'" class="tui-pro-img tui-proimg-list"
                 mode="widthFix"/>
          <view class="tui-pro-content">
            <view class="tui-pro-tit">{{ item.name }}</view>
            <view>
              <view class="tui-pro-price">
                <text class="tui-sale-price">￥{{ item.sale }}</text>
                <text class="tui-factory-price">￥{{ item.factory }}</text>
              </view>
              <view class="tui-pro-pay">{{ item.payNum }}人付款</view>
            </view>
          </view>
        </view>
      </template>
    </view>
  </card-container>
</template>

<script>
import CardContainer from '@/components/yemengpai/card-container/card-container.vue'
import TuiIcon from '@/components/thorui/tui-icon/tui-icon.vue'

export default {
  data () {
    return {
      banner: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'],
      offlineActivities: [
        {
          img: 1,
          name: '欧莱雅（LOREAL）奇焕光彩粉嫩透亮修颜霜 30ml（欧莱雅彩妆 BB霜 粉BB 遮瑕疵 隔离）',
          sale: 599,
          factory: 899,
          payNum: 2342,
        },
        {
          img: 2,
          name: '德国DMK进口牛奶  欧德堡（Oldenburger）超高温处理全脂纯牛奶1L*12盒',
          sale: 29,
          factory: 69,
          payNum: 999,
        },
        {
          img: 3,
          name: '【第2支1元】柔色尽情丝柔口红唇膏女士不易掉色保湿滋润防水 珊瑚红',
          sale: 299,
          factory: 699,
          payNum: 666,
        },
        {
          img: 4,
          name: '百雀羚套装女补水保湿护肤品',
          sale: 1599,
          factory: 2899,
          payNum: 236,
        },
        {
          img: 5,
          name: '百草味 肉干肉脯 休闲零食 靖江精制猪肉脯200g/袋',
          sale: 599,
          factory: 899,
          payNum: 2399,
        },
        {
          img: 6,
          name: '短袖睡衣女夏季薄款休闲家居服短裤套装女可爱韩版清新学生两件套 短袖粉色长颈鹿 M码75-95斤',
          sale: 599,
          factory: 899,
          payNum: 2399,
        },
      ],
    }
  },
  components: {
    CardContainer,
    TuiIcon,
  },
}
</script>

<style scoped>
</style>
