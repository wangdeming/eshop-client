export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/login')
  },
  {
    path: '/login-mobile',
    name: 'loginMobile',
    meta: {
      title: '手机号登录'
    },
    component: () => import('@/pages/login-mobile/login-mobile')
  },
  {
    path: '/',
    name: '/',
    meta: {
      title: '灵山景区',
      requiresAuth: true,
    },
    component: () => import('@/pages/home/home')
  },
  {
    path: '/specialty',
    name: 'specialty',
    meta: {
      title: '特产商城',
      requiresAuth: true,
    },
    component: () => import('@/pages/specialty/specialty')
  },
  {
    path: '/category',
    name: 'category',
    meta: {
      title: '全部分类',
      requiresAuth: true,
    },
    component: () => import('@/pages/category/category')
  },
  {
    path: '/cart',
    name: 'cart',
    meta: {
			title: '购物车',
			requiresAuth: true,
    },
    component: () => import('@/pages/cart/cart')
  },
  {
    path: '/center',
    name: 'center',
    meta: {
      title: '个人主页',
      requiresAuth: true
    },
    component: () => import('@/pages/center/center')
  },
  {
    path: '/shop',
    name: 'shop',
    meta: {
      title: '店铺主页',
    },
    component: () => import('@/pages/shop/shop')
  },
  {
    path: '/account',
    name: 'account',
    meta: {
      title: '个人信息',
      requiresAuth: true
    },
    component: () => import('@/pages/account/account')
  },
  {
    path: '/order/detail',
    name: 'detail',
    meta: {
      title: '订单详情',
      requiresAuth: true
    },
    component: () => import('@/pages/order/detail')
  },
  {
    path: '/order/logistic',
    name: 'logistic',
    meta: {
      title: '物流信息',
      requiresAuth: true
    },
    component: () => import('@/pages/order/logistic')
  },
  {
    path: '/order/rate',
    name: 'rate',
    meta: {
      title: '订单评价',
      requiresAuth: true
    },
    component: () => import('@/pages/order/rate')
  },
  {
    path: '/order/ratedetail',
    name: 'ratedetail',
    meta: {
      title: '评价订单',
      requiresAuth: true
    },
    component: () => import('@/pages/order/ratedetail')
  },
  {
    path: '/address',
    name: 'address',
    meta: {
      title: '收货地址管理',
      requiresAuth: true
    },
    component: () => import('@/pages/address/address')
  },
  {
    path: '/tourist',
    name: 'tourist',
    meta: {
      title: '游客管理',
      requiresAuth: true
    },
    component: () => import('@/pages/tourist/tourist')
  },
  {
    path: '/tourist/update',
    name: 'tourist-update',
    meta: {
      title: '游客管理',
      requiresAuth: true
    },
    component: () => import('@/pages/tourist/update')
  },
  {
    path: '/address/update',
    name: 'address-update',
    meta: {
      title: '地址管理',
      requiresAuth: true
    },
    component: () => import('@/pages/address/update')
  },
  {
    path: '/search',
    name: 'search',
    meta: {
      title: '搜索',
      requiresAuth: true
    },
    component: () => import('@/pages/search/search')
  },
  {
    path: '/goods-by-specialty',
    name: 'goods-by-specialty',
    meta: {
      title: '二级类目',
      requiresAuth: true
    },
    component: () => import('@/pages/search/goods-by-specialty')
  },
  {
    path: '/goods-by-shop',
    name: 'goods-by-shop',
    meta: {
      title: '商品列表',
      requiresAuth: true
    },
    component: () => import('@/pages/goods-by-category/goods-by-shop')
  },
  {
    path: '/goods-by-category',
    name: 'goods-by-category',
    meta: {
      title: '商品列表',
      requiresAuth: true
    },
    component: () => import('@/pages/goods-by-category/goods-by-category')
  },
  {
    path: '/order',
    name: 'order',
    meta: {
      title: '我的订单',
      requiresAuth: true
    },
    component: () => import('@/pages/order/order')
  },
  {
    path: '/order-refund',
    name: 'order-refund',
    meta: {
      title: '退款/售后',
      requiresAuth: true
    },
    component: () => import('@/pages/order/order-refund')
  },
  {
    path: '/checkout',
    name: 'checkout',
    meta: {
      title: '确认订单',
      requiresAuth: true
    },
    component: () => import('@/pages/checkout/checkout')
  },
  {
    path: '/checkout/address',
    name: 'checkout-address',
    meta: {
      title: '选择地址',
      requiresAuth: true
    },
    component: () => import('@/pages/checkout-address/checkout-address')
  },
  {
    path: '/transaction',
    name: 'transaction',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/pages/transaction/transaction')
  },
  {
    path: '/goods/:id',
    name: 'goods',
		meta: {
		  title: '商品详情',
		  requiresAuth: true
		},
    component: () => import('@/pages/goods/goods')
  },
  {
    path: '/evaluate',
    name: 'evaluate',
    meta: {
      title: '评价详情',
      requiresAuth: true
    },
    component: () => import('@/pages/evaluate/evaluate')
  },
  {
    path: '/refund/:id',
    name: 'refund',
    meta: {
      title: '申请退款',
      requiresAuth: true
    },
    component: () => import('@/pages/refund/refund')
  },
  {
    path: '/refund-detail',
    name: 'refund-detail',
    meta: {
      title: '退款详情',
      requiresAuth: true
    },
    component: () => import('@/pages/refund/detail')
  },
  {
    path: '/refund-delivery',
    name: 'refund-delivery',
    meta: {
      title: '填写物流',
      requiresAuth: true
    },
    component: () => import('@/pages/refund/refund-delivery')
  },
  {
    path: '/hotel',
    name: 'hotel',
    meta: {
      title: '酒店',
      requiresAuth: true
    },
    component: () => import('@/pages/hotel/index')
  },
  {
    path: '/hotel/list',
    name: 'hotellist',
    meta: {
      title: '酒店查询',
      requiresAuth: true
    },
    component: () => import('@/pages/hotel/list')
  },
  {
    path: '/hotel/checkout',
    name: 'hotelcheckout',
    meta: {
      title: '灵山度假酒店',
      requiresAuth: true
    },
    component: () => import('@/pages/hotel/checkout')
  },
  {
    path: '/hotel/shop',
    name: 'hotelshop',
    meta: {
      title: '酒店查询',
      requiresAuth: true
    },
    component: () => import('@/pages/hotel/shop')
  },
  {
    path: '/hotel/pay',
    name: 'hotelpay',
    meta: {
      title: '支付中心',
      requiresAuth: true
    },
    component: () => import('@/pages/hotel/pay')
  },
  {
    path: '/hotel/paysuccess',
    name: 'hotelpaysuccess',
    meta: {
      title: '支付中心',
      requiresAuth: true
    },
    component: () => import('@/pages/hotel/paysuccess')
  },
  {
    path: '/hotel/amap',
    name: 'amap',
    meta: {
      title: '酒店位置',
      requiresAuth: true
    },
    component: () => import('@/pages/hotel/amap')
  },
  {
    path: '/order/hotel-fram',
    name: 'hotel-fram',
    meta: {
      title: '订单详情',
      requiresAuth: true
    },
    component: () => import('@/pages/order/hotel-fram')
  },
  {
    path: '/order/hotel-rate',
    name: 'hotel-rate',
    meta: {
      title: '酒店评价',
      requiresAuth: true
    },
    component: () => import('@/pages/order/hotel-rate')
  },
]
