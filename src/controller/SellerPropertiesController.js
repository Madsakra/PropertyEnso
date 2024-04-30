import { SellerProperties } from "../entity/SellerProperties";

export class SellerPropertiesController
{

    constructor(authUser)
    {
        this.authUser = authUser;
    }

    async fetchAllSellerProperties()
    {
        const mySellerProps = new SellerProperties();
        return await mySellerProps.getSellerProperties(this.authUser);
        
    }




}