import TelegramApi from "../telegram/api";
import type { Env } from "../types/env";

export default class TelegramService {

    private telegram: TelegramApi;

    constructor(
        env: Env
    ) {

        this.telegram = new TelegramApi(env);

    }

    sendMessage(
        chatId: number,
        text: string,
        keyboard: any = undefined
    ) {

        return this.telegram.sendMessage(

            chatId,

            text,

            keyboard

        );

    }

    editMessage(
        chatId: number,
        messageId: number,
        text: string,
        keyboard: any = undefined
    ) {

        return this.telegram.editMessage(

            chatId,

            messageId,

            text,

            keyboard

        );

    }

    answerCallbackQuery(
        callbackQueryId: string,
        text = ""
    ) {

        return this.telegram.answerCallbackQuery(

            callbackQueryId,

            text

        );

    }

    deleteMessage(
        chatId: number,
        messageId: number
    ) {

        return this.telegram.deleteMessage(
            chatId,
            messageId
        );

    }

    editReplyMarkup(
        chatId: number,
        messageId: number,
        keyboard: any
    ) {

        return this.telegram.editReplyMarkup(
            chatId,
            messageId,
            keyboard
        );

    }
}