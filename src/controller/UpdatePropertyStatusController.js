import { UpdatePropertyStatus } from "../entity/UpdatePropertyStatus";



export class UpdatePropertyStatusController
{


    constructor()
    {

    }



    async pushUpdates(property,newStatus)
    {
        const updater = new UpdatePropertyStatus();
        const result = await updater.updateStatus(property,newStatus);

        return result;
    }


}