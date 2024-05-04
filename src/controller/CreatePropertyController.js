import { CreateProperty } from "../entity/CreateProperty";




export class CreatePropertyController{

    constructor(){

    }



    async pushCreation(myPackage,image,street)
    {
        try{

            const myCreator = new CreateProperty();
            const result = await myCreator.createNewProperty(myPackage,image,street);
            return result;

        }
        catch(err)
        {
            console.error(err);
        }
    }


}