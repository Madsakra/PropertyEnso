import { ShortlistSoldProperty } from "../entity/ShortListSoldProperty";


export class ShortlistSoldController{
    
    constructor(authUser)
    {
        this.authUser = authUser;
    }

    async shortListSold(shortListedData)
    {
        const shortLister = new ShortlistSoldProperty();
        const response = await shortLister.sendSoldProperty(shortListedData,this.authUser);
        return response;
    }


}