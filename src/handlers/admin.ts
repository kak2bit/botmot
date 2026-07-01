import TelegramService from "../services/TelegramService";
import StateService from "../services/StateService";
import ConfigService from "../services/ConfigService";
import adminKeyboard from "../keyboards/admin";
import { States } from "../constants/states";
import type { Env } from "../types/env";

export async function panel(
    env: Env,
    update: any
) {

    if (update.message.from.id.toString() !== env.ADMIN_ID) {
        return;
    }

    const telegram = new TelegramService(env);

    await telegram.sendMessage(
        update.message.chat.id,
        "🛠 پنل مدیریت",
        adminKeyboard()
    );

}

export async function addConfig(
    env: Env,
    update: any
) {

    if (update.message.from.id.toString() !== env.ADMIN_ID) {
        return;
    }

    const telegram = new TelegramService(env);
    const state = new StateService(env);

    await state.set(
        update.message.from.id,
        States.ADMIN_ADD_CONFIG
    );

    await telegram.sendMessage(
        update.message.chat.id,
        "کانفیگ را ارسال کنید."
    );

}

export async function saveConfig(
    env: Env,
    update: any
) {

    if (update.message.from.id.toString() !== env.ADMIN_ID) {
        return;
    }

    const text = (update.message.text ?? "").trim();

    if (!text) {
        return;
    }

    const configService = new ConfigService(env);

    await configService.add(text);

    const state = new StateService(env);

    await state.clear(update.message.from.id);

    const telegram = new TelegramService(env);

    await telegram.sendMessage(
        update.message.chat.id,
        "✅ کانفیگ ذخیره شد.",
        adminKeyboard()
    );


}

export async function listConfigs(
    env: Env,
    update: any
) {

    const config = new ConfigService(env);

    const telegram = new TelegramService(env);

    const rows: any = await config.list();

    if (!rows.results.length) {

        return telegram.sendMessage(

            update.message.chat.id,

            "هیچ کانفیگی وجود ندارد."

        );

    }

    for (const item of rows.results) {

        const keyboard = {

            inline_keyboard: [

                [

                    {

                        text: "🗑 حذف",

                        callback_data: `delete_config:${item.id}`

                    }

                ]

            ]

        };

        await telegram.sendMessage(

            update.message.chat.id,

            `#${item.id}

<code>${item.config}</code>

وضعیت : ${item.status}

کاربر : ${item.first_name ?? "-"}

@${item.username ?? "-"}`,

            keyboard

        );

    }

}