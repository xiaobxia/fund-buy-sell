const getters = {
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  ifAddRouters: state => state.permission.ifAdd,
  // 用户信息部分
  userInfo: state => state.user.userInfo,
  isVipUser: state => state.user.isVipUser,
  buyActive: state => state.user.buyActive,
  // app部分
  wxList: state => state.app.wxList
}
export default getters
