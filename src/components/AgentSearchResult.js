import bath from '../svg/bath.svg';
import bed from '../svg/bed.svg';


const AgentSearchResult = (props)=>{

    const result = props.result;


    return (

        <div className="container-fluid mb-5 pt-5 seller-box pb-5">
        <div className="row">
                <img className="rounded shadow-lg" src={result.image} width="70vw" height="350vh"></img>
        </div>
        <div className="row pt-5">
        <div className="col-md-6 text-center mb-5">
        
            <p className="display-2">{result.name}</p>
            <p className="fs-3">Address : {result.address} - {result.area}</p>
            <p className="fs-3">Floor Range: #{result.floorRange}</p>
            <p className='fs-3'>{result.bedRooms} <img src={bed} class="me-4" width="35vw" alt="img"></img>
                                     {result.bathRooms} <img src={bath} class="me-2" width="35vw" alt="img"></img>
            </p> 
            <p className="fs-3 mt-3">Price: ${result.price}</p>
            <p className="fs-3">Status: {result.status}</p>
         
        </div>
        <div className="col-md-6 seller-property-info d-flex flex-column justify-content-center text-center p-3">
            <p className="display-3">Property Agent Information:</p>
            <p className="fs-3">UID: {result.agent.UID}</p>
            <p className="fs-3">Email: {result.agent.email}</p>
        </div>
        </div>
        </div>
    )

}

export default AgentSearchResult;