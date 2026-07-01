import startHandler from "./handlers/start";
import { Buttons } from "./constants/buttons";
import { States } from "./constants/states";
import { getConfig, changeConfig } from "./handlers/config";
import { panel, addConfig, saveConfig } from "./handlers/admin";
import StateService from "./services/StateService";
import callbackHandler from "./handlers/callback";
import { listConfigs } from "./handlers/admin";
import { supportMenu, saveSupport } from "./handlers/support";

export default async function (
    env: any,
    update: any
) {

    if (update.callback_query) {

        const callbackHandler = await import("./handlers/callback");

        return callbackHandler.default(

            env,

            update

        );

    }

    if (!update.message) {
        return;
    }

    const text = (update.message.text ?? "").trim();

    switch (text) {

        case "/start":
            return startHandler(env, update);

        case Buttons.FREE_CONFIG:
            return getConfig(env, update);

        case Buttons.CHANGE_CONFIG:
            return changeConfig(env, update);

        case Buttons.ADMIN:
            return panel(env, update);

        case Buttons.ADD_CONFIG:
            return addConfig(env, update);

        case Buttons.LIST_CONFIGS:

            return listConfigs(

                env,

                update

            );

        case Buttons.SUPPORT:

            return supportMenu(
                env,
                update
            );

        case Buttons.BACK:

            return startHandler(
                env,
                update
            );
    }

    const stateService = new StateService(env);

    const state = await stateService.get(
        update.message.from.id
    );

    if (!state) {
        return;
    }

    switch (state.state) {

        case States.ADMIN_ADD_CONFIG:
            return saveConfig(env, update);

        case States.WAIT_SUPPORT_MESSAGE:

            return saveSupport(
                env,
                update
            );
    }

}