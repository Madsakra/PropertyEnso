import { ShortlistNewProperty } from "../entity/ShortListNewProperty";


export class ShortlistNewController{
    
    constructor()
    {
        
    }

    async shortListNew(shortListedData,uid,profileID)
    {
        const shortLister = new ShortlistNewProperty();
        const response = await shortLister.sendNewProperty(shortListedData,uid,profileID);
        console.log(response);
        return response;
    }


}