import type { Env } from "../types/env";
import ConfigService from "../services/ConfigService";
import TelegramService from "../services/TelegramService";

export default async function (

    env: Env,

    update: any

) {

    const telegram = new TelegramService(env);

    const data = update.callback_query.data;

    const callbackId = update.callback_query.id;

    const chatId = update.callback_query.message.chat.id;

    const messageId = update.callback_query.message.message_id;

    if (data.startsWith("delete_config:")) {

        const id = Number(

            data.split(":")[1]

        );

        const config = new ConfigService(env);

        const row = await config.find(id);

        if (!row) {

            await telegram.answerCallbackQuery(

                callbackId,

                "کانفیگ پیدا نشد."

            );

            return;

        }

        await config.delete(id);

        await telegram.deleteMessage(

            chatId,

            messageId

        );

        await telegram.answerCallbackQuery(

            callbackId,

            "حذف شد."

        );

        return;

    }

}