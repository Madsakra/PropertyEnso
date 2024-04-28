import { UpdateShortList } from "../entity/UpdateShortList";

export class UpdateShortListController{


    constructor()
    {

    }


    async updateShortlistValue(itemName,floorRange)
    {
        try{
            let updater = new UpdateShortList;
            await updater.sendViewsIntoDB(itemName,floorRange);
            // will not return anything since user is not supposed to know about view tracking
        }

        catch(err)
        {
            console.error(err);
        }
    }



}