<template>
	<div id="goodsEvaluateDiv" class="goods-evaluate">
		<div v-if="totalNum!=0">
			<div class="goods-evaluate-header">
				<span :class="activeNum==0?'active':''" @click="activeClick(0)">全部<i>{{totalNum}}</i></span>
				<span :class="activeNum==1?'active':''" @click="activeClick(1)">有图<i>{{hasImgNum}}</i></span>
				<span :class="activeNum==2?'active':''" @click="activeClick(2)">好评<i>{{goodNum}}</i></span>
				<span :class="activeNum==3?'active':''" @click="activeClick(3)">差评<i>{{badNum}}</i></span>
			</div>
			<div class="goods-evaluate-content">
				<div class="goods-evaluate-section" v-for="(item,index) in evaluatesList" :key="index">
					<div class="userIcon"><img :src="item.userAvatar" alt=""/></div>
					<div class="userNameDiv">
						<span>{{item.userNickname}}</span>
						<span>{{item.createdTime}}</span>
					</div>
					<div class="scoreDiv">
						<svg class="icon" v-for="(score,scoreIndex) in [1,2,3,4,5]" :key="scoreIndex">
							<use v-if="score<=item.score" xlink:href="#icon-store_star_hig"></use>
							<use v-else xlink:href="#icon-store_star_higcopy"></use>
						</svg>
					</div>
					<div class="conentDiv">{{item.content}}</div>
					<div v-if="item.evalImgs!=''" class="evalImgsDiv">
						<div v-for="(img,imgIndex) in JSON.parse(item.evalImgs)" :key="imgIndex">
							<img :src="img" alt=""/>
						</div>
					</div>
					<div class="shopReplyDiv" v-if="item.shopReply!='' && item.shopReply != 'undefined'">
						<span>商家回复：</span>
						{{item.shopReply}}
					</div>
				</div>
			</div>
			<div v-if="showCheckMore==0" class="check-more" @click="checkMore">点击查看更多</div>
		</div>
		<div v-else>
		  <div class="center-no">
				<img class="ignore" src="../../static/images/evaluate.svg" alt="">
				<a>暂无商品评价</a>
		  </div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ['goodsId'],
	data () {
	  return {
			totalNum:0,
			hasImgNum:0,
			goodNum:0,
			badNum:0,
			activeNum:0,
			evalType:null,
			isHasImg:null,
			pageNum:0,
			limit:14,
			evaluatesList:[],
			showCheckMore:0,
	  }
	},
	created() {
		this.getQueryEvalNum();
		this.getListEvaluates();
	},
	methods:{
		activeClick (index) {
			this.activeNum = index;
			this.pageNum = 0;
			this.limit = 14;
			switch(index)
			{
				case 0:
					this.evalType = null;
					this.isHasImg = null;
					break;
				case 1:
					this.evalType = null;
					this.isHasImg = 1;
					break;
				case 2:
					this.evalType = 1;
					this.isHasImg = null;
					break;
				case 3:
					this.evalType = 3;
					this.isHasImg = null;
					break;
			};
			this.evaluatesList = [];
			this.getListEvaluates();
		},
		checkMore () {
			this.pageNum = this.pageNum + 1;
			this.getListEvaluates();
		},
		getQueryEvalNum() {
			this.request(this.api.QueryEvalNum,{goodsId:this.$props.goodsId}).then(res => {
				if (res.code == 200) {
					this.totalNum = res.data.totalNum;
					this.hasImgNum = res.data.hasImgNum;
					this.goodNum = res.data.goodNum;
					this.badNum = res.data.badNum;
				}
			});
		},
		getListEvaluates() {
			this.request(this.api.ListEvaluates,{goodsId:this.$props.goodsId,evalType:this.evalType,isHasImg:this.isHasImg,offset:this.pageNum*this.limit,limit:this.limit}).then(res => {
			  if (res.code == 200) {
					for (var i=0;i<res.data.rows.length;i++) {
						this.evaluatesList.push(res.data.rows[i]);
					}
					if ((this.pageNum * this.limit + res.data.rows.length) == res.data.total) {
						this.showCheckMore = 1;
					}
			  }
			});
		}
	}
}
</script>

<style lang="less">
	.goods-evaluate{
		width: 100%;
    min-height: 1050px;
    display: none;
    background-color: #FFFFFF;
		.center-no{
			width: 100%;
			height: 400px;
			padding-top: 360px;
			padding-bottom: 360px;
			background-color: white;
			text-align: center;
			.ignore{
				width: 160px;
				height: 160px;
			}
			a{
				display: inline-block;
				width: 100%;
				text-align: center;
				height: 60px;
				line-height: 60px;
				color: #666666;
				font-size: 28px;
			}
		}
		.check-more{
			width: 100%;
			height: 50px;
			background: #ffffff;
			line-height: 50px;
			text-align: center;
			font-size: 30px;
		}
		.goods-evaluate-header{
			height: 120px;
			line-height: 120px;
			background: #ffffff;
			border-bottom: 0.5px solid #cccccc;
			span{
				display: inline-block;
				height: 54px;
				line-height: 54px;
				padding: 0 28px;
				background: #F8F8F8;
				border-radius: 27px;
				font-size: 24px;
				color: #666666;
				margin-left: 27px;
				i{
					margin-left: 10px;
				}
			}
			.active{
				background: #C9AB5D !important;
				color: #FFFFFF !important;
			}
		}
		.goods-evaluate-section{
			width: 100%;
			background: #ffffff;
			position: relative;
			padding-bottom: 27px;
			.userIcon{
				position: absolute;
				width: 44px;
				height: 44px;
				border-radius: 22px;
				top: 27px;
				left: 27px;
				img{
					width: 100%;
					height: 100%;
				}
			}
			.userNameDiv{
				height: 82px;
				width: 100%;
				span{
					margin-top: 27px;
					&:nth-child(1){
						display: inline-block;
						height: 44px;
						line-height: 44px;
						font-size: 30px;
						color: #666666;
						float: left;
						margin-left: 80px;
					}
					&:nth-child(2){
						display: inline-block;
						height: 44px;
						line-height: 44px;
						font-size: 24px;
						color: #999999;
						float: right;
						margin-right: 27px;
					}
				}
			}
			.scoreDiv{
				height: 40px;
				width: 100%;
				.icon{
					width: 22px;
					height: 22px;
					margin-right: 10px;
					&:nth-child(1){
						margin-left: 80px;
					}
				}
			}
			.conentDiv{
				line-height: 44px;
				margin: 20px 0 0 80px;
				font-size: 34px;
				color: #252932;
			}
			.evalImgsDiv{
				margin: 18px 0 0 80px;
				div{
					display: inline-block;
					width: 144px;
					height: 144px;
					margin-right: 18px;
					img{
						width: 100%;
						height: 100%;
					}
				}
			}
			.shopReplyDiv{
				line-height: 72px;
				background: #F8F8F8;
				margin: 18px 80px 0;
				padding: 0 18px;
				font-size: 30px;
				color: #130014;
				span{
					color: #999999;
				}
			}
		}
  }
</style>
