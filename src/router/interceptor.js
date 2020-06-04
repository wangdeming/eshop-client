const INACCESSIBLE_LOGIN_ROUTES = ['/login', '']

export const routerInterceptor = (router) => {
  router.beforeEach((to, from, next) => {
    let reg = new RegExp("(^|&)code=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if(!localStorage.getItem('token')){
      if(to.query.code){
        localStorage.setItem('token',to.query.code)
      }else if(r && r[2]){
        localStorage.setItem('token',r[2])
      }
    }
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!localStorage.getItem('token')) {
        let curl=window.location.href;
        window.location.href = process.env.API_HOST + "wechatlogin/auth?url=" + curl;
      } else {
        next()
      }
    } else {
      if (localStorage.getItem('token') && INACCESSIBLE_LOGIN_ROUTES.includes(to.path)) {
        next('/home')
      }
      next()
    }
  })
}
