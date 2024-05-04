import { AgentRatings } from "../entity/AgentRatings";



export class AgentRatingsController{


    constructor()
    {

    }



    async pushFetchProcess(authUser)
    {
        const myFetcher = new AgentRatings();
        const result = await myFetcher.getRatings(authUser);
        return result;

    }



}