const router = require("koa-router")()

// 引入路由
const regMainRouter = require("./main")
const regLarkRouter = require("./lark")

// 注册主路由
regMainRouter(router)

// 注册飞书业务路由
regLarkRouter(router)

module.exports = router
