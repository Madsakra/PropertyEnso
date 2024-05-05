import { UpdatePropertyPrice } from "../entity/UpdatePropertyPrice";


export class UpdatePropertyPriceController
{


    constructor()
    {

    }



    async pushUpdates(property,newPrice)
    {
        const updater = new UpdatePropertyPrice();
        const result = await updater.updatePriceInDB(property,newPrice);

        return result;
    }


}