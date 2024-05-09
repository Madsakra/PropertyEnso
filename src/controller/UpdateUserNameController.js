import { UpdateUserName } from "../entity/UpdateUserName";



export class UpdateUserNameController{


    constructor()
    {

    }


    async pushUpdateUserName(accountRefNo,newName)
    {
        const updater = new UpdateUserName();
        const result = await updater.updateNameInDB(accountRefNo,newName);
        return result;
    }


}