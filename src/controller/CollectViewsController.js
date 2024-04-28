import { CollectViews } from "../entity/CollectViews";

export class CollectViewsController{


    constructor()
    {

    }


    async sendViews(itemName,floorRange)
    {
        try{
            let collector = new CollectViews;
            await collector.sendViewsIntoDB(itemName,floorRange);
            // will not return anything since user is not supposed to know about view tracking
        }

        catch(err)
        {
            console.error(err);
        }
    }



}