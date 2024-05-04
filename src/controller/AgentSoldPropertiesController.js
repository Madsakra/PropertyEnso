import { AgentSoldProperties } from "../entity/AgentSoldProperties";

export class AgentSoldPropertiesController
{

    constructor(authUser)
    {
        this.authUser = authUser;
    }

    async fetchSoldProperties()
    {
        const myAgentProps = new AgentSoldProperties();
        return await myAgentProps.getSoldAgentProperties(this.authUser);
        
    }




}