import Database from "../database/Database";
import AdminMessageRepository from "../repositories/AdminMessageRepository";
import type { Env } from "../types/env";

export default class AdminMessageService {

    repository: AdminMessageRepository;

    constructor(
        env: Env
    ) {

        this.repository = new AdminMessageRepository(
            new Database(env.DB)
        );

    }

    create(
        telegramMessageId: number,
        supportId: number
    ) {

        return this.repository.create(
            telegramMessageId,
            supportId
        );

    }

    find(
        telegramMessageId: number
    ) {

        return this.repository.findByTelegramMessageId(
            telegramMessageId
        );

    }

}