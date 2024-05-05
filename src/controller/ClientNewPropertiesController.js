import { ClientNewProperties } from "../entity/ClientNewProperties";

export class ClientNewPropertiesController
{

    constructor(authUser)
    {
        this.authUser = authUser;
    }

    async pushFetch()
    {
        const mySellerProps = new ClientNewProperties();
        return await mySellerProps.getNewClientProperty(this.authUser);
        
    }




}