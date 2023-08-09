<template>
	<view class="label-container">
		<view class="label-header">
			<text class="label-header-big">添加标签</text>
			<text class="label-header-little">添加符合你的7个标签</text>
		</view>
		<view class="label-body">
			<view class="label-body-element" v-for="(label,index) in labels" :key="index"
				@click="chooseLabel(label.id)">
				<myLabel :title="label.title" :flag="label.isChoose"></myLabel>
			</view>
		</view>
		<view class="label-footer">
			<tui-button type="primary" width="100rpx" height="84rpx" @click="finish()">完成</tui-button>
		</view>
		<tui-toast ref="toast"></tui-toast>
	</view>
</template>

<script>
	import myLabel from "@/components/me/my-label.vue";
	import tuiButton from "@/components/thorui/tui-button/tui-button.vue";
	import tuiToast from "@/components/thorui/tui-toast/tui-toast.vue"
	import store from '@/store';
	export default {
		mounted() {
			let arr = [...store.state.user.tags];
			let _labels = [];
			arr.forEach((e) => {
				let obj = {
					id: this.generateUniqueId(),
					title: e,
					isChoose: true,
				};
				_labels.push(obj);
			});
			this.labels = [..._labels];
		},
		data() {
			return {
				chooseLabels: [],
				labels: [],
			};
		},
		components: {
			myLabel,
			tuiButton,
			tuiToast
		},
		props: {
			title: {
				type: String,
				default: "",
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: `${this.title}`,
			})
		},
		methods: {
			isChoose(id) {
				let flag = false;
				this.chooseLabels.forEach((e) => {
					if (e.id == id) {
						flag = true;
					}
				});
				return flag;
			},
			chooseLabel(index) {
				let isLabelChooseMax = false;
				if (this.chooseLabels.length >= 7) {
					isLabelChooseMax = true;
				}
				for (var i = 0; i < this.labels.length; i++) {
					if (this.labels[i].id == index) {
						if (isLabelChooseMax && this.isChoose(this.labels[i].id)) {
							this.labels[i].isChoose = true;
							this.chooseLabels = this.chooseLabels.filter((e)=>{
								return e.id != index;
							});
							isLabelChooseMax = false;
						} else {
							if (isLabelChooseMax) {
								let params = {
									title:"最多选择7个标签！",
									
								}
								this.$refs.toast && this.$refs.toast.show(params);
								break;
							}
							this.labels[i].isChoose = !this.labels[i].isChoose;
							if (this.labels[i].isChoose == false) {
								this.chooseLabels.push(this.labels[i]);
							}
						}


					}
				}
			},
			finish() {
				console.log(this.chooseLabels);
			},
			generateUniqueId() {
				const timestamp = Date.now();
				const randomNum = Math.floor(Math.random() * 10000); // 0到9999之间的随机数
				const uniqueId = `${timestamp}${randomNum}`;
				return uniqueId;
			}
		}
	}
</script>

<style lang="scss">
	.label-container {
		padding: 20rpx;

		.label-header {
			display: flex;
			flex-direction: column;

			.label-header-big {
				font-size: 50rpx;
			}

			.label-header-little {
				font-size: 20rpx;
			}
		}

		.label-body {
			margin-top: 20rpx;
			display: flex;
			flex-wrap: wrap;

			.label-body-element {
				width: fit-content;
				margin: 20rpx;
			}
		}

		.label-footer {
			display: flex;
			justify-content: flex-end;
		}
	}
</style>