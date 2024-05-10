import {ViewProfiles} from '../entity/ViewProfiles'


export class ViewProfilesController{

    constructor()
    {

    }


    async pushFetch(startingVal,endingVal)
    {
        const myFetcher = new ViewProfiles();
        const result = await myFetcher.fetchAllProfiles(startingVal,endingVal);


        return result;
    }



}
