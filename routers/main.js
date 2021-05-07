const regMainRouter = (router) => {
    router.get("/", (ctx, next) => {
        ctx.body = "Hello!"
    })
}

module.exports = regMainRouter
