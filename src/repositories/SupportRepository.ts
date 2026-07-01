import BaseRepository from "./BaseRepository";

export default class SupportRepository extends BaseRepository {

    async create(telegramId:number){

        const now=new Date().toISOString();

        const result=await this.db.run(

            `

            INSERT INTO supports(

                telegram_id,

                created_at,

                updated_at

            )

            VALUES(

                ?,?,?

            )

            `,

            [

                telegramId,

                now,

                now

            ]

        );

        return result.meta.last_row_id;

    }

    async addMessage(

        supportId:number,

        sender:number,

        message:string

    ){

        return await this.db.run(

            `

            INSERT INTO support_messages(

                support_id,

                sender,

                message,

                created_at

            )

            VALUES(

                ?,?,?,?

            )

            `,

            [

                supportId,

                sender,

                message,

                new Date().toISOString()

            ]

        );

    }
    async find(
        id: number
    ) {

        return await this.db.first(

            `
        SELECT *
        FROM supports
        WHERE id=?
        `,

            [

                id

            ]

        );

    }
}