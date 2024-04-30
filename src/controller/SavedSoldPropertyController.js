import { SavedSoldProperty } from "../entity/SavedSoldProperty";


export class SavedSoldPropertyController{

    constructor(authUser)
    {
        this.authUser = authUser;
    }


    async collectSoldProperty()
    {
        const mySave = new SavedSoldProperty();
        const response = await mySave.fetchSoldProperty(this.authUser);
        return response;
    }



}