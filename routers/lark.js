const { verifyLarkToken, getTenantAccessToken } = require("../handlers/lark")

const regLarkRouter = (router) => {
    // 校验飞书卡片订阅
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

    // 校验飞书事件订阅
    router.post("/lark/event", async(ctx, next) => {
        const { challenge, type, token } = ctx.request.body
        if (verifyLarkToken(token) && type === "url_verification") {
            ctx.body = {
                challenge
            }
        } else {
            ctx.status = 403
        }
    })

    // 摇人功能
    // router.get("/lark/people", async (ctx, next) => {
    //     getTenantAccessToken()
    // })
}

module.exports = regLarkRouter
