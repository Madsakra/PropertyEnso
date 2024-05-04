import { useEffect, useState,useContext } from "react";
import AgentTabMini from "./AgentTabMini";
import { AgentDataController } from "../controller/AgentDataController";
import { Context } from '../App';
import { RateController } from "../controller/RateController";
import { ReviewController } from "../controller/ReviewController";
import ReactLoading from "react-loading";

const RateAndReviewPage = ()=>{


    const [loading,setLoading] = useState(true);
    const [agents,setAgents] = useState([]);
    const {authUser,userName,userType} = useContext(Context);


    
    async function fetchAllAgent()
    {
        let myAgent = new AgentDataController();
        await myAgent.fetchAllAgent().then((result)=>{
            setAgents([...result]);
        });
        setTimeout(()=>setLoading(false),1000);
    }


    async function sendReview(review,index)
    {
        // consider passing in UID since accounts can change but not primary key
        const reviewer = userName;
        const reviewerEmail = authUser.email;
        const uniqueID = authUser.uid;
        const reviewerType = userType;
        let targetAgent = agents[index];     
        let myReview = new ReviewController();
        await myReview.sendData(review,reviewer,uniqueID,reviewerEmail,reviewerType,targetAgent).then((result)=>{
            if (result)
            {
                setLoading(true);
                alert("Your Review Has Been Added, Thank You")
            }
        })
        
    }


    async function sendRating(stars,index)
    {
        const reviewer = userName;
        const reviewerEmail = authUser.email;
        const uniqueID = authUser.uid;
        const reviewerType = userType;
        let targetAgent = agents[index];
        let myRate = new RateController();
        await myRate.sendData(stars,reviewer,uniqueID,reviewerEmail,reviewerType,targetAgent).then((result)=>{
            if (result)
            {
                alert("Your Rating has been recorded, Thank You");
            }
        })
    }

 
   
    useEffect(()=>{

        fetchAllAgent();

    },[!loading])

  


    return (
        <>
        <div class="p-5 mb-4 rate-main bg-body-tertiary rounded-3">
            <div class="container-fluid py-5 rate-head-words text-center">
            <h1 class="display-3 fw-bold">Our Agents</h1>
            <p class="fs-2">Your Ratings And Review Helps Us Go The Long Way</p>
            </div>
        </div>
            {loading &&  
        <div className='d-flex align-items-center justify-content-center m-5 p-5'>
            <h1 className='display-1'>Loading</h1>
            <ReactLoading type={"bars"} className='ms-3'  color={"black"} />  
        </div>
        }
        
        {!loading &&
        <div className="container-fluid">
           <div className="row">
          
            {agents.map((agent,index)=>{
                return <AgentTabMini index={index} 
                                     agent={agent}
                                     sendRating = {sendRating}
                                     sendReview={sendReview} />
            })}

            
            </div>
        </div>
        }

        </>
    )




}

export default RateAndReviewPage;