import { AgentData } from "../entity/AgentData";


export class AgentDataController
{
    constructor(){

    }


    async fetchAllAgent()
    {
        try{

            var myAgent = new AgentData();
            const result = await myAgent.fetchAllAgent();
            return result;

        }
        catch(err)
        {
            console.error(err);
        }
    }




}