import Form from 'react-bootstrap/Form';
import magni from '../svg/magnify.svg'
import { useState, useEffect } from 'react';
import { AgentSearchController } from '../controller/AgentSearchController';
import ReactLoading from "react-loading";


import AgentSearchResult from './AgentSearchResult';


const AgentSearchPage = ()=>{



    const [searchInput,setSearchInput] = useState("");
    const [searchResults,setSearchResults] = useState([]);
    const [loading,setLoading] = useState(false);
 


   
    const [haveMore,setHaveMore] = useState(true);

    
    const [stoppedDocIndex,setStoppedDocIndex ]= useState(0);
    const [stoppedPropIndex,setStoppedPropIndex] = useState(0)

    const [finishSearch,setFinishSearch] = useState(false);

    async function searchForProperty()
    {
                const searchController = new AgentSearchController();    
                const result = await searchController.pushSearch(searchInput,stoppedDocIndex,stoppedPropIndex);
                
                if (!result)
                {
                    alert("no more results left")
                    setHaveMore(false);
                }

                else{
                    setSearchResults(fullArray=>fullArray.concat(result.mySaved));
                    setStoppedDocIndex(result.stoppedDocIndex);
                }


                
                // LOAD THEN DISPLAY DATA
                setTimeout(()=>{
                    setFinishSearch(true);
                    setLoading(false);
                    
                },1000)

    }


    function restart(){
        setFinishSearch(false);
        setSearchResults([]);
        setHaveMore(true);
        setStoppedDocIndex(0);
        setStoppedPropIndex(0);

    }

    useEffect(()=>{
        console.log(stoppedDocIndex)
    })


    return(

        <>
        
        <div class="p-5 mb-2 search-head bg-body-tertiary rounded-3">
          <div class="container-fluid py-5 listings-head-words text-center">
          <h1 class="display-5 fw-bold">Search For Property</h1>
          {!finishSearch && <p class="fs-4">Please Enter The Name Of The Property You Want To Search For</p>}
          {finishSearch && <p className='fs-2'>Search Results: {searchResults.length}</p>}
          </div>
        </div>

        {(!finishSearch && !loading) && <div className='container agent-search-container'>
        <h1 className='display-4 pb-3'>Start Searching For Your Desired Property</h1>
        <div className='d-flex'>

        <Form.Control className='agent-search-bar' type="text" placeholder="Search Property..." 
                                                               onChange={e=>setSearchInput(e.target.value)}/>
        
        <button className='btn btn-light ms-2 h-75' onClick={searchForProperty}>
            <img src={magni} height="20vh"></img>
        </button>

        </div>
        </div>
        }


    {loading &&  
      <div className='d-flex align-items-center justify-content-center m-5 p-5'>
        <h1 className='display-1'>Loading</h1>
        <ReactLoading type={"bars"} className='ms-3'  color={"black"} />  
      </div>
       }



       {(!loading && finishSearch ) && 
            <div>

                {searchResults.map((result)=>{
                    return (
                       
                        <AgentSearchResult result={result}/>
                    
                        
                    )})}
                    
            {(haveMore && searchResults.length !== 0) && <div className='container w-50'><button className='btn btn-warning btn-lg w-100 mb-5' onClick={searchForProperty}>More Results</button></div>}

            {(!haveMore && searchResults.length !== 0) && <div className='container w-50'> <button className='btn btn-dark btn-lg w-100 mb-5' onClick={restart}>Go Back To Search For More</button> </div> }

            </div>
        
       }



        {(!loading && finishSearch && searchResults.length === 0) && 
        <div className='d-flex flex-column align-items-center'>
        <h1 className='text-center display-4 mt-5'>Sorry, but there is no property with that name</h1>
        <button className='btn btn-dark mt-3' onClick={restart}>Go Back To Search For More</button>
        </div>
       }



        </>

    )




}




export default AgentSearchPage;


