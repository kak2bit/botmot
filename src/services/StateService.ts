import Database from "../database/Database";
import UserStateRepository from "../repositories/UserStateRepository";
import type { Env } from "../types/env";

export default class StateService {

    repository: UserStateRepository;

    constructor(

        env: Env

    ) {

        this.repository = new UserStateRepository(

            new Database(

                env.DB

            )

        );

    }

    async get(
        telegramId: number
    ) {

        return await this.repository.find(

            telegramId

        );

    }

    async set(
        telegramId: number,
        state: string,
        data: any = null
    ) {

        return await this.repository.set(

            telegramId,

            state,

            data

        );

    }

    async clear(
        telegramId: number
    ) {

        return await this.repository.clear(

            telegramId

        );

    }

}