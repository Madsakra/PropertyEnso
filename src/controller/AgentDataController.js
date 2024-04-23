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

    async sendData(myPackage,targetAgent)
    {
        try{
            var myAgent = new AgentData();
            const result = await myAgent.sendData(myPackage,targetAgent);
            return result;
        }
        catch(err)
        {
            console.error(err);
        }
    }


}