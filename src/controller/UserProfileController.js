
import { UserProfile } from '../entity/UserProfile';

export class UserProfileController{
    constructor() {
   

    }

    async getProfileDetails(userID) {
        try {
            const userDataObj = new UserProfile();
            // REQUEST FOR ACCOUNT DATA FROM ENTITY, FIRESTORE CLASS
            const data = await userDataObj.retreiveData(userID);
            return data;

        } 
        catch (err) {
            console.error(err);
        
        };
    };






};

