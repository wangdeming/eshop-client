export const CartList = 'cart/index' //获取购物车的数据
export const CartAdd = 'cart/add' // 添加商品到购物车
export const BuyAdd = 'buy/add' // 直接购买
export const CartUpdate = 'cart/update' // 更新购物车的商品
export const CartDelete = 'cart/delete' // 删除购物车的商品
export const CartChecked = 'cart/checked' // 选择或取消选择商品
export const CartGoodsCount = 'cart/goodscount' // 获取购物车商品件数
export const CartCheckout = 'cart/checkout' // 下单前信息确认

export const OrderSubmit = 'order/submit' // 提交订单
export const PayPrepayId = 'pay/prepay' //获取微信统一下单prepay_id

export const CollectList = 'collect/list' //收藏列表
export const CollectAddOrDelete = 'collect/addordelete' //添加或取消收藏

export const CommentList = 'comment/list' //评论列表
export const CommentCount = 'comment/count' //评论总数
export const CommentPost = 'comment/post'  //发表评论

export const TopicList = 'topic/list' //专题列表
export const TopicDetail = 'topic/detail' //专题详情
export const TopicRelated = 'topic/related' //相关专题

export const FootprintList = 'footprint/list' //足迹列表
export const FootprintDelete = 'footprint/delete' //删除足迹

export const FeedbackAdd = 'feedback/save' //添加反馈
export const SmsCode = 'user/smscode' //发送短信
export const BindMobile = 'user/bindMobile' //绑定手机
export const Login = 'auth/login' //账号登录
export const Register = 'auth/register' //注册
export const CouponList = 'coupon/list' // 优惠券列表
export const GoodsCouponList = 'coupon/listByGoods' // 商品优惠券列表
export const OrderQuery = 'pay/query' //微信查询订单状态


//lingshan
export const adManager = 'shop/home/adManager' //广告位查询
export const orderNum = 'shop/personal/order/num' //统计订单数量
export const InfoUpdate = 'shop/personal/info/update' //收货地址列表
export const WechatloginAuth = 'wechatlogin/auth' //收货地址列表
export const AddressList = 'shop/personal/address/list' //收货地址列表
export const listAreasByPid = 'shop/personal/address/listAreasByPid' //收货游客列表
export const listArea = 'shop/personal/address/listArea' //收货地址列表
export const AddressAdd = 'shop/personal/address/add' //新增收获地址
export const AddressDetail = 'shop/personal/address/toEdit' //获取地址详情
export const AddressUpdate = 'shop/personal/address/update' //修改收货地址
export const AddressDelete = 'shop/personal/address/delete' //删除收货地址

export const TouristList = 'shop/personal/tourist/list' //收货游客列表
export const TouristListAdd = 'shop/personal/tourist/add' //新增游客
export const TouristDetail = 'shop/personal/tourist/toEdit' //获取地址详情
export const TouristListUpdate = 'shop/personal/tourist/update' //收货游客列表
export const TouristListDelete = 'shop/personal/tourist/delete' //收货游客列表

export const OrderList = 'shop/personal/order/list' //订单列表
export const OrderDetail = 'shop/personal/order/detail' //订单详情
export const OrderCancel = 'shop/personal/order/cancel' //取消订单
export const OrderLogistics = 'shop/personal/order/logistics' //查看物流信息
export const listOrderGoods4Eval = 'shop/goodsEvaluate/listOrderGoods4Eval' //评价订单商品
export const Evaluate = 'shop/goodsEvaluate/evaluate' //评价订单商品
export const OrderAddToCar = 'shop/personal/order/addToCar' //再来一单
export const OrderConfirm = 'shop/personal/order/confirm' //确认收货
export const imageUpload = 'file/image/upload' //确认收货
export const DetailEvaluate = 'shop/goodsEvaluate/detailEvaluate' //订单列表
export const ServiceOrder = 'shop/personal/order/serviceOrder' //订单列表
export const ShopPayPay = 'shop/pay/pay' //订单列表

export const secGoodsCategory = 'shop/home/secGoodsCategory' //查找销量前三的二级类目
export const listRecommendGoods = 'shop/home/listRecommendGoods' //推荐商品接口
export const listFirstCategory = 'shop/home/listFirstCategory' //查找所有一级类目
export const getSecCategoryById = 'shop/home/getSecCategoryById' //根据一级类目id获取相应的二级类目
export const queryGoodsInSecCategory = 'shop/home/queryGoodsInSecCategory' //二级类目页面以及在二级类目页面下搜索商品
export const queryGoods = 'shop/home/queryGoods' //商品搜索接口
export const delSearchHistory = 'shop/home/delSearchHistory' //商品搜索接口
export const hotRecommendInSearching = 'shop/home/hotRecommendInSearching' //展示商品数量最多的二级类目名称，数量限制5项
export const searchHistoryList = 'shop/home/searchHistoryList' //展示商品数量最多的二级类目名称，数量限制5项

