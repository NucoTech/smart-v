// 飞书请求API

/**
 * 获取 tenant_access_token
 * POST
 * https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal/
 */
const tenant_access_token_api =
    "https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal/"

/**
 * 发送消息API
 * https://open.feishu.cn/open-apis/im/v1/messages
 * POST
 */
const send_messages_api = "https://open.feishu.cn/open-apis/im/v1/messages"

module.exports = {
    tenant_access_token_api,
    send_messages_api
}
