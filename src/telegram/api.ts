import type { Env } from "../types/env";

export default class TelegramApi {

    constructor(
        private env: Env
    ) {}

    private async request(
        method: string,
        body: any
    ) {

        const response = await fetch(
            `https://api.telegram.org/bot${this.env.BOT_TOKEN}/${method}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }
        );

        return await response.json();

    }

    async sendMessage(
        chatId: number,
        text: string,
        replyMarkup: any = undefined
    ) {

        return this.request("sendMessage", {

            chat_id: chatId,

            text,

            parse_mode: "HTML",

            reply_markup: replyMarkup

        });

    }

    async editMessage(
        chatId: number,
        messageId: number,
        text: string,
        replyMarkup: any = undefined
    ) {

        return this.request("editMessageText", {

            chat_id: chatId,

            message_id: messageId,

            text,

            parse_mode: "HTML",

            reply_markup: replyMarkup

        });

    }

    async answerCallbackQuery(
        callbackQueryId: string,
        text = ""
    ) {

        return this.request("answerCallbackQuery", {

            callback_query_id: callbackQueryId,

            text

        });

    }

    async deleteMessage(
        chatId: number,
        messageId: number
    ) {

        return this.request("deleteMessage", {

            chat_id: chatId,

            message_id: messageId

        });

    }

    async editReplyMarkup(
        chatId: number,
        messageId: number,
        replyMarkup: any
    ) {

        return this.request(
            "editMessageReplyMarkup",
            {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: replyMarkup
            }
        );

    }
}