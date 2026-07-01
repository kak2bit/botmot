import Database from "../database/Database";

export default abstract class BaseRepository {

    constructor(
        protected db: Database
    ) {}

}