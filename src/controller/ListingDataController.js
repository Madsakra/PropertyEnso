import {Listing} from '../entity/Listing';




export class ListingDataController{
    constructor()
    {

    }


    async getAllListing()
    {
        try{
                const listingObj = new Listing();
                const data = await listingObj.fetchListing();
                const response = data.docs.map((doc)=>({...doc.data()}));
                // return array to view listing page, let view page map 
                return response;

            }
            catch(err)
            {
                console.error(err);
            }
    };





}