import type { Env } from "../types/env";

export default class TelegramService {
    private token: string;

    constructor(env: Env) {
        this.token = env.BOT_TOKEN;
    }

    private async request(method: string, payload: any) {
        const url = `https://api.telegram.org/bot${this.token}/${method}`;

        console.log("📤 TELEGRAM REQUEST:", method, payload);

        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data = await res.json();

        console.log("📥 TELEGRAM RESPONSE:", data);

        if (!data.ok) {
            console.log("❌ TELEGRAM ERROR:", data);
        }

        return data;
    }

    // =========================
    // SEND MESSAGE
    // =========================
    async sendMessage(
        chatId: number | string,
        text: string,
        keyboard?: any
    ) {
        return this.request("sendMessage", {
            chat_id: chatId,
            text,
            parse_mode: "HTML",
            reply_markup: keyboard,
        });
    }

    // =========================
    // EDIT MESSAGE
    // =========================
    async editMessage(
        chatId: number | string,
        messageId: number,
        text: string,
        keyboard?: any
    ) {
        return this.request("editMessageText", {
            chat_id: chatId,
            message_id: messageId,
            text,
            parse_mode: "HTML",
            reply_markup: keyboard,
        });
    }

    // =========================
    // ANSWER CALLBACK
    // =========================
    async answerCallback(callbackQueryId: string, text?: string) {
        return this.request("answerCallbackQuery", {
            callback_query_id: callbackQueryId,
            text,
        });
    }

    // =========================
    // DELETE MESSAGE
    // =========================
    async deleteMessage(chatId: number | string, messageId: number) {
        return this.request("deleteMessage", {
            chat_id: chatId,
            message_id: messageId,
        });
    }
}