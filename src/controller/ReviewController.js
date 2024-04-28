import { Review } from "../entity/Review";


export class ReviewController{


    async sendData(review,reviewer,uniqueID,reviewerEmail,reviewerType,targetAgent)
    {

        const myPackage = {"reviewer": reviewer,
                            "UID": uniqueID,  
                            "email": reviewerEmail,
                            "userType":reviewerType,
                            "review":review
                            }


        try{
            var myReview = new Review();
            const result = await myReview.pushRate(myPackage,targetAgent);
            return result;
        }
        catch(err)
        {
            console.error(err);
        }
    }



}