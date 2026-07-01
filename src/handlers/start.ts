import TelegramService from "../services/TelegramService";
import UserService from "../services/UserService";
import type { Env } from "../types/env";
import mainKeyboard from "../keyboards/main";
import StateService from "../services/StateService";
import { States } from "../constants/states";
import { Buttons } from "../constants/buttons";

export default async function (
    env: Env,
    update: any
) {

    const telegram = new TelegramService(env);

    const users = new UserService(env);

    await users.register(
        update.message.from,
        env.ADMIN_ID
    );

    const state = new StateService(env);

    await state.set(
        update.message.from.id,
        States.MAIN
    );

    const keyboard = mainKeyboard();

    if (update.message.from.id.toString() === env.ADMIN_ID) {
        keyboard.keyboard.push([
            {
                text: Buttons.ADMIN
            }
        ]);
    }

    await telegram.sendMessage(
        update.message.chat.id,
        `سلام ${update.message.from.first_name} 🌹

به ربات خوش آمدید.`,
        keyboard
    );

}