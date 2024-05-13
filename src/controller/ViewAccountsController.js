import { ViewAccounts } from "../entity/ViewAccounts";



export class ViewAccountsController{

    constructor()
    {

    }


    async pushFetch(startingVal,endingVal)
    {
        const myViewer = new ViewAccounts();
        
        const result = await myViewer.fetchAllAccounts(startingVal,endingVal);
        return result;
    }




}