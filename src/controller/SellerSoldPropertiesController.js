import { SellerSoldProperties } from "../entity/SellerSoldProperties";

export class SellerSoldPropertiesController
{

    constructor(authUser)
    {
        this.authUser = authUser;
    }

    async pushFetch()
    {
        const mySellerProps = new SellerSoldProperties();
        return await mySellerProps.getSoldSellerProperties(this.authUser);
        
    }




}