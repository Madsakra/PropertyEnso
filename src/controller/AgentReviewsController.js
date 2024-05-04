import { AgentReviews } from "../entity/AgentReviews";



export class AgentReviewsController{


    constructor()
    {

    }



    async pushFetchProcess(authUser)
    {
        const myFetcher = new AgentReviews();
        const result = await myFetcher.getReviews(authUser);
        return result;

    }



}