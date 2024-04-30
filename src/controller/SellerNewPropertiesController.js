import { SellerNewProperties } from "../entity/SellerNewProperties";

export class SellerNewPropertiesController
{

    constructor(authUser)
    {
        this.authUser = authUser;
    }

    async fetchNewProperties()
    {
        const mySellerProps = new SellerNewProperties();
        return await mySellerProps.getNewSellerProperties(this.authUser);
        
    }




}