import { RemoveListing } from "../entity/RemoveListing";



export class RemoveListingController{

    constructor()
    {

    }

    async pushForRemove(email,password,currentProperty)
    {
        
        const myRemover = new RemoveListing();
        const result = await myRemover.removeListingFromDB(email,password,currentProperty);

        return result;


    }



}


