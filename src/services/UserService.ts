import Database from "../database/Database";
import UserRepository from "../repositories/UserRepository";
import type { Env } from "../types/env";

export default class UserService {

    private repository: UserRepository;

    constructor(

        env: Env

    ) {

        this.repository = new UserRepository(

            new Database(

                env.DB

            )

        );

    }

    async register(

        telegramUser: any,

        adminId: string

    ) {

        let user = await this.repository.findByTelegramId(

            telegramUser.id

        );

        if (user) {

            return user;

        }

        await this.repository.create(

            telegramUser

        );

        if (telegramUser.id.toString() === adminId) {

            await this.repository.updateAdmin(

                telegramUser.id,

                1

            );

        }

        return await this.repository.findByTelegramId(

            telegramUser.id

        );

    }

}