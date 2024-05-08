import { SavedSoldProperty } from "../entity/SavedSoldProperty";


export class SavedSoldPropertyController{

    constructor()
    {
     
    }


    async collectSoldProperty(uid,profileID)
    {
        const mySave = new SavedSoldProperty();
        const response = await mySave.fetchSoldProperty(uid,profileID);
        return response;
    }



}