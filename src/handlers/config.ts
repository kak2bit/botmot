import ConfigService from "../services/ConfigService";
import TelegramService from "../services/TelegramService";
import configKeyboard from "../keyboards/config";
import type { Env } from "../types/env";

export async function getConfig(

    env: Env,

    update: any

) {

    const config = new ConfigService(

        env

    );

    const telegram = new TelegramService(

        env

    );

    const result = await config.giveConfig(

        update.message.from.id

    );

    if (!result) {

        return telegram.sendMessage(

            update.message.chat.id,

            "❌ هیچ کانفیگی موجود نیست."

        );

    }

    return telegram.sendMessage(

        update.message.chat.id,

        `<code>${result.config}</code>`,

        configKeyboard()

    );

}

export async function changeConfig(

    env: Env,

    update: any

) {

    const config = new ConfigService(

        env

    );

    const telegram = new TelegramService(

        env

    );

    const result = await config.changeConfig(

        update.message.from.id

    );

    if (!result) {

        return telegram.sendMessage(

            update.message.chat.id,

            "❌ کانفیگ جدیدی موجود نیست."

        );

    }

    return telegram.sendMessage(

        update.message.chat.id,

        `<code>${result.config}</code>`,

        configKeyboard()

    );

}