export const ShopInfo = 'shop/shop/info' //根据店铺ID查询店铺信息
export const listShopLatestGoods = 'shop/goods/listShopLatestGoods' //查询最新商品列表
export const listShopGoods = 'shop/goods/listShopGoods' //分页获取店铺全部商品

export const DetailGoods = 'shop/goods/detailGoods' //查询商品详情
export const GetGoodsSku = 'shop/goods/getGoodsSku' //选择商品规格，获取规格商品信息
export const QueryEvalNum = 'shop/goodsEvaluate/queryEvalNum' //全部评价页面 查询评价数量
export const ListEvaluates = 'shop/goodsEvaluate/listEvaluates' //全部评价页面 查询评价数量
export const ShoppingCartAdd = 'shop/shoppingCart/add' //新增商品到购物车
export const ListNormalGoods = 'shop/shoppingCart/listNormalGoods' //获取购物车正常商品列表
export const ListExpireGoods = 'shop/shoppingCart/listExpireGoods' //获取购物车失效商品列表
export const CleanExpireGoods = 'shop/shoppingCart/clean' //清空购物车失效商品
export const AddOne = 'shop/shoppingCart/addOne' //购物车商品数量+1
export const MinusOne = 'shop/shoppingCart/minusOne' //购物车商品数量-1
export const DeleteShoppingCart = 'shop/shoppingCart/delete' //批量删除购物车商品
export const ShopOrderAddress = 'shop/order/address' //收获地址
export const Orderdetailfromshoppingcart = 'shop/order/orderdetailfromshoppingcart' //从购物车进入的确认订单展示数据接口
export const OrderdetailfromBuyNow = 'shop/order/orderdetail' //从立即购买进入的确认订单展示数据接口
export const Insertorderfromshoppingcart = 'shop/order/insertorderfromshoppingcart' //购物车提交订单微信支付接口
export const InsertorderfromBuyNow = 'shop/order/insertorder' //从立即购买进入的确认订单展示数据接口
export const ShopPayOrderquery = 'shop/pay/orderquery' //微信支付同步通知接口

export const OrderPayCheckServiced = '/shop/orderRefund/checkServiced' //校验订单商品是否可退款
export const OrderGetGoodsInfo4Refund ='/shop/orderRefund/getGoodsInfo4Refund' //申请退款页面获取订单商品信息
export const OrderApplyRefund= '/shop/orderRefund/applyRefund' //申请退款
export const OrderGetRefundDetail= '/shop/orderRefund/getRefundDetail' //退款详情
export const OrderListExpressCompanys= '/shop/orderRefund/listExpressCompanys' //获取快递公司集合
export const OrderAddLogistics= '/shop/orderRefund/addLogistics' //添加退货物流信息
export const OrderRevoke= '/shop/orderRefund/revoke' //用户撤销

export const Pagehotel= '/hotel/hotel/pagehotel' //分页查询酒店
export const Hotelhotel= '/hotel/hotel/hotel' //查询酒店
export const Listroom= '/hotel/hotel/listroom' //房间列表
export const Hoteltroom= '/hotel/hotel/room' //房间列表
export const Hotelcreateorder= '/hotel/order/createorder' //房间列表
export const HotelPay= '/hotel/pay/pay' //房间列表
export const HotelPageevaluate= '/hotel/hotel/pageevaluate' //房间列表

export const HotelOrderList= '/hotel/order/list' //酒店订单列表
export const HotelOrderDetail= '/hotel/order/detail' //订单详情
export const HotelOrderDelete= '/hotel/order/delete' //删除订单
export const HotelOrderCancel= '/hotel/order/cancel' //取消订单
export const HotelOrderEvaluate= '/hotel/order/evaluate' //提交评价

export const GoodsSkuNumMap= '/shop/goods/getGoodsSkuNumMap' //查询所有规格商品对应的库存数量
export const GoodsSkuStockList= '/shop/goods/getGoodsSkuStockList' //选中规格时，获取对应的规格商品库存数量集合
