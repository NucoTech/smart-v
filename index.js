const Koa = require("koa")
const app = new Koa()
const bodyParser = require("koa-body")
const static = require("koa-static")

const path = require("path")

const router = require("./routers/index")

const { Port } = require("./smartVrc")

app.use(static(path.resolve(__dirname, "./public")))

app.use(
    bodyParser({
        enableTypes: ["json"]
    })
)
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(Port, () => {
    console.log(`服务启动At: http://localhost:${port}`)
})
