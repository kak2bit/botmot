import { Env } from "./types/env";
import router from "./router";

export default {

    async fetch(

        request: Request,

        env: Env

    ) {

        if (request.method !== "POST") {

            return new Response("OK");

        }

        const update = await request.json();

        await router(

            env,

            update

        );

        return new Response("ok");

    }

}