import { getDocs,addDoc } from 'firebase/firestore';
import { UserData } from '../entity/UserData';

export class UserDataController{
    constructor(authUser,setUserProfileCreated, setUserName,setUserType,setProfileID) {
   
        this.authUser = authUser;
        this.setUserProfileCreated = setUserProfileCreated;
        this.setUserName = setUserName;
        this.setUserType = setUserType;
        this.setProfileID = setProfileID;
    }

    async getAllUserDetails() {
        try {
            const userDataObj = new UserData();
            // REQUEST FOR ACCOUNT DATA FROM ENTITY, FIRESTORE CLASS
            const data = await userDataObj.retreiveData();

            // DATA COMES BACK
            data.docs.map((doc)=>{
                const docID = doc.id;
                const docData = doc.data();

                if (docData?.email === this.authUser.email) {
                    // USER PROFILE EXIST
                    this.setUserProfileCreated(true);
                    this.setUserName(docData.userName);
                    this.setUserType(docData.type);
                    this.setProfileID(docID);
                    return true;
                }
                else{

                    // USER PROFILE DON'T EXIST, LEAVE ALL THE STATES IN DEFAULT CONDITION
                    return false;
                }
            })
     
        } 
        catch (err) {
            console.error(err);
        
        };
    };


    async writeNewAccount(newEmail,newType,newUserName)
    {
        const userDataObj = new UserData();
        // REQUEST FOR ACCOUNT DATA FROM ENTITY, FIRESTORE CLASS
        try{
            await userDataObj.sendData(newEmail,newType,newUserName);
            
        }
        catch(error)
        {
            throw(error);
        }
    }


    async fetchSavedProperty()
    {
        const userDataObj = new UserData();
        let docuID = "";
        const response = await userDataObj.fetchSavedProperty(this.authUser);
        return response;
    }

    async removeSelectedSave(id)
    {
        const userDataObj = new UserData();
        const response = await userDataObj.removeSelectedSave(this.authUser,id);
        return response;
    }


};

