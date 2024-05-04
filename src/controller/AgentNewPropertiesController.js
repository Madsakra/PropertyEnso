import { AgentNewProperties } from "../entity/AgentNewProperties";

export class AgentNewPropertiesController
{

    constructor(authUser)
    {
        this.authUser = authUser;
    }

    async fetchNewProperties()
    {
        const mySellerProps = new AgentNewProperties();
        return await mySellerProps.getNewAgentProperties(this.authUser);
        
    }




}