<template>
	<view class="container">
		<view class="content">
			<tui-input ref="name" :marginTop="marginNumber" v-model="address.name" label="姓名" placeholder="收货人姓名" ></tui-input>
			<tui-input ref="phone" :marginTop="marginNumber" @blur="isPhoneRegExp" v-model="address.phone" label="电话" placeholder="收货人手机号"></tui-input>
			<tui-input ref="area" :marginTop="marginNumber" v-model="address.area" label="地址" placeholder="选择省/市/区" @click="showPopup"></tui-input>
			<tui-bottom-popup :zIndex="1002" :maskZIndex="1001" :show="show" @close="closePopup">
				<tui-cascade-selection height="300px" :itemList="areaList" @complete="complete"></tui-cascade-selection>
			</tui-bottom-popup>
			<tui-input ref="detailArea" :marginTop="marginNumber" v-model="address.detailArea" label="详细地址" placeholder="街道门牌,楼层房间号等信息"></tui-input>
		</view>
		<view class="isDefault">
			<span>是否设为默认地址</span>
			<tui-switch :checked="address.isDefault" color="#07c160" @change="isDefault"></tui-switch>
		</view>
		<view class="operation">
			<tui-button type="primary" @click="save">保存</tui-button>
		</view>
	</view>
</template>

<script>
	import {
		useCascaderAreaData
	} from '@vant/area-data';
	import tuiButton from "@/components/thorui/tui-button/tui-button.vue"
	import tuiBottomPopup from "@/components/thorui/tui-bottom-popup/tui-bottom-popup.vue";
	import tuiInput from "@/components/thorui/tui-input/tui-input.vue";
	import tuiCascadeSelection from "@/components/thorui/tui-cascade-selection/tui-cascade-selection.vue";
	import PhoneNumber from "libphonenumber-js";
	import tuiSwitch from "@/components/thorui/tui-switch/tui-switch.vue"
	export default {
		components: {
			tuiBottomPopup,
			tuiCascadeSelection,
			tuiInput,
			tuiButton,
			tuiSwitch
		},
		data() {
			return {
				areaList: useCascaderAreaData(),
				show: false,
				showBorder:true,
				marginNumber:5,
				address: {
					name: "",
					phone: "",
					area: "",
					detailArea: "",
					isDefault:false
				},
				
			};
		},
		methods: {
			isDefault(){
				this.address.isDefault = !this.address.isDefault;
			},
			isPhoneRegExp(){
				if(isNaN(this.address.phone)){
					this.toast("手机号错误","error");
					return;
				}
				const flag = PhoneNumber(this.address.phone,"CN");
				
				if(!flag.isValid() && !flag.isPossible()){
					this.toast("手机号格式有误","error");
				}
			},
			isHaveNull(obj){
				for(const key in obj){
					if (obj[key] === null || obj[key] === undefined || obj[key] === "") {
					      return key; 
					}
				}
				return 0;
			},
			toast(title,icon){
				uni.showToast({
					title,
					icon
				})
			},
			save(){
				const flag = this.isHaveNull(this.address);
				if(flag === 0){
					console.log("保存成功！");
				}else if(flag === "name"){
					this.toast("姓名未填","error");
				}else if(flag === "phone"){
					this.toast("手机号未填","error");
				}else if(flag === "detailArea"){
					this.toast("地址未填");
				}else if(flag === "area"){
					this.toast("地址未填");
				}
			},
			closePopup() {
				this.show = false;
			},
			showPopup() {
				this.show = true;
			},
			complete(data) {
				const strArr = data.result;
				const str = strArr.map((option) => option.text).join("/");
				this.address.area = str;
				this.show = false;
			}
		},
		props: {
			title: {
				type: String,
				default: "",
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: `修改${this.title}`,
			})
		}
	}
</script>

<style lang="scss">
	.container {

		.content {
			padding: 10rpx;
		}
		.isDefault{
			display:flex;
			justify-content: space-between;
			align-items: center;
			margin-top:10rpx;
			margin-bottom:10rpx;
			color:black;
			background-color: white;
		}
		.operation {
			margin-top: 20rpx;
			line-height: 20rpx;
		}

		.test {
			background-color: #443CAC;
		}
	}
</style>