import {AgentNewPropertiesController} from '../controller/AgentNewPropertiesController';
import {AgentSoldPropertiesController} from '../controller/AgentSoldPropertiesController';
import {Context} from '../App'
import { useContext, useEffect , useState} from 'react';
import bath from '../svg/bath.svg';
import bed from '../svg/bed.svg';
import AgentListingCards from './AgentListingCards';
import ReactLoading from "react-loading";



const AgentPropertiesPage = ()=>{

    const {authUser} = useContext(Context);
    const [loading,setLoading] = useState(true);
    const [myProperties,setMyProperties] = useState([]);


    async function fetchNewProperties()
    {
        setLoading(true);
        const myFetcher = new AgentNewPropertiesController(authUser);
        const newProperties = await myFetcher.fetchNewProperties();
        setMyProperties([...newProperties]);
        setLoading(false);
        setTimeout(()=>{
            setLoading(false)
        },2000);
    }


    async function fetchSoldProperties()
    {
        setLoading(true);
        const myFetcher = new AgentSoldPropertiesController(authUser);
        const soldProperties = await myFetcher.fetchSoldProperties();
        setMyProperties([...soldProperties]);
        setLoading(false);
        setTimeout(()=>{
            setLoading(false)
        },2000);
    }





    useEffect(()=>{

        fetchNewProperties();

    },[])




    return (
        <>
        
            <div class="p-5 mt-5 mb-4 client-page-main bg-body-tertiary rounded-3">
                <div class="container-fluid py-5 client-head-words text-center">
                <h1 class="display-3 fw-bold">Client's Properties</h1>
                <p class="fs-2">View And Edit Your Client's properties</p>
                </div>
            </div>

            <div className='d-flex justify-content-center'>
            <button className='w-25 btn btn-light shadow lg mb-3 m-2 fw-bold' onClick={fetchNewProperties}>New Properties</button>
            <button className='w-25 btn btn-dark shadow mb-3 m-2' onClick={fetchSoldProperties}>Sold Properties</button>
            </div>
        

            {loading &&  
                <div className='d-flex align-items-center justify-content-center m-5 p-5'>
                    <h1 className='display-1'>Loading</h1>
                    <ReactLoading type={"bars"} className='ms-3'  color={"black"} />  
                </div>
             }

        {(myProperties.length===0 && !loading) && <h1 className="text-center mt-5 p-5 display-1">You do not have any properties in this sections</h1>}

        {!loading && myProperties.map(property=>{
            return (
            <AgentListingCards singleHouse = {property}
                                fetchNewProperties={fetchNewProperties}/>
            )

        })}

        
        
        
        </>
    )    

}











export default AgentPropertiesPage;