import { ShortlistSoldProperty } from "../entity/ShortListSoldProperty";


export class ShortlistSoldController{
    
    constructor()
    {
       
    }

    async shortListSold(shortListedData,uid,profileID)
    {
        const shortLister = new ShortlistSoldProperty();
        const response = await shortLister.sendSoldProperty(shortListedData,uid,profileID);
        return response;
    }


}