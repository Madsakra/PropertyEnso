import { useEffect, useState,useContext } from "react";
import AgentTabMini from "./AgentTabMini";
import { AgentDataController } from "../controller/AgentDataController";
import { Context } from '../App';


const RateAndReviewMain = ()=>{


    const [loading,setLoading] = useState(true);
    const [agents,setAgents] = useState([]);
    const {authUser,userName,userType} = useContext(Context);

    async function fetchAllAgent()
    {
        let myAgent = new AgentDataController();
        await myAgent.fetchAllAgent().then((result)=>{
            setAgents([...result]);
        });
        setLoading(false);
    }


    async function collectDataFromForms(stars,review,index)
    {
        const myPackage = {"reviewer":userName,
                            "email":authUser.email,
                            "userType":userType,
                            "ratings":stars,
                            "reviews":review}
        let targetAgent = agents[index];
        let myAgent = new AgentDataController();
        await myAgent.sendData(myPackage,targetAgent).then((result)=>{
            if (result)
            {
                setLoading(true);
                alert("Your Review Has Been Added, Thank You")
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
        
        {!loading &&
        <div className="container-fluid">
           <div className="row">
            
            {agents.map((agent,index)=>{
                return <AgentTabMini index={index} 
                                     agent={agent}
                                     
                                     collectDataFromForms={collectDataFromForms} />
            })}
            </div>
        </div>
        }

        </>
    )




}

export default RateAndReviewMain;