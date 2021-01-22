const getters = {
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  ifAddRouters: state => state.permission.ifAdd,
  // 用户信息部分
  userInfo: state => state.user.userInfo
}
export default getters
