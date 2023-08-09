<template>
	<view class="header-btn">
		<view>
			<button class="cancel-btn" size="mini">取消</button>
		</view>
		<view>
			<button class="publish-btn" size="mini" @click="publishDynamic">发布</button>
		</view>
	</view>
	<textarea class="content-container" placeholder="分享你的想法,让更多人来讨论吧" placeholder-style="color:#999999"></textarea>
	<view class="footer-upload">
		<tui-upload @complete="result" @remove="remove" ref="upload"></tui-upload>
		<uni-file-picker limit="5" file-mediatype="all" title="最多选择5个文件"></uni-file-picker>
	</view>
	
	<!-- 	<scroll-view @scrolltolower="loadMore()">
    <dynamic-post :on-tap="() => onPostClick(post)"
                  v-for="(post, index) in posts"
                  :key="index"
                  :post="post"/>
  </scroll-view> -->
	<!-- <tui-nomore v-if="!isLoading" background-color="#141414"></tui-nomore> -->
</template>

<script>
	import TuiNomore from '@/components/thorui/tui-nomore/tui-nomore.vue';
	import DynamicPost from '@/components/yemengpai/dynamic-post/dynamic-post.vue';
	import tuiUpload from "@/components/thorui/tui-upload/tui-upload.vue";
	import store from '@/store';
	import user from "@/api/user/index";
	import config from '@/config';
	export default {
		components: {
			TuiNomore,
			DynamicPost,
			tuiUpload
		},
		data() {
			return {
				limit: 10,
				isLoading: true,
				imageData: [],
			}
		},
		methods: {
			publishDynamic() {

			},
			result: function(e) {
				if(e.imgArr.length == 0){
					return ;
				}
				this.imageData = e.imgArr;

				let str = e.imgArr[e.imgArr.length - 1];

				let arrayBuffer = new Uint8Array(str.length);

				for (let i = 0; i < str.length; i++) {
					arrayBuffer[i] = str.charCodeAt(i);
				}
				
				let data = {
					ext: str.split(".")[1],
					base64: uni.arrayBufferToBase64(arrayBuffer),
				}
				let res = user.upload(data);

				res.then((res) => {
					if (res.msg === "success") {
						console.log(res)
						console.log("success")
					}
				})
				
			},
			remove: function(e) {
				//移除图片
				let index = e.index
			},
			onPostClick(post) {
				uni.navigateTo({
					url: `/pages/dynamic/detail?id=${post.id}`,
				})
			},
			loadMore() {
				if (this.isLoading) {
					return
				}

				this.isLoading = true;
				(async () => {
					try {
						await store.dispatch('dynamic/fetchPosts', {
							limit: this.limit,
							minId: this.posts.length > 0 ? this.posts[this.posts.length - 1].id : '0',
						})
					} finally {
						this.isLoading = false
					}
				})()
			}
		},
		computed: {

			posts() {
				return store.state.dynamic.posts
			},
		},
		onPullDownRefresh() {
			this.isLoading = true;
			(async () => {
				try {
					await store.dispatch('dynamic/refreshPosts')
				} finally {
					uni.stopPullDownRefresh()
					this.isLoading = false
				}
			})()
		},
		onLoad() {
			this.isLoading = true;
			(async () => {
				try {
					if (this.posts.length === 0) {
						uni.showLoading({
							title: '加载中',
							mask: true,
						})
					}
					await store.dispatch('dynamic/refreshPosts')
				} finally {
					uni.hideLoading()
					this.isLoading = false
				}
			})()
		}
	}
</script>

<style scoped lang="scss">
	.header-btn {
		display: flex;
		justify-content: space-between;

		.cancel-btn {
			background-color: #FFFFFF;
		}

		.publish-btn {
			background-color: #443CAC;
		}
	}

	.content-container {
		width: 100%;
		background-color: #2B2B2B;
		color: #999999;
		margin-top: 30rpx;
	}

	.footer-upload {
		width: 100%;
		padding: 40rpx;
	}
</style>