import { AgentReviews } from "../entity/AgentReviews";



export class AgentReviewsController{


    constructor()
    {

    }



    async pushFetchProcess(uid,currentProfileID)
    {
        const myFetcher = new AgentReviews();
        const result = await myFetcher.getReviews(uid,currentProfileID);
        return result;

    }



}