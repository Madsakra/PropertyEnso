import {UpdateSoldShortListVal} from "../entity/UpdateSoldShortListVal";

export class UpdateSoldShortListValController{


    constructor()
    {

    }


    async updateShortlistValue(itemName,floorRange)
    {
        try{
            let updater = new UpdateSoldShortListVal;
            await updater.sendViewsIntoDB(itemName,floorRange);
            // will not return anything since user is not supposed to know about view tracking
        }

        catch(err)
        {
            console.error(err);
        }
    }



}