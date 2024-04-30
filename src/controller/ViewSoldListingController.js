import {ViewSoldListing} from '../entity/ViewSoldListing';


export class ViewSoldListingsController{
    constructor()
    {

    }


    async getSoldListings()
    {
        try{
                const listingObj = new ViewSoldListing();
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