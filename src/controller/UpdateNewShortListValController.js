import { UpdateNewShortListVal } from "../entity/UpdateNewShortListVal";

export class UpdateNewShortListValController{


    constructor()
    {

    }


    async updateShortlistValue(itemName,floorRange)
    {
        try{
            let updater = new UpdateNewShortListVal;
            await updater.sendViewsIntoDB(itemName,floorRange);
            // will not return anything since user is not supposed to know about view tracking
        }

        catch(err)
        {
            console.error(err);
        }
    }



}