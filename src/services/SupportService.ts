import Database from "../database/Database";
import SupportRepository from "../repositories/SupportRepository";
import type { Env } from "../types/env";

export default class SupportService{

    repository:SupportRepository;

    constructor(env:Env){

        this.repository=new SupportRepository(

            new Database(env.DB)

        );

    }

    async createTicket(

        telegramId:number,

        message:string

    ){

        const id=await this.repository.create(

            telegramId

        );

        await this.repository.addMessage(

            id,

            telegramId,

            message

        );

        return id;

    }
    async find(
        id:number
    ){

        return this.repository.find(id);

    }
}