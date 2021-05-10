const { handleChatPrivate, handleChatGroup } = require("../handlers/lark")

const { verifyLarkToken } = require("../handlers/lark_common")

const regLarkRouter = (router) => {
    // 校验飞书卡片订阅
    router.post("/lark", async (ctx, next) => {
        const { challenge, type, token } = ctx.request.body
        if (verifyLarkToken(token) && type === "url_verification") {
            ctx.body = {
                challenge
            }
        } else {
            ctx.status = 403
        }
    })

    // 校验飞书事件订阅
    router.post("/lark/event", async (ctx, next) => {
        const { event } = ctx.request.body
        switch (event.chat_type) {
            case "private": {
                handleChatPrivate(event)
                break
            }
            case "group": {
                handleChatGroup(event)
                break
            }
        }
    })

    // 摇人功能
    // router.get("/lark/people", async (ctx, next) => {
    //     getTenantAccessToken()
    // })
}

module.exports = regLarkRouter
