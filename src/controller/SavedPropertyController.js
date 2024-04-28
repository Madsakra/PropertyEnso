import { SavedProperty } from "../entity/SavedProperty";


export class SavedPropertyController{

    constructor(authUser)
    {
        this.authUser = authUser;
    }


    async collectSavedProperty()
    {
        const mySave = new SavedProperty();
        const response = await mySave.fetchSavedProperty(this.authUser);
        return response;
    }



}