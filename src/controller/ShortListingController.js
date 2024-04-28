import { Shortlister } from "../entity/ShortLister";


export class ShortListingController{
    
    constructor(authUser)
    {
        this.authUser = authUser;
    }

    async shortListNow(shortListedData)
    {
        const shortLister = new Shortlister();
        const response = await shortLister.sendSavedProperty(shortListedData,this.authUser);
        return response;
    }


}