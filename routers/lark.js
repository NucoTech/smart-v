const { verifyLarkToken } = require("../handlers/lark")

const regLarkRouter = (router) => {
    // 校验飞书事件订阅
    router.post("/lark", async (ctx, next) => {
        const { challenge, type, token } = ctx.request.body
        if (verifyLarkToken(token) && type === "url_verification") {
            ctx.body = {
                challenge,
            }
        } else {
            ctx.status = 403
        }
    })
}

module.exports = regLarkRouter
