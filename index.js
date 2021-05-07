const Koa = require("koa")
const app = new Koa()
const bodyParser = require("koa-body")
const router = require("./routers/index")

const { port } = require("./smartVrc")

app.use(
    bodyParser({
        enableTypes: ["json"],
    })
)
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(port, () => {
    console.log(`服务启动At: http://localhost:${port}`)
})
