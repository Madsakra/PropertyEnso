import { UpdateDescription } from "../entity/UpdateDescription";



export class UpdateDescriptionController{


    constructor()
    {

    }


    async pushUpdateDescription(profileID,newDescription)
    {
        const updater = new UpdateDescription();
        const result = await updater.updateDescriptionInDB(profileID,newDescription);

        return result;
    }


}