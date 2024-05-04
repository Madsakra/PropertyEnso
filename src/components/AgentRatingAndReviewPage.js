import { useEffect, useState,useContext } from "react";

import { Context } from '../App';
import avatar from '../images/avatar.png';
import ReactLoading from "react-loading";
import { AgentRatingsController } from "../controller/AgentRatingsController";
import { AgentReviewsController } from "../controller/AgentReviewsController";

const AgentRatingAndReviewPage = ()=>{


    const [loading,setLoading] = useState(true);
    const [myRatings,setMyRatings] = useState([]);
    const [myReviews,setMyReviews] = useState([]);
    const {authUser} = useContext(Context);

    const [currentPanel,setCurrentPanel] = useState("ratings");

    async function fetchMyRatings()
    {
        setLoading(true);
        const fetchRatingsControl = new AgentRatingsController();
        const result = await fetchRatingsControl.pushFetchProcess(authUser);
        setMyRatings([...result]);
        setTimeout(()=>setLoading(false),1000);
    }

    async function fetchMyReviews()
    {
        setLoading(true);
        const fetchReviewsControl = new AgentReviewsController();
        const result = await fetchReviewsControl.pushFetchProcess(authUser);
        setMyReviews([...result]);
        setTimeout(()=>setLoading(false),1000);
    }




    useEffect(()=>{
        fetchMyRatings();
    },[])


    return (
        <>
        
        <div class="p-5 mb-4 rate-main bg-body-tertiary rounded-3">
            <div class="container-fluid py-5 rate-head-words text-center">
            <h1 class="display-3 fw-bold">Your Ratings And Reviews</h1>
            <p class="fs-2">Here Are Some FeedBack From The Customers</p>
            </div>
        </div>

    <div className='d-flex justify-content-center mb-5 '>
        <button className='w-25 btn btn-light shadow lg mb-3 m-2 fw-bold' onClick={()=>{
            setCurrentPanel("ratings");
            fetchMyRatings();
        }}>My Ratings
        </button>



        <button className='w-25 btn btn-dark shadow mb-3 m-2' onClick={()=>{
            setCurrentPanel("reviews");
            fetchMyReviews();
        }}>My Reviews
        </button>
      </div>



            {loading &&  
        <div className='d-flex align-items-center justify-content-center m-5 p-5'>
            <h1 className='display-1'>Loading</h1>
            <ReactLoading type={"bars"} className='ms-3'  color={"black"} />  
        </div>
        }
        

        
        {(!loading && currentPanel==="ratings") &&
        <div className="container-fluid">
           <div className="row">
          
           
            {myRatings.map((customer)=>{
                return (
                
                    <div className="col-md-4 d-flex justify-content-center mb-3 pb-5">
                        <div className="d-flex w-75 flex-column text-center align-items-center  justify-content-center agent-pill rounded-5  shadow-lg">
                            <img src={avatar} className='img-fluid' width="400vh"></img>

                            {/*USERNAME AND EMAIL NOT DISPLAYED AS IT WILL BE SUBJECT TO CHANGES, TO BE DISCUSSED*/}
                            <p className="fs-4">Customer UID: {customer.UID}</p>
                            <p className='fs-4'>Rated: {customer.rating} </p>
                        </div>
                    </div>
                    
     
                )
            })}

            
            </div>
        </div>
        }


        {(!loading && currentPanel==="reviews") &&
        <div className="container-fluid">
           <div className="row">
          
           
            {myReviews.map((customer)=>{
                return (

                    <div className="col-12 d-flex justify-content-center mb-3 pb-5">
                        <div className="d-flex w-75 p-4 flex-column text-center align-items-center h-100 justify-content-center agent-pill rounded-5  shadow-lg">
                            <img src={avatar} className='img-fluid' width="400vh"></img>

                            {/*USERNAME AND EMAIL NOT DISPLAYED AS IT WILL BE SUBJECT TO CHANGES, TO BE DISCUSSED*/}
                            <p className="fs-4">Customer UID: {customer.UID}</p>
                            <p className='fs-4'>Review: {customer.review} </p>
                        </div>
                    </div>
                )
            })}

            
            </div>
        </div>
        }







        
        </>
    )










}

export default AgentRatingAndReviewPage;
