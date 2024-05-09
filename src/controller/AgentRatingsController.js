import { AgentRatings } from "../entity/AgentRatings";



export class AgentRatingsController{


    constructor()
    {

    }



    async pushFetchProcess(uid,currentProfileID)
    {
        const myFetcher = new AgentRatings();
        const result = await myFetcher.getRatings(uid,currentProfileID);
        return result;

    }



}