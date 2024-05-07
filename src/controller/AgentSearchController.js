import { AgentSearch } from "../entity/AgentSearch";




export class AgentSearchController{




    constructor()
    {

    }


    async pushSearch(searchInput,docStart)
    {

        const mySearcher = new AgentSearch();
        const result = await mySearcher.findSearchProperty(searchInput,docStart);

        return result;

        
    }

}