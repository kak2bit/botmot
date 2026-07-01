import Database from "../database/Database";
import ConfigRepository from "../repositories/ConfigRepository";
import type { Env } from "../types/env";

export default class ConfigService {

    repository: ConfigRepository;

    constructor(

        env: Env

    ) {

        this.repository = new ConfigRepository(

            new Database(

                env.DB

            )

        );

    }

    async giveConfig(

        telegramId: number

    ) {

        let current = await this.repository.getUserConfig(

            telegramId

        );

        if (current) {

            return current;

        }

        const free = await this.repository.getFreeConfig();

        if (!free) {

            return null;

        }

        await this.repository.assign(

            free.id,

            telegramId

        );

        return await this.repository.getUserConfig(

            telegramId

        );

    }

    async changeConfig(

        telegramId: number

    ) {

        const current = await this.repository.getUserConfig(

            telegramId

        );

        if (current) {

            await this.repository.release(

                current.id

            );

        }

        const free = await this.repository.getFreeConfig();

        if (!free) {

            return null;

        }

        await this.repository.assign(

            free.id,

            telegramId

        );

        return await this.repository.getUserConfig(

            telegramId

        );

    }

    async add(config: string) {

        return await this.repository.add(
            config
        );

    }
    async list() {

        return await this.repository.list();

    }

    async delete(id: number) {

        return await this.repository.delete(id);

    }

    async find(id:number){

        return await this.repository.find(id);

    }
}