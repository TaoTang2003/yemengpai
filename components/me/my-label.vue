<template>
	<view>
		<tui-tag :type="getRandomStyle" :plain="flag">
			<span class="white-text">{{ title }}</span>
		</tui-tag>
	</view>
</template>

<script>
	import tuiTag from '@/components/thorui/tui-tag/tui-tag.vue';
	export default {
		name:"myLabel",
		components:{
			tuiTag,
		},
		computed:{
			getRandomStyle(){
				return this.labelStyle[Math.floor(Math.random() * this.labelStyle.length)];
			}
		},
		props:["title","flag"],
		data() {
			return {
				labelStyle: [
					"primary",
					"danger",
					"warning",
					"green",
				]
			};
		}
	}
</script>

<style lang="scss">
	.white-text{
		color:white;
	}
</style>