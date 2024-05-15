import { Rate } from "../entity/Rate";


export class RateController{

    // change to rating
    async sendData(stars,rater,uniqueID,raterEmail,raterType,targetAgent)
    {

        const myPackage = {"rater": rater,
                            "UID": uniqueID,  
                            "email": raterEmail,
                            "userType":raterType,
                            "rating":stars
                            }


        try{
            var myRateAndReview = new Rate();
            const result = await myRateAndReview.pushRate(myPackage,targetAgent);
            return result;
        }
        catch(err)
        {
            console.error(err);
        }
    }



}