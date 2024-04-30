import {ViewNewListing} from '../entity/ViewNewListing';




export class ViewNewListingsController{
    constructor()
    {

    }


    async getNewListings()
    {
        try{
                const listingObj = new ViewNewListing();
                const response = await listingObj.fetchListing();

                // return array to view listing page, let view page map 
                return response;

            }
            catch(err)
            {
                console.error(err);
            }
    };





}