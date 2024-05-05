import { AgentSearch } from "../entity/AgentSearch";




export class AgentSearchController{




    constructor()
    {

    }


    async pushSearch(searchInput)
    {

        const mySearcher = new AgentSearch();
        const result = await mySearcher.findSearchProperty(searchInput);
        return result;
    }

}