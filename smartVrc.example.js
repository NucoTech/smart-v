module.exports = {
    port: 3000,
    Lark: {
        AppID: "",
        AppSecret: "",
        VerificationToken: ""
    },
    // 下面以腾讯企业邮箱为例
    email: {
        FromAddr: "", // 发件人
        ToAddr: "", // 收件人
        port: 465, // 发送邮箱端口
        MailServer: "smtp.exmail.qq.com" // 邮箱服务器
    }
}
