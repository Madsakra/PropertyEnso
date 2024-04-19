import { React}  from 'react';
import { useContext } from 'react';
import { Context } from '../App';
import MyFooter from './Footer';

const DashBoard =()=>{

  const {userName,userType,authUser} = useContext(Context);

    return(
        <>
        
        
          
        <div class="dashBoard p-5 bg-body-tertiary rounded-3">
      <div class="container-fluid py-5">
        <h1 class="display-5 fw-bold mb-4">Account Information</h1>
        
        <div class="row align-items-md-stretch">

          <div class="col-md-5 mb-2">
          <div class="h-100 p-5 text-bg-dark rounded-3">
          <h2>Personal Information</h2>
          <p class="fs-4">Username: {userName}</p>
          <p class="fs-4">E-mail: {authUser?.email}</p>
          <p class="fs-4">Role: {userType}</p>
          {/* <button class="btn btn-outline-light" type="button">Edit Your Information</button> */}

        </div>
        
      </div>
      <div class="col-md-7">
        <div class="h-100 p-5 text-bg-light border rounded-3">
         <div className='container'>

            <div className='row'>
            <div className='col-6 text-center'>
                <h1 className='mt-4'>Active Listing</h1>
                <p className='display-1'>20</p>
            </div>
            <div className='col-1'>
            <div class="vr"></div>
            </div>
            <div className='col-4'>
                <h1>Insights</h1>
                <p className='lead fs-2'>Total Views: 50</p>
                <p className='lead fs-2'>Listing ShortListed: 50</p>

            </div>
            </div>
            
   

         </div>
        </div>
      </div>
    </div>

      </div>
    </div>
     
        
        
        <MyFooter/>
        </>
    )


}


export default DashBoard;