import { SuspendProfiles } from "../entity/SuspendProfiles";



export class SuspendProfilesController{

    constructor()
    {

    }


    async pushSuspendProfiles(specificRole)
    {
        const suspender = new SuspendProfiles();
        const result = await suspender.suspendProfilesInDB(specificRole);

        return result;
    }


}