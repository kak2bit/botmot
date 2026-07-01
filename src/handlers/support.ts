import TelegramService from "../services/TelegramService";
import StateService from "../services/StateService";
import SupportService from "../services/SupportService";
import supportKeyboard from "../keyboards/support";
import { States } from "../constants/states";
import mainKeyboard from "../keyboards/main";
import type { Env } from "../types/env";

export async function supportMenu(

    env:Env,

    update:any

){

    const state=new StateService(env);

    await state.set(

        update.message.from.id,

        States.WAIT_SUPPORT_MESSAGE

    );

    const telegram=new TelegramService(env);

    await telegram.sendMessage(

        update.message.chat.id,

        "پیام خود را ارسال کنید.",

        supportKeyboard()

    );

}

export async function saveSupport(

    env:Env,

    update:any

){

    const support=new SupportService(env);

    const telegram=new TelegramService(env);

    const state=new StateService(env);

    const ticket=await support.createTicket(

        update.message.from.id,

        update.message.text

    );

    await telegram.sendMessage(

        Number(env.ADMIN_ID),

        `📩 تیکت جدید

شماره: ${ticket}

کاربر:
${update.message.from.first_name}

آیدی:
${update.message.from.id}

----------------

${update.message.text}`

    );

    await state.clear(

        update.message.from.id

    );

    await telegram.sendMessage(

        update.message.chat.id,

        "✅ پیام شما ارسال شد.",

        mainKeyboard()

    );

}