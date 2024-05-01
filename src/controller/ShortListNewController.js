import { ShortlistNewProperty } from "../entity/ShortListNewProperty";


export class ShortlistNewController{
    
    constructor(authUser)
    {
        this.authUser = authUser;
    }

    async shortListNew(shortListedData)
    {
        const shortLister = new ShortlistNewProperty();
        const response = await shortLister.sendNewProperty(shortListedData,this.authUser);
        return response;
    }


}