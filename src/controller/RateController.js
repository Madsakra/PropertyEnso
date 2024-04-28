import { Rate } from "../entity/Rate";


export class RateController{


    async sendData(stars,reviewer,uniqueID,reviewerEmail,reviewerType,targetAgent)
    {

        const myPackage = {"reviewer": reviewer,
                            "UID": uniqueID,  
                            "email": reviewerEmail,
                            "userType":reviewerType,
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