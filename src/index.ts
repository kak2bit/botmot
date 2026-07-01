import { Env } from "./types/env";
import router from "./router";

export default {
    async fetch(request: Request, env: Env) {

        console.log("🔥 WEBHOOK HIT");

        if (request.method !== "POST") {
            return new Response("OK");
        }

        try {
            const update = await request.json();

            console.log("📩 UPDATE:", JSON.stringify(update, null, 2));

            await router(env, update);

            console.log("✅ ROUTER DONE");

            return new Response("ok");

        } catch (err) {
            console.log("❌ ERROR IN WEBHOOK:", err);

            return new Response("error", { status: 500 });
        }
    }
};