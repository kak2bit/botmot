import startHandler from "./handlers/start";
import { Buttons } from "./constants/buttons";
import { States } from "./constants/states";
import { getConfig, changeConfig } from "./handlers/config";
import { panel, addConfig, saveConfig, listConfigs } from "./handlers/admin";
import { supportMenu, saveSupport } from "./handlers/support";
import StateService from "./services/StateService";
import callbackHandler from "./handlers/callback";

export default async function router(env: any, update: any) {
    try {
        console.log("🔥 UPDATE RECEIVED:", JSON.stringify(update));

        // =========================
        // CALLBACK QUERY HANDLER
        // =========================
        if (update.callback_query) {
            console.log("📩 CALLBACK QUERY");

            return await callbackHandler(env, update);
        }

        // =========================
        // MESSAGE EXTRACT SAFE
        // =========================
        const message = update.message || update.edited_message;

        if (!message) {
            console.log("⚠️ NO MESSAGE UPDATE:", update);
            return;
        }

        const text = (message.text || "").trim();

        if (!text) {
            console.log("⚠️ NON-TEXT MESSAGE:", message);
            return;
        }

        const userId = message.from?.id;

        console.log("👤 USER:", userId, "TEXT:", text);

        // =========================
        // COMMAND / BUTTON ROUTING
        // =========================
        switch (text) {
            case "/start":
                return await startHandler(env, update);

            case Buttons.FREE_CONFIG:
                return await getConfig(env, update);

            case Buttons.CHANGE_CONFIG:
                return await changeConfig(env, update);

            case Buttons.ADMIN:
                return await panel(env, update);

            case Buttons.ADD_CONFIG:
                return await addConfig(env, update);

            case Buttons.LIST_CONFIGS:
                return await listConfigs(env, update);

            case Buttons.SUPPORT:
                return await supportMenu(env, update);

            case Buttons.BACK:
                return await startHandler(env, update);
        }

        // =========================
        // STATE HANDLING
        // =========================
        const stateService = new StateService(env);
        const state = await stateService.get(userId);

        console.log("📦 STATE:", state);

        if (!state) {
            return;
        }

        switch (state.state) {
            case States.ADMIN_ADD_CONFIG:
                return await saveConfig(env, update);

            case States.WAIT_SUPPORT_MESSAGE:
                return await saveSupport(env, update);
        }

    } catch (err) {
        console.log("❌ ROUTER ERROR:", err);
    }
}