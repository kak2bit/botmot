import BaseRepository from "./BaseRepository";
import type { UserState } from "../models/UserState";

export default class UserStateRepository extends BaseRepository {

    async find(telegramId: number) {

        return await this.db.first<UserState>(

            `
            SELECT *
            FROM user_states
            WHERE telegram_id=?
            `,

            [telegramId]

        );

    }

    async set(
        telegramId: number,
        state: string,
        data: any = null
    ) {

        return await this.db.run(

            `
            INSERT INTO user_states(

                telegram_id,

                state,

                data

            )

            VALUES(

                ?,?,?

            )

            ON CONFLICT(telegram_id)

            DO UPDATE SET

                state=excluded.state,

                data=excluded.data

            `,

            [

                telegramId,

                state,

                JSON.stringify(data)

            ]

        );

    }

    async clear(
        telegramId: number
    ) {

        return await this.db.run(

            `
            DELETE FROM user_states
            WHERE telegram_id=?
            `,

            [

                telegramId

            ]

        );

    }

}